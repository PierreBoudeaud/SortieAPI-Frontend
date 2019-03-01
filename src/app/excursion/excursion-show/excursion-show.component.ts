import { Component, OnInit } from '@angular/core';
import { Excursion } from 'src/app/models/Excursion';
import { ExcursionService } from 'src/app/services/excursion.service';
import { ActivatedRoute } from '@angular/router';
declare let L;
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js'

@Component({
  selector: 'app-excursion-show',
  templateUrl: './excursion-show.component.html',
  styleUrls: ['./excursion-show.component.scss']
})
export class ExcursionShowComponent implements OnInit {

  excursion: Excursion;
  map: any;

  constructor(
    private excursionService: ExcursionService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.loadExcursion();

  }

  loadExcursion() {
    this.route.params.subscribe(
      params => {
        this.excursionService.getById(params['id'])
          .then(excursion => this.excursion = excursion)
          .then(_ => this.loadMap());
      });
  }

  loadMap(){
    navigator.geolocation.getCurrentPosition(position => console.log(position));
    console.log(this.excursion);
    console.log(L);
    this.map = L.map('map').setView([this.excursion.activity.latitude, this.excursion.activity.longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    navigator.geolocation.getCurrentPosition(position => {
      L.Routing.control({
        waypoints: [
          L.latLng(position.coords.latitude, position.coords.longitude),
          L.latLng(this.excursion.activity.latitude, this.excursion.activity.longitude)
        ]
      }).addTo(this.map);
    });
  }

}
