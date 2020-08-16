import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailListComponent } from './cocktail-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CocktailsState } from 'src/app/state/cocktail.state';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { By } from '@angular/platform-browser';
import { Populate } from 'src/app/state/cocktail.action';
import { CocktailService } from 'src/app/services/cocktail.service';
import { of } from 'rxjs';
import { FiltersState } from 'src/app/state/filter.state';

describe('CocktailListComponent', () => {
  let component: CocktailListComponent;
  let fixture: ComponentFixture<CocktailListComponent>;
  let store: Store;
  let cocktailService: CocktailService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CocktailListComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([CocktailsState, FiltersState]),
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    cocktailService = TestBed.inject(CocktailService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a previous button', () => {
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('.previous');
    expect(button.innerHTML.trim()).toContain('</mat-icon>');
  });

  it('should have a next button', () => {
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('.next');
    expect(button.innerHTML.trim()).toContain('</mat-icon>');
  });

  it('should paginate forward', () => {
    spyOn(component, 'nextPage');
    const button = fixture.debugElement.query(By.css('.next')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.nextPage).toHaveBeenCalled();
  });

  it('should initialize with previous button as disabled', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector(
      '.previous'
    );
    expect(button.disabled).toBeTruthy();
  });

  it('should paginate backward', () => {
    spyOn(component, 'previousPage');
    component.currIdx = 1;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector(
      '.previous'
    );
    expect(button.disabled).toBeFalsy();
    button.click();
    fixture.detectChanges();
    expect(component.previousPage).toHaveBeenCalled();
  });

  // learning how to test state-related functions
  // both of these would appear after state is filled
  // it('should display a list of cocktails', () => {
  //   const cocktailList = [
  //     {
  //       idDrink: '1',
  //       strDrinkThumb: '/abc.jpg',
  //       strDrink: 'Abc',
  //       strCategory: 'shot',
  //       strAlcoholic: 'non',
  //     },
  //     {
  //       idDrink: '2',
  //       strDrinkThumb: '/123.jpg',
  //       strDrink: 'Bcd',
  //       strCategory: 'shot',
  //       strAlcoholic: 'non',
  //     },
  //   ];

  //   spyOn(cocktailService, 'paginateCocktails').and.returnValue(
  //     of(cocktailList)
  //   );
  //   store.dispatch(new Populate({})).toPromise();
  //   expect(cocktailService.paginateCocktails).toHaveBeenCalled();
  //   const cocktails = store.selectSnapshot(CocktailsState.getCocktails);
  //   expect(cocktails).toEqual(cocktailList);
  //   const element: HTMLElement = fixture.nativeElement;
  //   const cards = element.querySelectorAll('.mat-card');
  //   expect(cards.length).toBeGreaterThan(0);
  // });

  // it('should navigate to a recipe', () => {
  //   spyOn(component, 'viewRecipe');
  //   const button = fixture.debugElement.query(By.css('.recipe-button'))
  //     .nativeElement;
  //   button.click();
  //   fixture.detectChanges();
  //   expect(component.viewRecipe).toHaveBeenCalled();
  // });

  // it('should populate cocktail list', () => {
  //   store.dispatch(new Populate({}));
  //   const cocktailList = store.selectSnapshot(
  //     (state) => state.cocktails.cocktailList
  //   );

  //   console.log(cocktailList);

  //   expect(cocktailList.length).toBeGreaterThan(0);
  // });
});
