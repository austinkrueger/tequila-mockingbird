import { Component, OnInit } from '@angular/core';
import { CocktailService } from 'src/app/services/cocktail.service';
import { Store, Select } from '@ngxs/store';
import { Populate, SetCurrent, Paginate } from 'src/app/state/cocktail.actions';
import { Observable } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail.model';
import { CocktailsState } from 'src/app/state/cocktail.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss'],
})
export class CocktailListComponent implements OnInit {
  @Select(CocktailsState.getCocktails) cocktailList$: Observable<Cocktail[]>;
  currIdx = 0;

  constructor(private store: Store, private router: Router) {
    this.currIdx = this.store.selectSnapshot(CocktailsState.getCurrentIndex);
  }

  ngOnInit(): void {
    this.store.dispatch(new Populate({}));
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
}
