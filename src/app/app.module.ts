import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { PrimeFormsComponent } from './prime-forms/prime-forms.component';


@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    PrimeFormsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
