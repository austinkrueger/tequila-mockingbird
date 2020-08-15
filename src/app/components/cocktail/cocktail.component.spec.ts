import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailComponent } from './cocktail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { CocktailsState } from 'src/app/state/cocktail.state';

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
});
