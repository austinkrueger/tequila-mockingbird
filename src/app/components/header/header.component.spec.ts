import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { NgxsModule } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CocktailsState } from 'src/app/state/cocktail.state';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/app-routing.module';
import { FiltersState } from 'src/app/state/filter.state';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        RouterModule.forRoot(routes),
        NgxsModule.forRoot([CocktailsState, FiltersState]),
      ],
      declarations: [HeaderComponent],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a logo', () => {
    const element: HTMLElement = fixture.nativeElement;
    const img = element.querySelector('img');
    expect(img.src).toContain('/assets/');
  });

  it('should have a list button', () => {
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('.list-button');
    expect(button.innerHTML.trim()).toEqual('Cocktail List');
  });

  it('should have a random button', () => {
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('.random-button');
    expect(button.innerHTML.trim()).toEqual('Random Recipe');
  });

  it('should return a random recipe and route to /cocktails/:id', () => {
    spyOn(component, 'randomRecipe');
    const button = fixture.debugElement.query(By.css('.random-button'))
      .nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.randomRecipe).toHaveBeenCalled();
  });

  it('should return home on logo click', () => {
    spyOn(component, 'returnHome');
    const logo = fixture.debugElement.query(By.css('img')).nativeElement;
    logo.click();
    fixture.detectChanges();
    expect(component.returnHome).toHaveBeenCalled();
  });

  it('should navigate to cocktail list', () => {
    spyOn(component, 'cocktailList');
    const button = fixture.debugElement.query(By.css('.list-button'))
      .nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.cocktailList).toHaveBeenCalled();
  });
});
