import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Endereco } from './form-cep.model';

@Injectable({ providedIn: 'root' })
export class FormCepService {
  constructor(private http: HttpClient) { }

  getCep(zipCode: string | number): Observable<Endereco> {
    const url = `https://viacep.com.br/ws/${zipCode}/json/`;
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        const { siafi, gia, ibge, erro, ...list } = response;
        if (erro) {
          return { erro } as Endereco;
        }
        return list as Endereco;
      }),
      catchError((error) => throwError(() => error))
    );
  }

  ordenarPorChaves(
    entries: [string, any][],
    ordem: string[]
  ): [string, any][] {
    const substituicoes: Record<string, string> = {
      localidade: "cidade",
      regiao: "região"
    };

    const ordemMap = new Map(ordem.map((key, i) => [key, i]));

    // Aplica substituições
    const entriesSubstituidas: [string, any][] = entries.map(([key, value]): [string, any] => {
      const novaChave = substituicoes[key] ?? key;
      return [novaChave, value];
    });

    // Remove duplicatas, mantendo a última ocorrência
    const semDuplicatas = Array.from(
      new Map(entriesSubstituidas.reverse()).entries()
    ).reverse();

    // Ordena conforme a ordem desejada
    return semDuplicatas.sort(
      ([a], [b]) => (ordemMap.get(a) ?? Infinity) - (ordemMap.get(b) ?? Infinity)
    );
  }
}
