import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PeopleServiceService} from "../../services/people-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {People} from "../../models/People";
import {DialogComponent} from "../../components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CEP} from "../../models/Cep";
import {CepServicesService} from "../../services/cep-services.service";

@Component({
  selector: 'app-edit-people',
  templateUrl: './edit-people.component.html',
  styleUrls: ['./edit-people.component.css']
})
export class EditPeopleComponent implements OnInit{

  formEditPeople!: FormGroup
  id: number = 0;

  dataPeople!: People

  constructor(
    private peopleService: PeopleServiceService,
    private cepService: CepServicesService,
    private snackBar: MatSnackBar,
    private builder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog

  ) {
    this.createFormBlak()
  }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id']

    this.peopleService.getPeopleById(this.id).subscribe((data: People) => {
     this.populateDataForms(data)
      this.dataPeople = data;
    })
  }

  createFormBlak(){
    this.formEditPeople = this.builder.group({
      nome: [''],
      sobrenome: [''],
      nacionalidade: [''],
      cpf: new FormControl({value: null, disabled: true}),
      email: [''],
      telefone: [''],
      cep: [''],
      logradouro: [''],
      cidade: [''],
      estado: [''],
    })
  }

  populateDataForms(clients: People){
    this.formEditPeople.controls['nome'].setValue(clients.nome)
    this.formEditPeople.controls['sobrenome'].setValue(clients.sobrenome)
    this.formEditPeople.controls['nacionalidade'].setValue(clients.nacionalidade)
    this.formEditPeople.controls['cpf'].setValue(clients.cpf)
    this.formEditPeople.controls['email'].setValue(clients.email)
    this.formEditPeople.controls['telefone'].setValue(clients.telefone)
    this.formEditPeople.controls['cep'].setValue(clients.cep)
    this.formEditPeople.controls['logradouro'].setValue(clients.logradouro)
    this.formEditPeople.controls['cidade'].setValue(clients.cidade)
    this.formEditPeople.controls['estado'].setValue(clients.estado)
  }


  updatePeople() {
    let msg = "Deseja alterar o usuário?";
    const peopleForm = this.formEditPeople.getRawValue() as People;
    let isUpdate = true;

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      height: '200px',
      data: {msg:msg, people: peopleForm, id: this.id, isScreenUpdate: isUpdate }
    })
  }

  populateDataCep(cep: CEP){
    this.formEditPeople.controls['cep'].setValue(cep.cep)
    this.formEditPeople.controls['logradouro'].setValue(cep.logradouro)
    this.formEditPeople.controls['cidade'].setValue(cep.localidade)
    this.formEditPeople.controls['estado'].setValue(cep.uf)
  }

  searchCep() {
    const cepNumber = this.formEditPeople.getRawValue() as People
      this.cepService.getCepNumber(cepNumber.cep).subscribe((data: CEP) => {
        this.populateDataCep(data)
      })
  }

}
