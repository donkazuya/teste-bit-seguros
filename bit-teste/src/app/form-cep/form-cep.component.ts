import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-form-cep',
  templateUrl: './form-cep.component.html',
  styleUrls: ['./form-cep.component.scss']
})
export class FormCepComponent implements OnInit {
  
  //variaveis de validação do cep
  zipCode: number;
  resultCep: any;
  resultCep_error:string;
  resultCepText_error: string;

  //variaveis de validação de campos e erro
  erro:boolean = false;
  erroBadRequest:boolean = false;
  fieldOff: boolean = false;
  fieldOffUnidade: boolean = false;

  //ocultar inputs
  hiddenInputs: boolean = false;

  ngOnInit() {}

  constructor(private http: HttpClient) {
  }
  /*
    A função consultaCep faz a requisição da API, aplicando o cep digitado pelo usuário, além de alertar ao usuário se 
    o CEP foi digitado corretamente ou se o CEP não existe
  */
  consultaCep() {
    const getUrl:string = `http://viacep.com.br/ws/${this.zipCode}/json/`;
    this.http.get(getUrl).subscribe((res) => {
      this.resultCep = res;

      this.hiddenInputs = true;
      this.erro = this.resultCep.erro;

      if(this.resultCep.complemento != "") {
        this.fieldOff = true;
      } else {
        this.fieldOff = false;
      }

      if(this.resultCep.unidade != ""){
        this.fieldOffUnidade = true;
      } else {
        this.fieldOffUnidade = false;
      }

      if(this.erro === true) {
        this.hiddenInputs = false;
        this.erroBadRequest = false;
        this.resultCep_error = 'Cep Invalido';
      }

      this.erroBadRequest = false; 
    }, (err) => {
      this.erroBadRequest = true;
      this.erro = false;
      this.resultCep_error = 'Digite um CEP Válido';

      this.hiddenInputs = false;
    });
  }
}
