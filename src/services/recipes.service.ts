import { Recipe } from '../models/recipe';

export class RecipesService {
  private recipes: Recipe[] = [];

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  getRecipes() {
    return [ ...this.recipes ];
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[ index ] = recipe;
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }
}
