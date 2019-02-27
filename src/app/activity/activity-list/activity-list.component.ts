import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { Activity } from 'src/app/models/Activity';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  activities: Activity[] = [];

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.loadActivities();
  }

  loadActivities() {
    this.activityService.getAll()
      .then(activities => this.activities = activities);
  }

  delete(id: string) {
    this.activityService.delete(id)
      .then(_activity => this.activities = this.activities.filter(activity => activity.id !== _activity.id));
  }
}
