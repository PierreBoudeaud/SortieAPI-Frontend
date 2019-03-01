import { Component, OnInit } from '@angular/core';
import {Excursion} from "../../models/Excursion";
import {ExcursionService} from "../../services/excursion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Activity} from "../../models/Activity";
import {Person} from "../../models/Person";
import {PersonService} from "../../services/person.service";
import {ActivityService} from "../../services/activity.service";

@Component({
  selector: 'app-excursion-create-edit',
  templateUrl: './excursion-create-edit.component.html',
  styleUrls: ['./excursion-create-edit.component.scss']
})
export class ExcursionCreateEditComponent implements OnInit {

  excursion: Excursion;
  excursionFormGroup: FormGroup;
  activities: Activity[];
  people: Person[];

  constructor(
    private personService: PersonService,
    private activityService: ActivityService,
    private excursionService: ExcursionService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    Promise.all([
      this.loadExcursion(),
      this.loadAssets(),
    ])
      .then(() => this.createFormGroup());

  }

  loadExcursion(): Promise<void> {
    return new Promise(resolve => {
      this.route.params.subscribe(
        params => {
          const id = params['id'];
          let result: Promise<Excursion>;
          if(id) {
            result = this.loadExcursionById(id);
          } else {
            result = this.loadNewExcursion();
          }
          result
            .then(excursion => this.excursion = excursion)
            .then(() => resolve());
        });
    });
  }

  loadExcursionById(id: string): Promise<Excursion> {
    return this.excursionService.getById(id);
  }

  loadNewExcursion(): Promise<Excursion> {
    return new Promise(resolve => {
      resolve(new Excursion());
    });
  }

  loadAssets(): Promise<void> {
    return Promise.all([
      this.personService.getAll(),
      this.activityService.getAll(),
    ])
      .then(models => {
        this.people = models[0];
        this.activities = models[1];
      });
  }

  convertDate(date: Date) {
    return date.toISOString().substring(0,10);
  }

  createFormGroup() {
    console.log(this.excursion);
    this.excursionFormGroup = new FormGroup({
      name: new FormControl(this.excursion.name),
      activity: new FormControl(this.excursion.activity.id),
      date: new FormControl(this.convertDate(this.excursion.date)),
      creator: new FormControl(this.excursion.creator.id),
      nbPlaces: new FormControl(this.excursion.nbPlaces),
    });
  }

  onFormSubmit(): void {
    this.prepareExcursion();
    console.log(this.excursion);
    if(this.excursion.id) {
      this.excursionService.update(this.excursion);
    } else {
      this.excursionService.create(this.excursion);
    }
    this.router.navigate(['excursions', 'list']);
  }

  prepareExcursion(): void {
    this.excursion.name = this.excursionFormGroup.controls['name'].value;
    this.excursion.date = this.excursionFormGroup.controls['date'].value;
    const activity = this.activities.filter(p => p.id === this.excursionFormGroup.controls['activity'].value);
    console.log(this.excursionFormGroup.controls['activity'].value);
    console.log(activity);
    this.excursion.activity = activity[0];
    const person = this.people.filter(p => p.id === this.excursionFormGroup.controls['creator'].value);
    console.log(this.excursionFormGroup.controls['creator'].value);
    console.log(person);
    this.excursion.creator = person[0];
    this.excursion.nbPlaces = this.excursionFormGroup.controls['nbPlaces'].value;
  }
}
