import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import necessário para usar ngModel
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateListComponent } from './components/create-list/create-list.component';
import { ViewListComponent } from './components/view-list/view-list.component';
import { ShareListComponent } from './components/share-list/share-list.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HomeComponent,
    CreateListComponent,
    ViewListComponent,
    ShareListComponent,
    SearchListComponent,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'create-list', component: CreateListComponent },
      { path: 'view-list/:id', component: ViewListComponent },
      { path: 'share-list/:id', component: ShareListComponent },
      { path: 'search-list', component: SearchListComponent }
    ]),
    FormsModule,
    CommonModule
  ],
  providers: [provideNgxMask()],
  bootstrap: []
})
export class AppModule { }