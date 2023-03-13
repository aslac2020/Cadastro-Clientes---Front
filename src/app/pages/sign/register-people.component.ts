import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {People} from "../../models/People";
import {CepServicesService} from "../../services/cep-services.service";
import {CEP} from "../../models/Cep";
import {PeopleServiceService} from "../../services/people-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sign-people',
  templateUrl: './register-people.component.html',
  styleUrls: ['./register-people.component.css']
})
export class RegisterPeopleComponent implements OnInit{
    formRegisterPeople!: FormGroup
    dataCep!: CEP
    isCpfDuplicaded: boolean = false;
    isformEdit: boolean = false;
    cpfDigited!: string;

    public cpfMask  = [ /\d/ , /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '-', /\d/, /\d/,];
    public cepMask  = [/\d/ , /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
    public phoneMask =  ['(', /[1-9]/, /\d/, ')', ' ', /\d/ , /\d/ , /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];



  constructor(
    private builder: FormBuilder,
    private router: Router,
    private cepService: CepServicesService,
    private peopleService: PeopleServiceService,
    private snackBar: MatSnackBar
  ) {
    this.createFormBlank()
  }

  ngOnInit() {
  }

  createFormBlank(){
      this.formRegisterPeople = this.builder.group({
        nome: ['', [Validators.required]],
        cpf:  ['', Validators.required],
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

  searchCep(){
    const cepModel = this.formRegisterPeople.getRawValue() as People;
    console.log(cepModel.cep)
    this.cepService.getCepNumber(cepModel.cep).subscribe( data => {
      console.log(data)
      this.populateFormAddress(data)
    })
  }

  registerPeople(){
    const client = this.formRegisterPeople.getRawValue() as People;

    if(this.isCpfDuplicaded == true){
      this.openSnackBar("Já existe usuário cadastrado com esse cpf, por favor cadastrar com outro cpf")
      return;
    }
    this.peopleService.registerPeople(client).subscribe((data: People) => {
      console.log(data);
      this.openSnackBar('Cliente Cadastrado com sucesso :)')
      this.formRegisterPeople.reset();
      this.router.navigate(['']);
    }, error => this.openSnackBar('Erro ao cadastrar o cliente :('))
  }

  populateFormAddress(dados: CEP | any){
    this.formRegisterPeople.setValue({
      cep: dados.cep,
      estado: dados.uf,
      cidade: dados.localidade,
      logradouro: dados.logradouro,


      nome: this.formRegisterPeople.get('nome')?.value,
      sobrenome: this.formRegisterPeople.get('sobrenome')?.value,
      nacionalidade: this.formRegisterPeople.get('nacionalidade')?.value,
      cpf: this.formRegisterPeople.get('cpf')?.value,
      telefone: this.formRegisterPeople.get('telefone')?.value,
      email: this.formRegisterPeople.get('email')?.value,

    })
  }

  isExistsCpf(){
    const cpfValue = this.formRegisterPeople.getRawValue() as People;
    this.peopleService.isExistsCpf(cpfValue.cpf).subscribe((data: any) => {
      if(data == true){
        this.openSnackBar('Já existe um usuario cadastrado com esse CPF, favor cadastrar com outro CPF')
        this.isCpfDuplicaded = true;
      }else {
        this.isCpfDuplicaded = false
      }
    })


  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 3000});
  }

}
