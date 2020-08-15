import { Cocktail } from '../models/cocktail.model';

export class Populate {
  static readonly type = '[Cocktail] Populate';
  constructor(public filters: any) {}
}

export class SetCurrent {
  static readonly type = '[Cocktail] SetCurrent';
  constructor(public cocktail: Cocktail) {}
}
