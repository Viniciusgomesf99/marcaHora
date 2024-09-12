import { Component } from '@angular/core';
import { ListService } from '../../services/list.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class CreateListComponent {
  listName: string = '';
  listPassword: string = '';  // Campo para a senha
  selectedDays: string[] = [];
  selectedDay: string = '';
  selectedTimes: string[] = [];
  allowMultipleSelections: boolean = false;
  customTime: string = '';
  maxSelectionsPerPerson: number = 1;
  selectedDaysAndTimes: { [key: string]: string[] } = {};

  // Horários com intervalo inicial de 30 minutos
  availableTimes: string[] = this.generateTimes(30);

  constructor(private listService: ListService, private router: Router) {}

  // Função para gerar os horários de 06:00 a 06:00 do dia seguinte
  generateTimes(interval: number): string[] {
    const times = [];
    const start = new Date();
    start.setHours(6, 0, 0, 0); // 06:00, garantindo que os milissegundos sejam 0
  
    // Calcular o horário final com base no intervalo
    const end = new Date(start);
    end.setHours(5, 30); // Definir como 05:30 do próximo dia por padrão
    end.setDate(start.getDate() + 1); // Avançar para o próximo dia
  
    // Gerar horários entre 06:00 e o horário final definido
    while (start <= end) {
      const timeString = start.toTimeString().slice(0, 5); // Formato HH:MM
      times.push(timeString);
      start.setMinutes(start.getMinutes() + interval); // Incrementar por intervalos
    }
  
    return times;
  }  

  canSelectMoreTimes(personName: string, selectedTimesForPerson: string[]): boolean {
    // Verifica se a pessoa pode selecionar mais horários, com base no limite definido
    if (this.allowMultipleSelections) {
      return selectedTimesForPerson.length < this.maxSelectionsPerPerson;
    }
    // Se múltiplas seleções não forem permitidas, a pessoa pode selecionar apenas 1 horário
    return selectedTimesForPerson.length === 0;
  }

    // Função para alternar intervalo entre horários
    changeInterval(event: Event) {
      const target = event.target as HTMLSelectElement;
      
      if (target && target.value) {
        const minutes = parseInt(target.value, 10);
        const previousSelectedTimes = this.selectedDaysAndTimes[this.selectedDay] || [];
        
        this.availableTimes = this.generateTimes(minutes);
        
        // Manter os horários já selecionados
        this.selectedDaysAndTimes[this.selectedDay] = previousSelectedTimes.filter(time => this.availableTimes.includes(time));
      }
    }



  addDay(day: string) {
    if (day && !this.selectedDays.includes(day)) {
      this.selectedDays.push(day);
      this.selectedDaysAndTimes[day] = []; // Inicializa o array de horários para o dia
    }
  }

  removeDay(day: string) {
    this.selectedDays = this.selectedDays.filter(d => d !== day);
  }

  selectDay(day: string) {
    this.selectedDay = day;
  }

  // Função para alternar a seleção de horários
  toggleTimeSelectionForDay(day: string, time: string, event: any) {
    if (event.target.checked) {
      this.selectedDaysAndTimes[day].push(time);
    } else {
      this.selectedDaysAndTimes[day] = this.selectedDaysAndTimes[day].filter(t => t !== time);
    }
  }

  // Função para adicionar horário personalizado
  addCustomTime() {
    if (this.customTime && !this.availableTimes.includes(this.customTime)) {
      this.availableTimes.push(this.customTime); // Adiciona o horário à lista de disponíveis
      this.availableTimes.sort(); // Ordena os horários após adicionar
      this.selectedDaysAndTimes[this.selectedDay].push(this.customTime); // Adiciona o horário ao dia atual
    }
    this.customTime = ''; // Limpa o campo após adicionar
  }

  createList() {
    // Certifique-se de que o valor de `maxSelectionsPerPerson` está sendo enviado corretamente
    const newList = {
      name: this.listName,
      password: this.listPassword,  // Inclui a senha
      days: this.selectedDays,
      daysAndTimes: this.selectedDaysAndTimes, // Dias e horários por dia
      allowMultipleSelections: this.allowMultipleSelections,
      maxSelectionsPerPerson: this.allowMultipleSelections ? this.maxSelectionsPerPerson : 1 // Garante o valor padrão
    };
  
    this.listService.createList(newList).subscribe(response => {
      alert('Lista criada com sucesso!');
      this.router.navigate(['/share-list', response.list.id]);
    }, error => {
      alert('Erro ao criar lista.');
      console.error(error);
    });
  }  
}