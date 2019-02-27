import { Injectable } from '@angular/core';
import { ICrudService } from './iCrudService';
import { Activity } from '../models/Activity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlGiverService } from './url-giver.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService implements ICrudService<Activity> {
  UrlActivities: string = `${UrlGiverService.API_URL}activities`;

  constructor(private http: HttpClient) { }

  getAll(): Promise<Activity[]> {
    return this.http.get<Activity[]>(this.UrlActivities)
      .toPromise();
  }

  getById(id: string): Promise<Activity> {
    return this.http.get<Activity>(`${this.UrlActivities}/${id}`)
      .toPromise();
  }

  create(item: Activity): Promise<Activity> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Activity>(this.UrlActivities, JSON.stringify(item), { headers: headers })
      .toPromise();
  }

  update(item: Activity): Promise<Activity> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Activity>(`${this.UrlActivities}/${item.id}`, JSON.stringify(item), { headers: headers })
      .toPromise();
  }

  delete(id: string): Promise<Activity> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete<Activity>(`${this.UrlActivities}/${id}`)
      .toPromise();
  }
}
