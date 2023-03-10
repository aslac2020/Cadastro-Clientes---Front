import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as path from "path";
import {HomeComponent} from "./home/home.component";
import {RegisterPeopleComponent} from "./sign/register-people.component";

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'sign',
    component: RegisterPeopleComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
