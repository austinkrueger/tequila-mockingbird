import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailComponent } from './cocktail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { CocktailsState } from 'src/app/state/cocktail.state';
import { By } from '@angular/platform-browser';

describe('CocktailComponent', () => {
  let component: CocktailComponent;
  let fixture: ComponentFixture<CocktailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CocktailComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([CocktailsState]),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a list of ingredients from a drink object', () => {
    const ingredientList = component.getIngredients(DRINK);
    expect(ingredientList.length).toBeGreaterThan(0);
    expect(ingredientList).toEqual([
      'Rum',
      'Ginger ale',
      'Fruit punch',
      'Orange juice',
      'Ice',
    ]);
  });

  it('should get a list of measurements from a drink object', () => {
    const measurementList = component.getMeasurements(DRINK);
    expect(measurementList.length).toBeGreaterThan(0);
    expect(measurementList).toEqual([
      'mikey bottle ',
      'large bottle ',
      '355 ml frozen ',
      '355 ml frozen ',
      'crushed ',
    ]);
  });

  // again, these async calls with state are a bit tricky
  // it('should return to cocktail list', () => {
  //   spyOn(component, 'returnToList');
  //   const a = fixture.debugElement.query(By.css('.list-link')).nativeElement;
  //   a.click();
  //   fixture.detectChanges();
  //   expect(component.returnToList).toHaveBeenCalled();
  // });
});

export const DRINK = {
  dateModified: '2015-09-06 16:48:58',
  idDrink: '14978',
  strAlcoholic: 'Alcoholic',
  strCategory: 'Punch / Party Drink',
  strCreativeCommonsConfirmed: 'No',
  strDrink: 'Rum Punch',
  strDrinkAlternate: null,
  strDrinkDE: null,
  strDrinkES: null,
  strDrinkFR: null,
  strDrinkThumb:
    'https://www.thecocktaildb.com/images/media/drink/wyrsxu1441554538.jpg',
  strGlass: 'Punch bowl',
  strIBA: null,
  strIngredient1: 'Rum',
  strIngredient2: 'Ginger ale',
  strIngredient3: 'Fruit punch',
  strIngredient4: 'Orange juice',
  strIngredient5: 'Ice',
  strIngredient6: null,
  strIngredient7: null,
  strIngredient8: null,
  strIngredient9: null,
  strIngredient10: null,
  strIngredient11: null,
  strIngredient12: null,
  strIngredient13: null,
  strIngredient14: null,
  strIngredient15: null,
  strInstructions: 'Mix all ingredients in a punch bowl and serve.',
  strInstructionsDE: 'Alle Zutaten in einer Bowle mischen und servieren.',
  strInstructionsES: null,
  strInstructionsFR: null,
  strMeasure1: 'mikey bottle ',
  strMeasure2: 'large bottle ',
  strMeasure3: '355 ml frozen ',
  strMeasure4: '355 ml frozen ',
  strMeasure5: 'crushed ',
  strMeasure6: null,
  strMeasure7: null,
  strMeasure8: null,
  strMeasure9: null,
  strMeasure10: null,
  strMeasure11: null,
  strMeasure12: null,
  strMeasure13: null,
  strMeasure14: null,
  strMeasure15: null,
  strTags: null,
  strVideo: null,
};
