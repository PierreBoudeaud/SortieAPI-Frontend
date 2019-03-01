import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Excursion } from '../models/Excursion';
import { ICrudService } from './iCrudService';
import { UrlGiverService } from './url-giver.service';

@Injectable({
  providedIn: 'root'
})
export class ExcursionService implements ICrudService<Excursion> {
  private URLExcursion = `${UrlGiverService.API_URL}excursions`;
  private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '0');

  constructor(private http: HttpClient) { }

  getAll(): Promise<Excursion[]> {
    return this.http.get<Excursion[]>(this.URLExcursion, { headers: this.headers })
    .toPromise()
    .then(excursions => {
      excursions.forEach(excursion => this.fixDate(excursion));
      return excursions;
    });
  }

  getById(id: string): Promise<Excursion> {
    return this.http.get<Excursion>(`${this.URLExcursion}/${id}`, { headers: this.headers })
    .toPromise()
    .then(excursion => this.fixDate(excursion))
      .then(excursion => {
        let subscriptions = [];
        const subscribePeople = Object.assign([], excursion.subscribePeople);
        subscribePeople.forEach(row => {
          subscriptions.push(row.person);
        });
        excursion.subscribePeople = Object.assign([], subscriptions);
        return excursion;
      });
  }

  create(item: Excursion): Promise<Excursion> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Excursion>(this.URLExcursion, JSON.stringify(item), { headers: headers })
      .toPromise()
      .then(excursion => this.fixDate(excursion));
  }
  update(item: Excursion): Promise<Excursion> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Excursion>(`${this.URLExcursion}/${item.id}`, JSON.stringify(item), { headers: headers })
      .toPromise()
      .then(excursion => this.fixDate(excursion));
  }
  delete(id: string): Promise<Excursion> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<Excursion>(`${this.URLExcursion}/${id}`)
      .toPromise()
      .then(excursion => this.fixDate(excursion));
  }

  fixDate(excursion: Excursion): Excursion {
    excursion.date = new Date(excursion.date);
    return excursion;
  }
}
