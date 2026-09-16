import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCepService } from './form-cep.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-form-cep',
  templateUrl: './form-cep.component.html',
  styleUrls: ['./form-cep.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule
  ],
  standalone: true
})
export class FormCepComponent implements OnInit {

  private readonly formCepService = inject(FormCepService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  cepForm!: FormGroup;

  //variaveis de validação do cep
  resultCep = signal<[string, string][]>([]);
  resultCep_error = signal<string>('');

  //variaveis de validação de campos e erro
  erro = signal<boolean>(false);
  //ocultar inputs
  hiddenInputs = signal<boolean>(false);



  ngOnInit() {
    this.cepForm = this.fb.group({
      zipCode: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
  /*
    A função consultaCep faz a requisição da API, aplicando o cep digitado pelo usuário, além de alertar ao usuário se
    o CEP foi digitado corretamente ou se o CEP não existe
  */

  consultaCep() {
    const zipCode = this.cepForm.get('zipCode')?.value;

    this.formCepService
      .getCep(zipCode)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res?.erro) {
            this.tratarErro('Cep Inválido', Boolean(res));
            return;
          }

          const ordemDesejada = [
            'cep', 'logradouro', 'bairro', 'localidade',
            'uf', 'ddd', 'complemento', 'unidade', 'regiao', 'estado'
          ];

          this.hiddenInputs.set(true);
          this.resultCep.set(
            this.formCepService.ordenarPorChaves(Object.entries(res), ordemDesejada)
          );
        },
        error: () => this.tratarErro('Informe um CEP Válido', true)
      });
  }

  private tratarErro(mensagem: string, erroStatus: boolean) {
    this.erro.set(erroStatus);
    this.resultCep_error.set(mensagem);
    this.hiddenInputs.set(false);
  }
}
