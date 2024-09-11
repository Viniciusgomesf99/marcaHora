import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-list',
  standalone: true,
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
  imports: [FormsModule]
})
export class SearchListComponent {
  searchTerm: string = ''; // Inicializar a propriedade

  constructor(private router: Router) {}

  searchList() {
    if (this.searchTerm) {
      this.router.navigate(['/view-list', this.searchTerm]);
    } else {
      alert('Por favor, insira um ID ou URL válido.');
    }
  }
}