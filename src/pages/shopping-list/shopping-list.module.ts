import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingListPage } from './shopping-list';
import { ShoppingListOptions } from './shopping-list-options/shopping-list-options';

@NgModule({
  declarations: [
    ShoppingListPage,
    ShoppingListOptions
  ],
  imports: [
    IonicPageModule.forChild(ShoppingListPage)
  ]
})
export class ShoppingListPageModule {}
