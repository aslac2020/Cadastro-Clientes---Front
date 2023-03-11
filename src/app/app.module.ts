import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import {MaterialModule} from "./shared/material/material.module";
import {MatTableDataSource} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {RegisterPeopleComponent} from './pages/sign/register-people.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ViewPeopleComponent } from './pages/view-people/view-people.component';
import { EditPeopleComponent } from './pages/edit-people/edit-people.component';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogRef} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterPeopleComponent,
    ViewPeopleComponent,
    EditPeopleComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
