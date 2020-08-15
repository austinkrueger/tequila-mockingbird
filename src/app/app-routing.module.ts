import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocktailListComponent } from './components/cocktail-list/cocktail-list.component';
import { CocktailComponent } from './components/cocktail/cocktail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'cocktails', component: CocktailListComponent },
  { path: 'cocktails/:id', component: CocktailComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
