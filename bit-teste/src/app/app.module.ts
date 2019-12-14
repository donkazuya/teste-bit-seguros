import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FormCepComponent } from './form-cep/form-cep.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';






@NgModule({
  declarations: [
    AppComponent,
    FormCepComponent, 
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TextMaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
