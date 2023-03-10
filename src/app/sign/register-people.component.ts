import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-people',
  templateUrl: './register-people.component.html',
  styleUrls: ['./register-people.component.css']
})
export class RegisterPeopleComponent implements OnInit{
    formRegisterPeople!: FormGroup
    isformEdit: boolean = false;

  constructor(
    private builder: FormBuilder,
    private router: Router
  ) {
    this.createFormBlank()
  }

  ngOnInit() {
  }

  createFormBlank(){
      this.formRegisterPeople = this.builder.group({
        nome: ['', [Validators.required]],
        cpf:  new FormControl('999.999.999-99'),
        sobrenome: ['', [Validators.required]],
        nacionalidade: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        logradouro: ['', [Validators.required]],
      })
  }

}
