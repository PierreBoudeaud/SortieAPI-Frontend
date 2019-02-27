import { AbstractIdentifiable } from './AbstractIdentifiable';

export class Activity extends AbstractIdentifiable {
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  postalCode: string;
  city: string;
}
