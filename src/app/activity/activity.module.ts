import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityCreateEditComponent } from './activity-create-edit/activity-create-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivityService } from '../services/activity.service';

@NgModule({
  declarations: [ActivityListComponent, ActivityCreateEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ActivityRoutingModule,
  ],
  providers: [
    ActivityService,
  ]
})
export class ActivityModule { }
