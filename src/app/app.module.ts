import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { EditRecipePage } from '../pages/edit-recipe/edit-recipe';
import { EditRecipePageModule } from '../pages/edit-recipe/edit-recipe.module';
import { RecipePage } from '../pages/recipe/recipe';
import { RecipePageModule } from '../pages/recipe/recipe.module';
import { RecipesPage } from '../pages/recipes/recipes';
import { RecipesPageModule } from '../pages/recipes/recipes.module';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { ShoppingListPageModule } from '../pages/shopping-list/shopping-list.module';
import { TabsPage } from '../pages/tabs/tabs';

import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    EditRecipePageModule,
    RecipePageModule,
    RecipesPageModule,
    ShoppingListPageModule
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
}
