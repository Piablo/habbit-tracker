import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment.prod';

//PrimeNG Modules
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    PanelModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
