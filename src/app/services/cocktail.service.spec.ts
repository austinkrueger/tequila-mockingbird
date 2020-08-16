import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';

import { CocktailService } from './cocktail.service';
import { NgxsModule } from '@ngxs/store';
import { CocktailsState } from '../state/cocktail.state';
import { FiltersState } from '../state/filter.state';

describe('CocktailService test using HttpClientTestingModule', () => {
  let httpTestingController: HttpTestingController;
  let service: CocktailService;
  const baseUri = 'https://www.thecocktaildb.com/api/json/v1/1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([CocktailsState, FiltersState]),
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CocktailService);
  });

  it('should return the length of possible pages', () => {
    expect(service.getPagesLength()).toEqual(36);
  });

  it('should return a list from paginateCocktails', () => {
    const testData: any = [{ id: '2139842893', name: 'Aa Drink' }];

    service.paginateCocktails(0).subscribe(
      (data) => {
        expect(data.length).toBeGreaterThanOrEqual(testData.length);
      },
      (error: HttpErrorResponse) =>
        fail('Should have returned a list of drinks')
    );

    const req = httpTestingController.expectOne(`${baseUri}/search.php?f=a`);

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });

  it('should return cocktail details', () => {
    const testData: any = { id: '2139842893', name: 'Test Drink' };
    const queryId: string = '2139842893';
    service.getCocktailDetails(queryId).subscribe(
      (data) => {
        expect(data).toEqual(testData);
      },
      (error: HttpErrorResponse) =>
        fail('Should have returned details of a drink')
    );

    const req = httpTestingController.expectOne(
      `${baseUri}/lookup.php?i=${queryId}`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });

  it('should return available category list', () => {
    const testData: any = ['cat 1', 'cat 2', 'cat 3', 'cat 4'];
    const queryCat: string = 'c';

    service.getFilter(queryCat).subscribe(
      (data) => {
        expect(data).toEqual(testData);
      },
      (error: HttpErrorResponse) =>
        fail('Should have returned available category list')
    );

    const req = httpTestingController.expectOne(
      `${baseUri}/list.php?${queryCat}=list`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });

  it('should reset the search to letter a if no term is included', () => {
    const testData: any = [{ id: '123', name: 'A drink' }];

    service.searchCocktails(null).subscribe(
      (data) => {
        expect(data).toEqual(testData);
      },
      (error: HttpErrorResponse) =>
        fail(
          'Should have returned list of drinks that were on the first page (a)'
        )
    );

    const req = httpTestingController.expectOne(`${baseUri}/search.php?f=a`);

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });

  it('should search by first letter', () => {
    const testData: any = [{ id: '123', name: 'A drink' }];
    const querySearch: string = 'a';
    // search by first letter
    service.searchCocktails(querySearch).subscribe(
      (data) => {
        expect(data).toEqual(testData);
      },
      (error: HttpErrorResponse) =>
        fail('Should have returned list of drinks that match the search query')
    );

    const req = httpTestingController.expectOne(
      `${baseUri}/search.php?f=${querySearch}`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });

  it('should search by name', () => {
    const testData: any = [{ id: '124', name: 'Margarita' }];
    const querySearch: string = 'margarita';
    // search by full name
    service.searchCocktails(querySearch).subscribe(
      (data) => {
        expect(data).toEqual(testData);
      },
      (error: HttpErrorResponse) =>
        fail('Should have returned list of drinks that match the search query')
    );

    const req = httpTestingController.expectOne(
      `${baseUri}/search.php?s=${querySearch}`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });

  it('should filter by category (ingredient)', () => {
    const testData: any = [
      { id: '124', name: 'Margarita' },
      { id: '123', name: 'A drink' },
    ];
    const queryFilter: string = 'i';
    const querySelection: string = 'Tequila';
    // filter by ingredient, Tequila
    service.filterByCategory(queryFilter, querySelection).subscribe(
      (data) => {
        expect(data).toEqual(testData);
      },
      (error: HttpErrorResponse) =>
        fail('Should have returned list of drinks with a specific ingredient')
    );

    const req = httpTestingController.expectOne(
      `${baseUri}/filter.php?${queryFilter}=${querySelection}`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });

  it('should get a random drink', () => {
    const testData: any = { id: '438489', name: 'Random Drink 1234' };

    service.getRandomCocktail().subscribe(
      (data) => {
        expect(data).toEqual(testData);
      },
      (error: HttpErrorResponse) =>
        fail('Should have returned detials of a random drink')
    );
    const req = httpTestingController.expectOne(`${baseUri}/random.php`);

    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });

  it('throws 404 error', () => {
    service.getCocktailDetails('1').subscribe(
      (data) => fail('Should have failed with 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toContain('404 error');
      }
    );

    const req = httpTestingController.expectOne(`${baseUri}/lookup.php?i=1`);

    // Respond with fake error
    req.flush('404 error', { status: 404, statusText: 'Not Found' });
  });
});
