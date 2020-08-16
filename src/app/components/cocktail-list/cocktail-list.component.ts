import { Component, OnInit } from '@angular/core';
import { CocktailService } from 'src/app/services/cocktail.service';
import { Store, Select } from '@ngxs/store';
import { Populate, SetCurrent, Paginate } from 'src/app/state/cocktail.action';
import { Observable } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail.model';
import { CocktailsState } from 'src/app/state/cocktail.state';
import { Router } from '@angular/router';
import { FiltersState } from 'src/app/state/filter.state';
import { SetCurrListView } from 'src/app/state/filter.action';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss'],
})
export class CocktailListComponent implements OnInit {
  @Select(CocktailsState.getCocktails) cocktailList$: Observable<Cocktail[]>;
  displayedColumns: string[] = ['img', 'name', 'category', 'alcoholic', 'view'];
  currIdx = 0;
  pagesLength;
  @Select(FiltersState.getCurrListView) currListView$: Observable<string>;

  constructor(
    private store: Store,
    private router: Router,
    private cocktailService: CocktailService
  ) {
    this.currIdx = this.store.selectSnapshot(CocktailsState.getCurrentIndex);
  }

  ngOnInit(): void {
    this.store.dispatch(new Populate({}));
    this.pagesLength = this.cocktailService.getPagesLength();
  }

  viewRecipe(cocktail: Cocktail): void {
    this.router.navigate(['cocktails', cocktail.idDrink]);
    this.store.dispatch(new SetCurrent(cocktail));
  }

  previousPage(): void {
    this.currIdx -= 1;
    this.store.dispatch(new Paginate(this.currIdx));
  }

  nextPage(): void {
    this.currIdx += 1;
    this.store.dispatch(new Paginate(this.currIdx));
  }

  setCurrentListView(view: string): void {
    this.store.dispatch(new SetCurrListView(view));
  }
}
