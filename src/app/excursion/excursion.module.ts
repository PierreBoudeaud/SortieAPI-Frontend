import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcursionRoutingModule } from './excursion-routing.module';
import { ExcursionListComponent } from './excursion-list/excursion-list.component';
import { ExcursionCreateEditComponent } from './excursion-create-edit/excursion-create-edit.component';
import { ExcursionShowComponent } from './excursion-show/excursion-show.component';
import { ExcursionService } from '../services/excursion.service';
import {ReactiveFormsModule} from "@angular/forms";
import {PersonService} from "../services/person.service";
import {ActivityService} from "../services/activity.service";

@NgModule({
  declarations: [ExcursionListComponent, ExcursionCreateEditComponent, ExcursionShowComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExcursionRoutingModule,
  ],
  providers: [
    ExcursionService,
    PersonService,
    ActivityService,
  ]
})
export class ExcursionModule { }
