import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { CocktailsState } from 'src/app/state/cocktail.state';
import { FiltersState } from 'src/app/state/filter.state';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([CocktailsState, FiltersState]),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Tequila Mockinbird as the title', () => {
    const element: HTMLElement = fixture.nativeElement;
    const h1 = element.querySelector('h1');
    expect(h1.textContent).toEqual('Tequila Mockingbird');
  });

  it('should have a tagline', () => {
    const element: HTMLElement = fixture.nativeElement;
    const h2 = element.querySelector('h2');
    expect(h2.textContent).toContain('view various cocktails');
  });

  it('should link to thecocktaildb', () => {
    const element: HTMLElement = fixture.nativeElement;
    const a = element.querySelector('a');
    expect(a.href).toEqual('https://www.thecocktaildb.com/');
    expect(a.textContent).toEqual('TheCocktailDB');
  });

  it('should have a search field', () => {
    const element: HTMLElement = fixture.nativeElement;
    const searchField = element.querySelector('input');
    expect(searchField.placeholder).toEqual('Search for a cocktail');
  });

  it('should have a search button', () => {
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('button');
    expect(button.innerHTML.trim()).toEqual('Search');
  });

  it('should execute a search', () => {
    spyOn(component, 'searchCocktails');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.searchCocktails).toHaveBeenCalled();
  });
});
