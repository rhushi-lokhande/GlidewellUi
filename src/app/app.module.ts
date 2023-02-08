import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule } from "@angular/common/http";
import { NabBarComponent } from './components/nab-bar/nab-bar.component';
import { TableLoaderComponent } from './components/table-loader/table-loader.component'
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    NabBarComponent,
    TableLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
