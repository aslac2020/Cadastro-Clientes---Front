import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as path from "path";
import {HomeComponent} from "./pages/home/home.component";
import {RegisterPeopleComponent} from "./pages/sign/register-people.component";
import {ViewPeopleComponent} from "./pages/view-people/view-people.component";

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterPeopleComponent
  },
  {
    path: 'view/:id',
    component: ViewPeopleComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
