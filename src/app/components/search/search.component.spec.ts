import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { CocktailsState } from 'src/app/state/cocktail.state';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([CocktailsState]),
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

  it('should have a category dropdown', () => {});

  it('should have an ingredient dropdown', () => {});

  it('should have an alcoholic dropdown', () => {});

  it('should have a glass dropdown', () => {});

  it('should search for cocktails by name', () => {
    spyOn(component, 'searchCocktails');
    const button = fixture.debugElement.query(By.css('.search-button'))
      .nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.searchCocktails).toHaveBeenCalled();
  });
});
