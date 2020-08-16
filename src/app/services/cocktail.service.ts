import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  baseUri = 'https://www.thecocktaildb.com/api/json/v1/1';
  pages = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
  ];

  constructor(private http: HttpClient) {}

  getPagesLength(): number {
    return this.pages.length;
  }

  getCocktailDetails(cocktailId: string): Observable<any> {
    return this.http.get(`${this.baseUri}/lookup.php?i=${cocktailId}`);
  }

  getFilter(filterType: string): Observable<any> {
    return this.http.get(`${this.baseUri}/list.php?${filterType}=list`);
  }

  paginateCocktails(pageIdx: number): Observable<any> {
    const currPage = pageIdx ? this.pages[pageIdx] : this.pages[0];
    return this.http.get(`${this.baseUri}/search.php?f=${currPage}`);
  }

  searchCocktails(searchTerm: string): Observable<any> {
    if (searchTerm) {
      const searchType = searchTerm.length === 1 ? 'f' : 's';
      return this.http.get(
        `${this.baseUri}/search.php?${searchType}=${searchTerm}`
      );
    } else {
      return this.http.get(`${this.baseUri}/search.php?f=${this.pages[0]}`);
    }
  }

  filterByCategory(
    filterType: string,
    filterSelection: string
  ): Observable<any> {
    return this.http.get(
      `${this.baseUri}/filter.php?${filterType}=${filterSelection}`
    );
  }

  getRandomCocktail(): Observable<any> {
    return this.http.get(`${this.baseUri}/random.php`);
  }
}
