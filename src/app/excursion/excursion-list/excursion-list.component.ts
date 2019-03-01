import { Component, OnInit } from '@angular/core';
import { Excursion } from 'src/app/models/Excursion';
import { ExcursionService } from 'src/app/services/excursion.service';

@Component({
  selector: 'app-excursion-list',
  templateUrl: './excursion-list.component.html',
  styleUrls: ['./excursion-list.component.scss']
})
export class ExcursionListComponent implements OnInit {

  excursions: Excursion[] = [];

  constructor(private excursionService: ExcursionService) { }

  ngOnInit() {
    this.loadExcursions();
  }

  loadExcursions() {
    this.excursionService.getAll()
      .then(excursions => this.excursions = excursions);
  }

  delete(id) {
    this.excursionService.delete(id)
      .then(_excursion => this.excursions = this.excursions.filter(excursion => excursion.id !== _excursion.id));
  }

}
