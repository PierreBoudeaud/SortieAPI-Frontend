import { Component, OnInit } from '@angular/core';
import {Person} from '../../models/Person';
import {PersonService} from '../../services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  people: Person[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.personService.getAll()
      .then(people => this.people = people);
  }

}
