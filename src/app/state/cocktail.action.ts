import { Cocktail } from '../models/cocktail.model';

export class Populate {
  static readonly type = '[Cocktail] Populate';
  constructor(public filters: any) {}
}

export class PopulateWithFilter {
  static readonly type = '[Cocktail] PopulateWithFilter';
  constructor(public filters: any) {}
}

export class Paginate {
  static readonly type = '[Cocktail] Paginate';
  constructor(public idx: number) {}
}

export class Search {
  static readonly type = '[Cocktail] Search';
  constructor(public term: string) {}
}

export class SetCurrent {
  static readonly type = '[Cocktail] SetCurrent';
  constructor(public cocktail: Cocktail) {}
}
