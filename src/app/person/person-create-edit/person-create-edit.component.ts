import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';
import { ActivatedRoute, Router, } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-person-create-edit',
  templateUrl: './person-create-edit.component.html',
  styleUrls: ['./person-create-edit.component.scss']
})
export class PersonCreateEditComponent implements OnInit {

  person: Person;
  personFormGroup: FormGroup;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.loadPerson();
  }

  loadPerson() {
    this.route.params.subscribe(params => {
      const id: string = params['id'];
      let result: Promise<Person>;
      if (id) {
        result = this.loadPersonById(id);
      } else {
        result = this.loadNewPerson();
      }
      result.then(person => {
        this.person = person;
        this.createFormGroup();
      });
    });
  }

  loadPersonById(id: string): Promise<Person> {
    return this.personService.getById(id);
  }

  loadNewPerson(): Promise<Person> {
    return new Promise(resolve => {
      resolve(new Person());
    });
  }

  convertDate(date: Date) {
    return date.toISOString().substring(0,10);
  }

  createFormGroup() {
    console.log(this.person);
    this.personFormGroup = new FormGroup({
      id: new FormControl(this.person.id),
      name: new FormControl(this.person.name),
      firstname: new FormControl(this.person.firstName),
      birthdate: new FormControl(this.convertDate(this.person.birthDate))
    });
  }

  onFormSubmit(): void {
    this.preparePerson();
    if(this.person.id) {
      this.personService.update(this.person);
    } else {
      this.personService.create(this.person);
    }
    this.router.navigate(['people', 'list']);
  }

  preparePerson(): void {
    this.person.firstName = this.personFormGroup.controls['firstname'].value;
    this.person.name = this.personFormGroup.controls['name'].value;
    this.person.birthDate = this.personFormGroup.controls['birthdate'].value;
  }

}
