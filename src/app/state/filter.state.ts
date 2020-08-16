import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CocktailService } from '../services/cocktail.service';
import {
  PopulateGlasses,
  PopulateCategories,
  PopulateIngredients,
  PopulateAlcoholics,
  SetSearchTerm,
  SetCategoryFilter,
  SetIngredientFilter,
  SetAlcoholicFilter,
  SetGlassFilter,
} from './filter.action';

export interface FilterState {
  categoryList: any[];
  ingredientList: any[];
  alcoholicList: any[];
  glassList: any[];
  categoryFilter: string;
  ingredientFilter: string;
  alcoholicFilter: string;
  glassFilter: string;
  searchTerm: string;
}

@State<FilterState>({
  name: 'filters',
  defaults: {
    categoryList: [],
    ingredientList: [],
    alcoholicList: [],
    glassList: [],
    categoryFilter: '',
    ingredientFilter: '',
    alcoholicFilter: '',
    glassFilter: '',
    searchTerm: '',
  },
})
@Injectable()
export class FiltersState {
  constructor(private cocktailService: CocktailService) {}

  @Selector()
  static getCategories(state: FilterState) {
    return [...state.categoryList];
  }

  @Selector()
  static getIngredients(state: FilterState) {
    return [...state.ingredientList];
  }

  @Selector()
  static getAlcoholics(state: FilterState) {
    return [...state.alcoholicList];
  }

  @Selector()
  static getGlasses(state: FilterState) {
    return [...state.glassList];
  }

  @Selector()
  static getSearchTerm(state: FilterState) {
    return state.searchTerm;
  }

  @Selector()
  static getCategoryFilter(state: FilterState) {
    return state.categoryFilter;
  }

  @Selector()
  static getIngredientFilter(state: FilterState) {
    return state.ingredientFilter;
  }

  @Selector()
  static getAlcoholicFilter(state: FilterState) {
    return state.alcoholicFilter;
  }

  @Selector()
  static getGlassFilter(state: FilterState) {
    return state.glassFilter;
  }

  @Action(PopulateCategories)
  populateCategories(ctx: StateContext<FilterState>, payload: any) {
    const state = ctx.getState();
    this.cocktailService.getFilter('c').subscribe((categories) => {
      ctx.patchState({
        categoryList: categories.drinks,
      });
    });
  }

  @Action(PopulateIngredients)
  populateIngredients(ctx: StateContext<FilterState>, payload: any) {
    const state = ctx.getState();
    this.cocktailService.getFilter('i').subscribe((ingredients) => {
      ctx.patchState({
        ingredientList: ingredients.drinks,
      });
    });
  }

  @Action(PopulateAlcoholics)
  populateAlcoholics(ctx: StateContext<FilterState>, payload: any) {
    const state = ctx.getState();
    this.cocktailService.getFilter('a').subscribe((alcoholics) => {
      ctx.patchState({
        alcoholicList: alcoholics.drinks,
      });
    });
  }

  @Action(PopulateGlasses)
  populateGlasses(ctx: StateContext<FilterState>, payload: any) {
    const state = ctx.getState();
    this.cocktailService.getFilter('g').subscribe((glasses) => {
      ctx.patchState({
        glassList: glasses.drinks,
      });
    });
  }

  @Action(SetSearchTerm)
  setSearchTerm(ctx: StateContext<FilterState>, payload: any) {
    const state = ctx.getState();
    ctx.patchState({
      searchTerm: payload.term,
      categoryFilter: '',
      ingredientFilter: '',
      alcoholicFilter: '',
      glassFilter: '',
    });
  }

  @Action(SetCategoryFilter)
  setCategoryFilter(ctx: StateContext<FilterState>, payload: any) {
    const state = ctx.getState();
    ctx.patchState({
      searchTerm: '',
      categoryFilter: payload.term,
      ingredientFilter: '',
      alcoholicFilter: '',
      glassFilter: '',
    });
  }

  @Action(SetIngredientFilter)
  setIngredientFilter(ctx: StateContext<FilterState>, payload: any) {
    const state = ctx.getState();
    ctx.patchState({
      searchTerm: '',
      categoryFilter: '',
      ingredientFilter: payload.term,
      alcoholicFilter: '',
      glassFilter: '',
    });
  }

  @Action(SetAlcoholicFilter)
  setAlcoholicFilter(ctx: StateContext<FilterState>, payload: any) {
    const state = ctx.getState();
    ctx.patchState({
      searchTerm: '',
      categoryFilter: '',
      ingredientFilter: '',
      alcoholicFilter: payload.term,
      glassFilter: '',
    });
  }

  @Action(SetGlassFilter)
  setGlassFilter(ctx: StateContext<FilterState>, payload: any) {
    const state = ctx.getState();
    ctx.patchState({
      searchTerm: '',
      categoryFilter: '',
      ingredientFilter: '',
      alcoholicFilter: '',
      glassFilter: payload.term,
    });
  }
}
