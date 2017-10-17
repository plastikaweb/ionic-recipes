import { Ingredient } from '../models/ingredient';

export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  addItem(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  addItems(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }

  getItems() {
    return [ ...this.ingredients ];
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }
}
