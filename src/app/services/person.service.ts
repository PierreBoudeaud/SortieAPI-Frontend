import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Person } from '../models/Person';
import { ICrudService } from './iCrudService';
import { UrlGiverService } from './url-giver.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService implements ICrudService<Person> {
  private URLPerson = `${UrlGiverService.API_URL}people`;
  private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '0');

  constructor(private http: HttpClient) { }

  getAll(): Promise<Person[]> {
    return this.http.get<Person[]>(this.URLPerson, { headers: this.headers })
    .toPromise()
    .then(persons => {
      persons.forEach(person => this.fixDate(person));
      return persons;
    });
  }

  getById(id: string): Promise<Person> {
    return this.http.get<Person>(`${this.URLPerson}/${id}`, { headers: this.headers })
    .toPromise()
    .then(person => this.fixDate(person));
  }

  create(item: Person): Promise<Person> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Person>(this.URLPerson, JSON.stringify(item), { headers: headers })
      .toPromise()
      .then(person => this.fixDate(person));
  }
  update(item: Person): Promise<Person> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Person>(`${this.URLPerson}/${item.id}`, JSON.stringify(item), { headers: headers })
      .toPromise()
      .then(person => this.fixDate(person));
  }
  delete(id: string): Promise<Person> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<Person>(`${this.URLPerson}/${id}`)
      .toPromise()
      .then(person => this.fixDate(person));
  }

  fixDate(person: Person): Person {
    person.birthDate = new Date(person.birthDate);
    return person;
  }
}
