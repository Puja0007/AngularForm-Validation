import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthMeterComponent } from './password-strength-meter/password-strength-meter.component';
import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, User,Cpu,Eye,Plus,X } from 'angular-feather/icons';



const icons = {
  Camera,
  Heart,
  Github,
  User,
  Cpu,
  Eye,Plus,X
};

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PasswordStrengthMeterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FeatherModule.pick(icons),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
