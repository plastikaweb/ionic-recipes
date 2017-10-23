import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipes.service';
import { RecipePage } from '../recipe/recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {
  recipes: Recipe[] = [];

  constructor(private navController: NavController, private recipesService: RecipesService) {}

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }

  newRecipe() {
    this.navController.push(EditRecipePage, { mode: 'New' });
  }

  loadRecipe(index: number, recipe: Recipe) {
    this.navController.push(RecipePage, { index, recipe });
  }

}
