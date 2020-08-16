import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { CocktailsState } from 'src/app/state/cocktail.state';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltersState } from 'src/app/state/filter.state';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([CocktailsState, FiltersState]),
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a search field', () => {
    const element: HTMLElement = fixture.nativeElement;
    const searchField = element.querySelector('input');
    expect(searchField.placeholder).toEqual('Search for a cocktail');
  });

  it('should have a search button', () => {
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('.search-button');
    expect(button.innerHTML.trim()).toEqual('Search');
  });

  // these are a bit lacking, grabbing data from state
  it('should have a category dropdown', () => {
    const element: HTMLElement = fixture.nativeElement;
    const categoryDropdown = element.querySelector('.category-dropdown');
    expect(categoryDropdown.localName).toEqual('mat-select');
  });

  it('should have an ingredient dropdown', () => {
    const element: HTMLElement = fixture.nativeElement;
    const ingredientDropdown = element.querySelector('.ingredient-dropdown');
    expect(ingredientDropdown.localName).toEqual('mat-select');
  });

  it('should have an alcoholic dropdown', () => {
    const element: HTMLElement = fixture.nativeElement;
    const alcoholicDropdown = element.querySelector('.alcoholic-dropdown');
    expect(alcoholicDropdown.localName).toEqual('mat-select');
  });

  it('should have a glass dropdown', () => {
    const element: HTMLElement = fixture.nativeElement;
    const glassDropdown = element.querySelector('.glass-dropdown');
    expect(glassDropdown.localName).toEqual('mat-select');
  });

  it('should search for cocktails by name', () => {
    spyOn(component, 'searchCocktails');
    const button = fixture.debugElement.query(By.css('.search-button'))
      .nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.searchCocktails).toHaveBeenCalled();
  });
});
