import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'people', loadChildren: './person/person.module#PersonModule' },
  { path: 'activities', loadChildren: './activity/activity.module#ActivityModule' },
  { path: 'excursions', loadChildren: './excursion/excursion.module#ExcursionModule' },
  { path: '**', redirectTo: '/people/list'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
