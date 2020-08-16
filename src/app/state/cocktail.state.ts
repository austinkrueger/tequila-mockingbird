import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  Populate,
  SetCurrent,
  PopulateWithFilter,
  Paginate,
  Search,
} from './cocktail.action';
import { Cocktail } from '../models/cocktail.model';
import { CocktailService } from '../services/cocktail.service';

export interface CocktailState {
  cocktailList: Cocktail[];
  currentCocktail: Cocktail;
  currentPageIdx: number;
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
    currentPageIdx: 0,
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

  @Selector()
  static getCurrentIndex(state: CocktailState) {
    return state.currentPageIdx;
  }

  @Action(Populate)
  populate(ctx: StateContext<CocktailState>, payload: any) {
    const state = ctx.getState();
    if (state.cocktailList.length > 0 && !payload.filters.reset) {
      return;
    }
    // initial list state
    this.cocktailService.paginateCocktails(0).subscribe((cocktails) => {
      ctx.patchState({
        cocktailList: cocktails.drinks ? cocktails.drinks : [],
      });
    });
  }

  @Action(PopulateWithFilter)
  populateWithFilter(ctx: StateContext<CocktailState>, payload: any) {
    this.cocktailService
      .filterByCategory(
        payload.filters.filterType,
        payload.filters.filterSelection
      )
      .subscribe((cocktails) => {
        ctx.patchState({
          cocktailList: cocktails.drinks ? cocktails.drinks : [],
        });
      });
  }

  @Action(Paginate)
  paginate(ctx: StateContext<CocktailState>, payload: any) {
    this.cocktailService
      .paginateCocktails(payload.idx)
      .subscribe((cocktails) => {
        ctx.patchState({
          currentPageIdx: payload.idx,
          cocktailList: cocktails.drinks ? cocktails.drinks : [],
        });
      });
  }

  @Action(Search)
  search(ctx: StateContext<CocktailState>, payload: any) {
    this.cocktailService
      .searchCocktails(payload.term)
      .subscribe((cocktails) => {
        ctx.patchState({
          cocktailList: cocktails.drinks ? cocktails.drinks : [],
        });
      });
  }

  @Action(SetCurrent)
  setCurrent(ctx: StateContext<CocktailState>, cocktail: Cocktail) {
    ctx.patchState({
      currentCocktail: cocktail.cocktail,
    });
  }
}
