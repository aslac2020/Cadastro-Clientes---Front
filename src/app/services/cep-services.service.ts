import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CEP} from "../Models/Cep";

const API_URL = 'https://viacep.com.br/ws/'

@Injectable({
  providedIn: 'root'
})
export class CepServicesService {

  constructor(private http: HttpClient) { }

  getCepNumber(cep: string): Observable<CEP>{
    return this.http.get<CEP>(`${API_URL}${cep}/json/`)
  }
}
