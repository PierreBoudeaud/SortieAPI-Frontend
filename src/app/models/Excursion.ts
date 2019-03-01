import { Person } from './Person';
import { Activity } from './Activity';
import { AbstractIdentifiable } from './AbstractIdentifiable';
import { Weather } from './Weather';

export class Excursion extends AbstractIdentifiable{
  name: string;
  date: Date;
  nbPlaces: number;
  subscribePeople: Person[] = [];
  activity: Activity;
  creator: Person;
  readonly weather: Weather;

  constructor() {
    super();
    this.name = '';
    this.date = new Date();
    this.nbPlaces = 0;
    this.subscribePeople = [];
    this.activity = new Activity();
    this.creator = new Person();
    this.weather = null;
  }
}
