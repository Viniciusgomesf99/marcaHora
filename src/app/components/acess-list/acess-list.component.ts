import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-access-list',
  templateUrl: './acess-list.component.html',
  styleUrls: ['./acess-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AccessListComponent {
  listPassword: string = '';
  listId: string = '';
  list: any;
  errorMessage: string = '';

  constructor(private listService: ListService, private router: Router) {}

  // Função para acessar a lista com a senha
  accessList() {
    this.listService.accessList(this.listId, this.listPassword).subscribe(
      (response: any) => {
        this.list = response.list;
        this.errorMessage = ''; // Limpa a mensagem de erro
      },
      (error) => {
        this.errorMessage = error.error.message; // Exibe a mensagem de erro
      }
    );
  }

  // Função para encerrar a lista
  endList() {
    this.listService.endList(this.listId, this.listPassword).subscribe(
      () => {
        alert('Lista encerrada com sucesso!');
        this.router.navigate(['/']); // Navega para a página inicial
      },
      (error: { error: { message: string; }; }) => {
        alert('Erro ao encerrar a lista: ' + error.error.message);
      }
    );
  }
}