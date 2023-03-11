import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {People} from "../../models/People";
import {PeopleServiceService} from "../../services/people-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-people',
  templateUrl: './view-people.component.html',
  styleUrls: ['./view-people.component.css']
})
export class ViewPeopleComponent implements OnInit {
  formViewPeople!: FormGroup
  id: number = 0;

  constructor(
    private builder: FormBuilder,
    private peopleService: PeopleServiceService,
    private activatedRoute: ActivatedRoute
  ) {
    this.createFormBlank()
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.peopleService.getPeopleById(this.id).subscribe((people: People) => {
      this.populateDataForms(people)
    })

  }

  createFormBlank() {

    this.formViewPeople = this.builder.group({
      nome: new FormControl({value: null, disabled: true}),
      cpf: new FormControl({value: null, disabled: true}),
      sobrenome: new FormControl({value: null, disabled: true}),
      nacionalidade: new FormControl({value: null, disabled: true}),
      email: new FormControl({value: null, disabled: true}),
      telefone: new FormControl({value: null, disabled: true}),
      cep: new FormControl({value: null, disabled: true}),
      estado: new FormControl({value: null, disabled: true}),
      cidade: new FormControl({value: null, disabled: true}),
      logradouro: new FormControl({value: null, disabled: true}),

    })
  }

  populateDataForms(clients: People) {
    this.formViewPeople.controls['nome'].setValue(clients.nome)
    this.formViewPeople.controls['sobrenome'].setValue(clients.sobrenome)
    this.formViewPeople.controls['cpf'].setValue(clients.cpf)
    this.formViewPeople.controls['nacionalidade'].setValue(clients.nacionalidade)
    this.formViewPeople.controls['email'].setValue(clients.email)
    this.formViewPeople.controls['telefone'].setValue(clients.telefone)
    this.formViewPeople.controls['cep'].setValue(clients.cep)
    this.formViewPeople.controls['estado'].setValue(clients.estado)
    this.formViewPeople.controls['cidade'].setValue(clients.cidade)
    this.formViewPeople.controls['logradouro'].setValue(clients.logradouro)

  }


}
