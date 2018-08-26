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
import {DialogModule} from 'primeng/dialog';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';

//Prime Components
import {TabViewModule} from 'primeng/tabview';
import { SleepComponent } from './components/sleep/sleep.component';
import { CodeSnippitsComponent } from './components/code-snippits/code-snippits.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { ToDoComponent } from './components/to-do/to-do.component';
import { BibleReadingComponent } from './components/bible-reading/bible-reading.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      {
        path: 'sleep',
        component: SleepComponent
      },
      {
        path: 'code-snippits',
        component: CodeSnippitsComponent
      },
      {
        path: 'to-do',
        component: ToDoComponent
      },
      {
        path: 'bible-reading',
        component: BibleReadingComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    DashboardComponent,
    SleepComponent,
    CodeSnippitsComponent,
    ToDoComponent,
    BibleReadingComponent
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
    SidebarModule,
    TabViewModule,
    AutoCompleteModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
