import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Endereco } from './form-cep.model';

@Injectable({providedIn: 'root'})
export class FormCepService {
  constructor(private http: HttpClient) { }
  
  getCep(zipCode: number): Observable<Endereco> {
    const url = `https://viacep.com.br/ws/${zipCode}/json/`;
    return this.http.get<Endereco>(url).pipe(
      map((response: any) => {
        const { siafi, gia, ibge, erro, ...list } = response;
        if (erro)
          return {erro};

        return list;
      }),
      catchError(error => {
        return error;
      })
    );
  }
}