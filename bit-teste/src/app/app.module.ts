import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';
import { FormCepComponent } from './form-cep/form-cep.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormCepComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
