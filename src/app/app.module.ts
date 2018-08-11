import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment.prod';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

//PrimeNG Modules
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {SidebarModule} from 'primeng/sidebar';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { FitnessComponent } from './components/fitness/fitness.component';
import { FitnessHistoryComponent } from './components/fitness/fitness-history/fitness-history.component';

const appRoutes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'dashboard', component: DashboardComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    DashboardComponent,
    FitnessComponent,
    FitnessHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(appRoutes),
    AngularFirestoreModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    CardModule,
    ToolbarModule,
    TableModule,
    SidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
