import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/models/Activity';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activity-create-edit',
  templateUrl: './activity-create-edit.component.html',
  styleUrls: ['./activity-create-edit.component.scss']
})
export class ActivityCreateEditComponent implements OnInit {

  activity: Activity;
  activityFormGroup: FormGroup;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.loadActivity();
  }

  loadActivity() {
    this.route.params.subscribe(params => {
      const id: string = params['id'];
      let result: Promise<Activity>;
      if (id) {
        result = this.loadActivityById(id);
      } else {
        result = this.loadNewActivity();
      }
      result.then(activity => {
        this.activity = activity;
        this.createFormGroup();
      });
    });
  }

  loadActivityById(id: string): Promise<Activity> {
    return this.activityService.getById(id);
  }

  loadNewActivity(): Promise<Activity> {
    return new Promise(resolve => {
      resolve(new Activity());
    });
  }


  createFormGroup() {
    this.activityFormGroup = new FormGroup({
      id: new FormControl(this.activity.id),
      name: new FormControl(this.activity.name),
      address: new FormControl(this.activity.address),
      postalCode: new FormControl(this.activity.postalCode),
      city: new FormControl(this.activity.city),
      latitude: new FormControl(this.activity.latitude),
      longitude: new FormControl(this.activity.longitude),
    });
  }

  onFormSubmit(): void {
    this.prepareActivity();
    if(this.activity.id) {
      this.activityService.update(this.activity);
    } else {
      this.activityService.create(this.activity);
    }
    this.router.navigate(['activities', 'list']);
  }

  prepareActivity(): void {
    this.activity.name = this.activityFormGroup.controls['name'].value;
    this.activity.address = this.activityFormGroup.controls['address'].value;
    this.activity.postalCode = this.activityFormGroup.controls['postalCode'].value;
    this.activity.city = this.activityFormGroup.controls['city'].value;
    this.activity.latitude = this.activityFormGroup.controls['latitude'].value;
    this.activity.longitude = this.activityFormGroup.controls['longitude'].value;
  }

}
