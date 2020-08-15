import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Populate, SetCurrent } from './cocktail.actions';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';

export interface CocktailState {
  cocktailList: Cocktail[];
  currentCocktail: Cocktail;
}

@State<CocktailState>({
  name: 'cocktails',
  defaults: {
    cocktailList: [],
    currentCocktail: {
      idDrink: '',
      strDrinkThumb: '',
      strDrink: '',
      strCategory: '',
      strAlcoholic: '',
    },
  },
})
@Injectable()
export class CocktailsState {
  constructor(private cocktailService: CocktailService) {}

  @Selector()
  static getCocktails(state: CocktailState) {
    return [...state.cocktailList];
  }

  @Selector()
  static getCurrentCocktail(state: CocktailState) {
    return state.currentCocktail;
  }

  @Action(Populate)
  populate(ctx: StateContext<CocktailState>, filters: any[]) {
    const state = ctx.getState();
    // do something with filters here
    this.cocktailService.paginateCocktails(0).subscribe((cocktails) => {
      ctx.setState({
        ...state,
        cocktailList: cocktails.drinks,
      });
    });
  }

  @Action(SetCurrent)
  setCurrent(ctx: StateContext<CocktailState>, cocktail: Cocktail) {
    const state = ctx.getState();
    ctx.patchState({
      currentCocktail: cocktail,
    });
  }
}
