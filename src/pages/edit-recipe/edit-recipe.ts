import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../../models/recipe';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  difficultyOptions = [ 'Easy', 'Medium', 'Hard' ];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(private navParams: NavParams,
              private navController: NavController,
              private actionSheetController: ActionSheetController,
              private alertController: AlertController,
              private toastController: ToastController,
              private recipesService: RecipesService) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode === 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initForm();
  }

  onSubmit() {
    let formIngredients = this.recipeForm.value.ingredients;
    if (formIngredients.length > 0) {
      this.recipeForm.value.ingredients = formIngredients.map(item => {
        return { name: item, amount: 1 };
      });
    }
    if (this.mode === 'Edit') {
      this.recipesService.updateRecipe(this.index, this.recipeForm.value);
    } else {
      this.recipesService.addRecipe(this.recipeForm.value);
    }
    this.recipeForm.reset();
    this.navController.popToRoot();
  }

  getIngredients() {
    const as = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add ingredient',
          handler: () => {
            this.newIngredientAlert().present();
          }
        },
        {
          text: 'Remove all ingredients',
          role: 'destructive',
          handler: () => {
            const formArray = <FormArray>this.recipeForm.get('ingredients');
            if (formArray.length > 0) {
              formArray.controls = [];
              const toast = this.toastController.create({
                message: 'Removed all ingredients',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    as.present();
  }

  private initForm() {
    let title = null;
    let description = null;
    let difficulty = this.difficultyOptions[ 1 ];
    let ingredients = [];

    if (this.mode === 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }
    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  private newIngredientAlert() {
    return this.alertController.create({
      title: 'Add ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            if (data.name.trim() === '' || data.name === null) {
              const toast = this.toastController.create({
                message: 'Please enter a valid value',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            const toast = this.toastController.create({
              message: 'Ingredient added!',
              duration: 1500,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    });
  }
}
