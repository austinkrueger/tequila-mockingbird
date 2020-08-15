import { TestBed } from '@angular/core/testing';
import { HttpErrorInterceptor } from './http-error.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { CocktailService } from './cocktail.service';

describe('HttpErrorInterceptor', () => {
  let httpErrorInterceptor: HttpErrorInterceptor;
  let httpTestingController: HttpTestingController;
  let cocktailService: CocktailService;
  const baseUri = 'https://www.thecocktaildb.com/api/json/v1/1';

  beforeEach(async () =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CocktailService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
        },
      ],
    })
  );

  beforeEach(() => {
    httpErrorInterceptor = new HttpErrorInterceptor();
    httpTestingController = TestBed.inject(HttpTestingController);
    cocktailService = TestBed.inject(CocktailService);
  });

  // needs a bit more diving in here, not 100% sure how to trigger an error event that will be picked up
  it('should catch server error', async () => {
    cocktailService.getCocktailDetails('1').subscribe(
      (data) => fail('Should have failed with 500 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500);
        expect(error.error).toContain('Error');
      }
    );

    const req = httpTestingController.expectOne(`${baseUri}/lookup.php?i=1`);

    // Respond with server error, should trigger interceptor
    req.flush('500 error', { status: 500, statusText: 'Server error' });
  });
});
