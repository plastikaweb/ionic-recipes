import { Component } from '@angular/core';
import { RecipesPage } from '../recipes/recipes';
import { ShoppingListPage } from '../shopping-list/shopping-list';

@Component({
  selector: 'page-tags',
  template: `
<ion-tabs selectedIndex="0">
  <ion-tab [root]="shoppingListPage" tabIcon="list-box" tabTitle="Shopping List"></ion-tab>
  <ion-tab [root]="recipesPage" tabIcon="book" tabTitle="Recipes"></ion-tab>
</ion-tabs>
  `
})
export class TabsPage {
  shoppingListPage = ShoppingListPage;
  recipesPage = RecipesPage;
}