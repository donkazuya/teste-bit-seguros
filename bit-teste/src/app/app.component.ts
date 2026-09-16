import { Component } from '@angular/core';
import { FormCepComponent } from './form-cep/form-cep.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [FormCepComponent],
  standalone: true
})
export class AppComponent {
  title = 'Consulta Cep';
}

