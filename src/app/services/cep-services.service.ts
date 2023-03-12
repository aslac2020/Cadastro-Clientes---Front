import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {CEP} from "../models/Cep";

const API_URL = 'https://viacep.com.br/ws/'

@Injectable({
  providedIn: 'root'
})
export class CepServicesService {

  constructor(private http: HttpClient) { }

  getCepNumber(cep: string){
    cep = cep.replace(/\D/g, '');

    if(cep != ''){
      const validacep = /^[0-9]{8}$/;
      if(validacep.test(cep)){
        return this.http.get(`${API_URL}${cep}/json/`)
      }
    }
    return of({});
  }
}

