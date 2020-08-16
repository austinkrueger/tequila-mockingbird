import { TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { FiltersState } from './filter.state';
import { CocktailsState } from './cocktail.state';
import {
  SetSearchTerm,
  SetCategoryFilter,
  SetIngredientFilter,
  SetAlcoholicFilter,
  SetGlassFilter,
  SetCurrListView,
} from './filter.action';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FilterState', () => {
  let store: Store;
  const testState = {
    categoryList: [{ name: 'category1' }, { name: 'category2' }],
    ingredientList: [{ name: 'ingredient1' }, { name: 'ingredient2' }],
    alcoholicList: [{ name: 'alcoholic1' }],
    glassList: [{ name: 'glass1' }, { name: 'glass2' }, { name: 'glass3' }],
    categoryFilter: 'shot',
    ingredientFilter: 'rum',
    alcoholicFilter: 'non alcoholic',
    glassFilter: 'highball',
    searchTerm: 'long island',
    currListView: 'cardView',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([CocktailsState, FiltersState]),
      ],
    });

    store = TestBed.inject(Store);
  });

  it('it sets search term and clears out other filters', () => {
    store.dispatch(new SetSearchTerm('my term'));

    const term = store.selectSnapshot((state) => state.filters.searchTerm);
    expect(term).toBe('my term');

    const categoryFilter = store.selectSnapshot(
      (state) => state.filters.categoryFilter
    );
    expect(categoryFilter).toBe(null);

    const ingredientFilter = store.selectSnapshot(
      (state) => state.filters.ingredientFilter
    );
    expect(ingredientFilter).toBe(null);

    const alcoholicFilter = store.selectSnapshot(
      (state) => state.filters.alcoholicFilter
    );
    expect(alcoholicFilter).toBe(null);

    const glassFilter = store.selectSnapshot(
      (state) => state.filters.glassFilter
    );
    expect(glassFilter).toBe(null);
  });

  it('it sets category filter and clears out other filters', () => {
    store.dispatch(new SetCategoryFilter('my filter'));

    const categoryFilter = store.selectSnapshot(
      (state) => state.filters.categoryFilter
    );
    expect(categoryFilter).toBe('my filter');

    const term = store.selectSnapshot((state) => state.filters.searchTerm);
    expect(term).toBe(null);

    const ingredientFilter = store.selectSnapshot(
      (state) => state.filters.ingredientFilter
    );
    expect(ingredientFilter).toBe(null);

    const alcoholicFilter = store.selectSnapshot(
      (state) => state.filters.alcoholicFilter
    );
    expect(alcoholicFilter).toBe(null);

    const glassFilter = store.selectSnapshot(
      (state) => state.filters.glassFilter
    );
    expect(glassFilter).toBe(null);
  });

  it('it sets ingredient filter and clears out other filters', () => {
    store.dispatch(new SetIngredientFilter('my ingredient'));

    const ingredientFilter = store.selectSnapshot(
      (state) => state.filters.ingredientFilter
    );
    expect(ingredientFilter).toBe('my ingredient');

    const categoryFilter = store.selectSnapshot(
      (state) => state.filters.categoryFilter
    );
    expect(categoryFilter).toBe(null);

    const term = store.selectSnapshot((state) => state.filters.searchTerm);
    expect(term).toBe(null);

    const alcoholicFilter = store.selectSnapshot(
      (state) => state.filters.alcoholicFilter
    );
    expect(alcoholicFilter).toBe(null);

    const glassFilter = store.selectSnapshot(
      (state) => state.filters.glassFilter
    );
    expect(glassFilter).toBe(null);
  });

  it('it sets alcoholic filter and clears out other filters', () => {
    store.dispatch(new SetAlcoholicFilter('my choice'));

    const alcoholicFilter = store.selectSnapshot(
      (state) => state.filters.alcoholicFilter
    );
    expect(alcoholicFilter).toBe('my choice');

    const categoryFilter = store.selectSnapshot(
      (state) => state.filters.categoryFilter
    );
    expect(categoryFilter).toBe(null);

    const term = store.selectSnapshot((state) => state.filters.searchTerm);
    expect(term).toBe(null);

    const ingredientFilter = store.selectSnapshot(
      (state) => state.filters.ingredientFilter
    );
    expect(ingredientFilter).toBe(null);

    const glassFilter = store.selectSnapshot(
      (state) => state.filters.glassFilter
    );
    expect(glassFilter).toBe(null);
  });

  it('it sets glass filter and clears out other filters', () => {
    store.dispatch(new SetGlassFilter('my glass'));

    const glassFilter = store.selectSnapshot(
      (state) => state.filters.glassFilter
    );
    expect(glassFilter).toBe('my glass');

    const categoryFilter = store.selectSnapshot(
      (state) => state.filters.categoryFilter
    );
    expect(categoryFilter).toBe(null);

    const term = store.selectSnapshot((state) => state.filters.searchTerm);
    expect(term).toBe(null);

    const alcoholicFilter = store.selectSnapshot(
      (state) => state.filters.alcoholicFilter
    );
    expect(alcoholicFilter).toBe(null);

    const ingredientFilter = store.selectSnapshot(
      (state) => state.filters.ingredientFilter
    );
    expect(ingredientFilter).toBe(null);
  });

  it('sets the value of currListView', () => {
    store.dispatch(new SetCurrListView('tableView'));

    const currListView = store.selectSnapshot(
      (state) => state.filters.currListView
    );
    expect(currListView).toBe('tableView');
  });

  it('gets the value of currListView through selector', () => {
    const value = FiltersState.getCurrListView(testState);

    expect(value).toEqual('cardView');
  });

  it('gets the value of searchTerm through selector', () => {
    const value = FiltersState.getSearchTerm(testState);

    expect(value).toEqual('long island');
  });

  it('gets the value of categoryFilter through selector', () => {
    const value = FiltersState.getCategoryFilter(testState);

    expect(value).toEqual('shot');
  });

  it('gets the value of ingredientFilter through selector', () => {
    const value = FiltersState.getIngredientFilter(testState);

    expect(value).toEqual('rum');
  });

  it('gets the value of alcoholicFilter through selector', () => {
    const value = FiltersState.getAlcoholicFilter(testState);

    expect(value).toEqual('non alcoholic');
  });

  it('gets the value of glassFilter through selector', () => {
    const value = FiltersState.getGlassFilter(testState);

    expect(value).toEqual('highball');
  });

  it('gets the value of categoryList through selector', () => {
    const value = FiltersState.getCategories(testState);

    expect(value.length).toBeGreaterThan(0);
  });

  it('gets the value of ingredientsList through selector', () => {
    const value = FiltersState.getIngredients(testState);

    expect(value.length).toBeGreaterThan(0);
  });

  it('gets the value of alcoholicsList through selector', () => {
    const value = FiltersState.getAlcoholics(testState);

    expect(value.length).toBeGreaterThan(0);
  });

  it('gets the value of glassList through selector', () => {
    const value = FiltersState.getGlasses(testState);

    expect(value.length).toBeGreaterThan(0);
  });
});
