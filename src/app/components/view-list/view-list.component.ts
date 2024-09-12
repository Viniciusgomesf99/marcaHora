import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { CommonModule } from '@angular/common';

interface TimeSlot {
  time: string;
  remaining: number;
}

interface DaysAndTimes {
  [key: string]: TimeSlot[];
}

interface List {
  id: string;
  name: string;
  daysAndTimes: DaysAndTimes;
  allowMultipleSelections: boolean;
  allowMultipleBookings: boolean;
  maxSelectionsPerPerson: number;
}

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class ViewListComponent implements OnInit {
  list: List | null = null;
  listId: string | null = null;
  selectedTimesForPerson: string[] = []; // Armazenar horários selecionados pelo usuário atual
  selectedTimesPerList: { [listId: string]: string[] } = {};

  constructor(
    private route: ActivatedRoute,
    private listService: ListService
  ) {}

  ngOnInit() {
    this.listId = this.route.snapshot.paramMap.get('id');
    if (this.listId) {
      this.listService.getListById(this.listId).subscribe(
        (response) => {
          this.list = response.list;
          console.log("Lista recebida do backend:", this.list);
        },
        (error) => {
          console.error('Erro ao buscar a lista:', error);
        }
      );
    }
  }

  // Verifica se o usuário pode selecionar mais horários de acordo com o limite
  canSelectMoreTimes(): boolean {
    if (this.list && this.list.id) {
      const selectedTimesForCurrentList = this.selectedTimesPerList[this.list.id] || [];
      
      if (this.list.allowMultipleSelections) {
        return selectedTimesForCurrentList.length < this.list.maxSelectionsPerPerson;
      }
  
      return selectedTimesForCurrentList.length === 0;
    }
    return false;
  }  

  reserveTime(day: string, time: string) {
    if (!this.canSelectMoreTimes()) {
      alert('Você já atingiu o limite de horários permitidos.');
      return;
    }
  
    const userName = prompt('Digite seu primeiro nome:');
    const cpf = prompt('Digite seu número de matricula (RA):');
  
    if (userName && cpf && this.list) {
      if (!this.selectedTimesPerList[this.list.id]) {
        this.selectedTimesPerList[this.list.id] = [];
      }
  
      // Verifica se o usuário já reservou esse horário específico
      if (this.selectedTimesPerList[this.list.id].includes(time)) {
        alert('Você já reservou esse horário.');
        return;
      }
  
      this.listService.reserveTime(this.list.id, day, time, userName, cpf).subscribe(response => {
        alert(response.message);
  
        // Armazena o horário reservado pelo usuário
        this.selectedTimesPerList[this.list!.id].push(time);
  
        // Atualiza o número de reservas no frontend
        const timeSlotArray = this.list!.daysAndTimes[day];
        if (timeSlotArray) {
          const timeSlotIndex = timeSlotArray.findIndex(t => t.time === time);
          if (timeSlotIndex > -1) {
            timeSlotArray[timeSlotIndex].remaining -= 1;
  
            if (timeSlotArray[timeSlotIndex].remaining === 0) {
              timeSlotArray.splice(timeSlotIndex, 1);
            }
          }
        }
      }, error => {
        const errorMessage = error.error?.message || 'Erro ao reservar o horário.';
        alert(errorMessage);
      });
    }
  }  
}