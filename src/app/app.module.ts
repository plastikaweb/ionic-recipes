import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
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
import { ShoppingListOptions } from '../pages/shopping-list/shopping-list-options/shopping-list-options';
import { ShoppingListPageModule } from '../pages/shopping-list/shopping-list.module';
import { SigninPage } from '../pages/signin/signin';
import { SigninPageModule } from '../pages/signin/signin.module';
import { SignupPage } from '../pages/signup/signup';
import { SignupPageModule } from '../pages/signup/signup.module';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../services/auth.service';
import { RecipesService } from '../services/recipes.service';
import { ShoppingListService } from '../services/shopping-list.service';

import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    EditRecipePageModule,
    RecipePageModule,
    RecipesPageModule,
    ShoppingListPageModule,
    SigninPageModule,
    SignupPageModule
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    ShoppingListOptions,
    TabsPage,
    SigninPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ShoppingListService,
    RecipesService,
    AuthService
  ]
})
export class AppModule {
}
