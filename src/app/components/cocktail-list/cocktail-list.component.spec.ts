import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailListComponent } from './cocktail-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CocktailsState } from 'src/app/state/cocktail.state';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';

describe('CocktailListComponent', () => {
  let component: CocktailListComponent;
  let fixture: ComponentFixture<CocktailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CocktailListComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([CocktailsState]),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
