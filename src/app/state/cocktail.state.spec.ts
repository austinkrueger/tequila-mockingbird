import { TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { FiltersState } from './filter.state';
import { CocktailsState } from './cocktail.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SetCurrent } from './cocktail.action';

describe('FilterState', () => {
  let store: Store;
  const testState = {
    cocktailList: [
      {
        idDrink: '123123',
        strDrinkThumb: 'imgs/myimg.jpg',
        strDrink: 'Rum and Coke',
        strCategory: 'Regular',
        strAlcoholic: 'Yes',
      },
      {
        idDrink: '123',
        strDrinkThumb: 'imgs/abc.jpg',
        strDrink: 'Long Island Iced Tea',
        strCategory: 'Regular',
        strAlcoholic: 'Yes, very',
      },
      {
        idDrink: '123546465',
        strDrinkThumb: 'imgs/test.jpg',
        strDrink: 'Gin and Tonic',
        strCategory: 'Regular',
        strAlcoholic: 'Yes',
      },
      {
        idDrink: '12332434',
        strDrinkThumb: 'imgs/abc123.jpg',
        strDrink: 'ABC',
        strCategory: 'Shot',
        strAlcoholic: 'Yes',
      },
    ],
    currentCocktail: {
      idDrink: '123',
      strDrinkThumb: 'imgs/abc.jpg',
      strDrink: 'Long Island Iced Tea',
      strCategory: 'Regular',
      strAlcoholic: 'Yes, very',
    },
    currentPageIdx: 0,
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

  it('should set current cocktail', () => {
    store.dispatch(
      new SetCurrent({
        idDrink: '123123',
        strDrinkThumb: 'imgs/myimg.jpg',
        strDrink: 'Rum and Coke',
        strCategory: 'Regular',
        strAlcoholic: 'Yes',
      })
    );

    const cocktail = store.selectSnapshot(
      (state) => state.cocktails.currentCocktail
    );

    expect(cocktail.idDrink).toEqual('123123');
  });

  it('should get cocktailList from getCocktails selector', () => {
    const value = CocktailsState.getCocktails(testState);

    expect(value.length).toBeGreaterThan(0);
  });

  it('should get current cocktail from getCurrentCocktail selector', () => {
    const value = CocktailsState.getCurrentCocktail(testState);

    expect(value.idDrink).toBe('123');
  });

  it('should get current page index', () => {
    const value = CocktailsState.getCurrentIndex(testState);

    expect(value).toBe(0);
  });
});
