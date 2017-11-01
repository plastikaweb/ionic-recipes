import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, PopoverController } from 'ionic-angular';
import { DbOptions } from '../../app/db-options/db-options';
import { Recipe } from '../../models/recipe';
import { AuthService } from '../../services/auth.service';
import { RecipesService } from '../../services/recipes.service';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipePage } from '../recipe/recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {
  recipes: Recipe[] = [];

  constructor(private navController: NavController, private recipesService: RecipesService, private popoverController: PopoverController, private authService: AuthService, private loadingController: LoadingController, private alertController: AlertController) {}

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }

  newRecipe() {
    this.navController.push(EditRecipePage, { mode: 'New' });
  }

  loadRecipe(index: number, recipe: Recipe) {
    this.navController.push(RecipePage, { index, recipe });
  }

  showOptions(ev: MouseEvent) {
    const loading = this.loadingController.create({
      content: 'Please, wait...'
    });
    const popover = this.popoverController.create(DbOptions);
    popover.present({ ev });
    popover.onDidDismiss(data => {
      if (!data) {
        return;
      }
      this.authService.getUser().getToken()
        .then((token: string) => {
          loading.present();
          if (data.action === 'load') {
            this.recipesService.fetchList(token)
              .subscribe(
                (recipes: Recipe[]) => {
                  loading.dismiss();
                  this.recipes = recipes || [];
                },
                (error) => {
                  loading.dismiss();
                  this.handleError(error.json().error);
                }
              );
          } else if (data.action === 'store') {
            this.recipesService.saveList(token)
              .subscribe(
                () => loading.dismiss(),
                (error) => {
                  loading.dismiss();
                  this.handleError(error.json().error);
                })
            ;
          }
        });

    });
  }

  private handleError(error: string) {
    const alert = this.alertController.create({
      title: 'An error occured!',
      message: error,
      buttons: [ 'Ok' ]
    });
    alert.present();
  }
}
