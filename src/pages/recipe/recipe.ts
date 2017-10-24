import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../services/shopping-list.service';
import { RecipesService } from '../../services/recipes.service';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html'
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(private navController: NavController, private navParams: NavParams, private shoppingListService: ShoppingListService, private recipesService: RecipesService) {
  }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  editRecipe() {
    this.navController.push(EditRecipePage, { mode: 'Edit', recipe: this.recipe, index: this.index });
  }

  addIngredients() {
    this.shoppingListService.addItems(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.recipesService.removeRecipe(this.index);
    this.navController.popToRoot();
  }

}
