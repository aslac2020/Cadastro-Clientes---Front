import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {People} from "../Models/People";
import * as http from "http";

const API_URL = 'https://localhost:7024/api'
@Injectable({
  providedIn: 'root'
})
export class PeopleServiceService {

  constructor(private  http: HttpClient) { }

  getAllPeoples(): Observable<People[]> {
    return this.http.get<People[]>(`${API_URL}/Pessoa`);
  }

  registerPeople(client: People):Observable<People>{
    return this.http.post<People>(`${API_URL}/Pessoa`, client)
  }

  isExistsCpf(cpf: string){
    return this.http.get(`${API_URL}/Pessoa/cpf/${cpf}`)
  }
}
