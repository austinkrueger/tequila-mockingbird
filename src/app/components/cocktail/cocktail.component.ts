import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { CocktailsState } from 'src/app/state/cocktail.state';
import { Observable, Subscription } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailService } from 'src/app/services/cocktail.service';
import { SetCurrent } from 'src/app/state/cocktail.action';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.scss'],
})
export class CocktailComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription = new Subscription();
  @Select(CocktailsState.getCurrentCocktail) cocktail$: Observable<Cocktail>;
  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private cocktailService: CocktailService,
    private router: Router
  ) {
    let cocktailDataSub = new Subscription();
    const cocktailSub: Subscription = this.cocktail$
      .pipe(take(1))
      .subscribe((cocktail) => {
        if (cocktail.idDrink === '' || !cocktail.strCategory) {
          const cocktailId = this.activatedRoute.snapshot.params.id
            ? this.activatedRoute.snapshot.params.id
            : undefined;
          if (cocktailId) {
            cocktailDataSub = this.cocktailService
              .getCocktailDetails(cocktailId)
              .subscribe((cocktailData) => {
                this.store.dispatch(new SetCurrent(cocktailData.drinks[0]));
              });
          }
          this._subscriptions.add(cocktailDataSub);
        }
      });
    this._subscriptions.add(cocktailSub);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  getIngredients(drink: Cocktail): string[] {
    const drinkKeys = Object.getOwnPropertyNames(drink);
    const ingredientList = [];
    drinkKeys.map((key) => {
      if (key.startsWith('strIngredient') && drink[key]) {
        ingredientList.push(drink[key]);
      }
    });
    return ingredientList;
  }

  getMeasurements(drink: Cocktail): string[] {
    const drinkKeys = Object.getOwnPropertyNames(drink);
    const measurementList = [];
    drinkKeys.map((key) => {
      if (key.startsWith('strMeasure') && drink[key]) {
        measurementList.push(drink[key]);
      }
    });
    return measurementList;
  }

  returnToList(): void {
    this.router.navigate(['cocktails']);
  }
}
