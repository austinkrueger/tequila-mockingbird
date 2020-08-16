import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Search } from 'src/app/state/cocktail.action';
import { Router } from '@angular/router';
import { SetSearchTerm } from 'src/app/state/filter.action';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  searchTerm = new FormControl();
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

  searchCocktails(): void {
    this.store.dispatch(new Search(this.searchTerm.value));
    this.store.dispatch(new SetSearchTerm(this.searchTerm.value));
    this.router.navigate(['cocktails']);
  }
}
