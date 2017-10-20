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

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  difficultyOptions = [ 'Easy', 'Medium', 'Hard' ];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams,
              private navController: NavController,
              private actionSheetController: ActionSheetController,
              private alertController: AlertController,
              private toastController: ToastController,
              private recipesService: RecipesService) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initForm();
  }

  onSubmit() {
    let formIngredients = this.recipeForm.value.ingredients;
    if (formIngredients.length > 0) {
      this.recipeForm.value.ingredients = formIngredients.map(item => {
        return {name: item, amount: 1};
      });
    }
    this.recipesService.addRecipe(this.recipeForm.value);
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
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl(this.difficultyOptions[ 1 ], Validators.required),
      'ingredients': new FormArray([])
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
