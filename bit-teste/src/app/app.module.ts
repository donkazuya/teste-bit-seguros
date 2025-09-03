import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';
import { FormCepComponent } from './form-cep/form-cep.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({ declarations: [
        AppComponent,
        FormCepComponent,
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        FormsModule,
        NgxMaskModule.forRoot()
    ], 
    providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
