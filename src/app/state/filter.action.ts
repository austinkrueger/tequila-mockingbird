export class PopulateCategories {
  static readonly type = '[Filter] PopulateCategories';
  constructor(public payload: any) {}
}

export class PopulateIngredients {
  static readonly type = '[Filter] PopulateIngredients';
  constructor(public payload: any) {}
}

export class PopulateAlcoholics {
  static readonly type = '[Filter] PopulateAlcoholics';
  constructor(public payload: any) {}
}

export class PopulateGlasses {
  static readonly type = '[Filter] PopulateGlasses';
  constructor(public payload: any) {}
}

export class SetSearchTerm {
  static readonly type = '[Filter] SetSearchTerm';
  constructor(public term: string) {}
}

export class SetCategoryFilter {
  static readonly type = '[Filter] SetCategoryFilter';
  constructor(public term: string) {}
}

export class SetIngredientFilter {
  static readonly type = '[Filter] SetIngredientFilter';
  constructor(public term: string) {}
}

export class SetAlcoholicFilter {
  static readonly type = '[Filter] SetAlcoholicFilter';
  constructor(public term: string) {}
}

export class SetGlassFilter {
  static readonly type = '[Filter] SetGlassFilter';
  constructor(public term: string) {}
}

export class SetCurrListView {
  static readonly type = '[Filter] SetCurrListView';
  constructor(public view: string) {}
}
