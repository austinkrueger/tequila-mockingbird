import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import {
  PopulateCategories,
  PopulateIngredients,
  PopulateAlcoholics,
  PopulateGlasses,
  SetCategoryFilter,
  SetIngredientFilter,
  SetAlcoholicFilter,
  SetGlassFilter,
  SetSearchTerm,
} from 'src/app/state/filter.action';
import { FiltersState } from 'src/app/state/filter.state';
import {
  PopulateWithFilter,
  Search,
  Populate,
} from 'src/app/state/cocktail.action';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchTerm = new FormControl();
  categorySelection = new FormControl();
  ingredientSelection = new FormControl();
  alcoholicSelection = new FormControl();
  glassSelection = new FormControl();

  @Select(FiltersState.getCategories) categoryList$: Observable<any[]>;
  @Select(FiltersState.getIngredients) ingredientList$: Observable<any[]>;
  @Select(FiltersState.getAlcoholics) alcoholicList$: Observable<any[]>;
  @Select(FiltersState.getGlasses) glassList$: Observable<any[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchTerm.setValue(
      this.store.selectSnapshot(FiltersState.getSearchTerm)
    );
    this.categorySelection.setValue(
      this.store.selectSnapshot(FiltersState.getCategoryFilter)
    );
    this.ingredientSelection.setValue(
      this.store.selectSnapshot(FiltersState.getIngredientFilter)
    );
    this.alcoholicSelection.setValue(
      this.store.selectSnapshot(FiltersState.getAlcoholicFilter)
    );
    this.glassSelection.setValue(
      this.store.selectSnapshot(FiltersState.getGlassFilter)
    );
    this.store.dispatch(new PopulateCategories({}));
    this.store.dispatch(new PopulateIngredients({}));
    this.store.dispatch(new PopulateAlcoholics({}));
    this.store.dispatch(new PopulateGlasses({}));
  }

  filterCategeory(event: any): void {
    this.store.dispatch(
      new PopulateWithFilter({ filterType: 'c', filterSelection: event.value })
    );
    this.store.dispatch(new SetCategoryFilter(event.value));
    this.searchTerm.reset();
    this.ingredientSelection.reset();
    this.alcoholicSelection.reset();
    this.glassSelection.reset();
  }

  filterIngredient(event: any): void {
    this.store.dispatch(
      new PopulateWithFilter({ filterType: 'i', filterSelection: event.value })
    );
    this.store.dispatch(new SetIngredientFilter(event.value));
    this.searchTerm.reset();
    this.categorySelection.reset();
    this.alcoholicSelection.reset();
    this.glassSelection.reset();
  }

  filterAlcoholic(event: any): void {
    this.store.dispatch(
      new PopulateWithFilter({ filterType: 'a', filterSelection: event.value })
    );
    this.store.dispatch(new SetAlcoholicFilter(event.value));
    this.searchTerm.reset();
    this.ingredientSelection.reset();
    this.categorySelection.reset();
    this.glassSelection.reset();
  }

  filterGlass(event: any): void {
    this.store.dispatch(
      new PopulateWithFilter({ filterType: 'g', filterSelection: event.value })
    );
    this.store.dispatch(new SetGlassFilter(event.value));
    this.searchTerm.reset();
    this.ingredientSelection.reset();
    this.alcoholicSelection.reset();
    this.categorySelection.reset();
  }

  searchCocktails(): void {
    this.store.dispatch(new Search(this.searchTerm.value));
    this.store.dispatch(new SetSearchTerm(this.searchTerm.value));
    this.categorySelection.reset();
    this.ingredientSelection.reset();
    this.alcoholicSelection.reset();
    this.glassSelection.reset();
  }

  clearAllFilters(): void {
    this.store.dispatch(new Search(null));
    this.store.dispatch(new SetSearchTerm(null));
    this.store.dispatch(new Populate({ reset: true }));
    this.searchTerm.reset();
    this.categorySelection.reset();
    this.ingredientSelection.reset();
    this.alcoholicSelection.reset();
    this.glassSelection.reset();
  }
}
