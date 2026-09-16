import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCepService } from './form-cep.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


@Component({
    selector: 'app-form-cep',
    templateUrl: './form-cep.component.html',
    styleUrls: ['./form-cep.component.scss'],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxMaskModule
    ],
    standalone: true
})
export class FormCepComponent implements OnInit {

  private readonly formCepService = inject(FormCepService);
  private readonly fb = inject(FormBuilder);
  cepForm!: FormGroup;

  //variaveis de validação do cep
  zipCode = signal<number | any>(null);
  resultCep = signal<any>('');
  resultCep_error = signal<string>('');

  //variaveis de validação de campos e erro
  erro:boolean = false;
  //ocultar inputs
  hiddenInputs: boolean = false;



  ngOnInit() {
    this.cepForm = this.fb.group({
      zipCode: ['', Validators.required]
    })
  }
  /*
    A função consultaCep faz a requisição da API, aplicando o cep digitado pelo usuário, além de alertar ao usuário se
    o CEP foi digitado corretamente ou se o CEP não existe
  */
  consultaCep() {
    this.formCepService.getCep(this.cepForm.get('zipCode')?.value).subscribe((res) => {
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
        this.resultCep.set(this.ordenarPorChaves(entries, ordemDesejada));

      } else {
        this.erro = Boolean(res);
        this.hiddenInputs = false;
        this.resultCep_error.set('Cep Inválido');
      }
    }, (err) => {
      this.erro = true;
      this.resultCep_error.set('Informe um CEP Válido');

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
