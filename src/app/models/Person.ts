import { AbstractIdentifiable } from './AbstractIdentifiable';

export class Person extends AbstractIdentifiable {
  name : string;
  firstName : string;
  birthDate : Date = new Date();
}
