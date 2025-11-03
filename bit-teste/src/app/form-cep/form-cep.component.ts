import { Component, OnInit } from '@angular/core';
import { FormCepService } from './form-cep.service';


@Component({
    selector: 'app-form-cep',
    templateUrl: './form-cep.component.html',
    styleUrls: ['./form-cep.component.scss'],
    standalone: false
})
export class FormCepComponent implements OnInit {

  //variaveis de validação do cep
  zipCode: number;
  resultCep: any;
  resultCep_error:string;

  //variaveis de validação de campos e erro
  erro:boolean = false;
  //ocultar inputs
  hiddenInputs: boolean = false;



  constructor(private formCepService: FormCepService) {
  }

  ngOnInit() {}
  /*
    A função consultaCep faz a requisição da API, aplicando o cep digitado pelo usuário, além de alertar ao usuário se
    o CEP foi digitado corretamente ou se o CEP não existe
  */
  consultaCep() {
    this.formCepService.getCep(this.zipCode).subscribe((res) => {
      if(!res.erro) {
        this.hiddenInputs = true;
        const entries = Object.entries(res);

        const ordemDesejada = [
          'cep',
          'logradouro',
          'bairro',
          'localidade',
          'uf',
          'ddd',
          'complemento',
          'unidade',
          'regiao',
          'estado'
        ];
        this.resultCep = this.ordenarPorChaves(entries, ordemDesejada);

      } else {
        this.erro = Boolean(res);
        this.hiddenInputs = false;
        this.resultCep_error = 'Cep Inválido';
      }
    }, (err) => {
      this.erro = true;
      this.resultCep_error = 'Informe um CEP Válido';

      this.hiddenInputs = false;
    });
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
