import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, PopoverController } from 'ionic-angular';
import { DbOptions } from '../../app/db-options/db-options';
import { Ingredient } from '../../models/ingredient';
import { AuthService } from '../../services/auth.service';
import { ShoppingListService } from '../../services/shopping-list.service';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService, private popoverController: PopoverController, private authService: AuthService, private loadingController: LoadingController, private alertController: AlertController) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.shoppingListService.addItem(form.value);
    this.loadItems();
    form.reset();
  }

  onCheckItem(index: number) {
    this.shoppingListService.removeItem(index);
    this.loadItems();
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
            this.shoppingListService.fetchList(token)
              .subscribe(
                (ingredients: Ingredient[]) => {
                  loading.dismiss();
                  this.ingredients = ingredients || [];
                },
                (error) => {
                  loading.dismiss();
                  this.handleError(error.json().error);
                }
              );
          } else if (data.action === 'store') {
            this.shoppingListService.saveList(token)
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

  private loadItems() {
    this.ingredients = this.shoppingListService.getItems();
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
