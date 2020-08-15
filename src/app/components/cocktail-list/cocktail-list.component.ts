import { Component, OnInit } from '@angular/core';
import { CocktailService } from 'src/app/services/cocktail.service';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss'],
})
export class CocktailListComponent implements OnInit {
  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.getCocktails();
  }

  getCocktails(pageIdx: number = 0): void {
    this.cocktailService.paginateCocktails(pageIdx).subscribe((cocktails) => {
      console.log(cocktails);
    });
  }
}
