import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from './person.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonRoutingModule } from './person-routing.module';
import {PersonService} from '../services/person.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// import {CorsInterceptor} from '../Interceptor/cors.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonCreateEditComponent } from './person-create-edit/person-create-edit.component';

@NgModule({
  declarations: [PersonComponent, PersonListComponent, PersonCreateEditComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    PersonRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true
    },*/
    PersonService,
  ]
})
export class PersonModule { }
