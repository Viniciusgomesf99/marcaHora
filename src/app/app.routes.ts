import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateListComponent } from './components/create-list/create-list.component';
import { ViewListComponent } from './components/view-list/view-list.component';
import { ShareListComponent } from './components/share-list/share-list.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { AccessListComponent } from './acess-list/acess-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-list', component: CreateListComponent },
  { path: 'view-list/:id', component: ViewListComponent },
  { path: 'share-list/:id', component: ShareListComponent }, // rota para compartilhar a lista
  { path: 'search-list', component: SearchListComponent },    // rota para procurar lista específica
  { path: 'access-list', component: AccessListComponent }
];