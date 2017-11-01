import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { FIREBASE_URL } from '../config/firebase.config';
import { Recipe } from '../models/recipe';
import { AuthService } from './auth.service';

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  constructor(private http: Http, private authService: AuthService) {}

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  getRecipes() {
    return [ ...this.recipes ];
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[ index ] = recipe;
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  saveList(token: string) {
    const userId = this.authService.getUser().uid;
    return this.http.put(`${FIREBASE_URL}${userId}/recipes.json?auth=${token}`, this.recipes).map((response: Response) => response.json());
  }

  fetchList(token: string) {
    const userId = this.authService.getUser().uid;
    return this.http.get(`${FIREBASE_URL}${userId}/recipes.json?auth=${token}`)
      .map((response: Response) => {
        const recipes: Recipe[] = response.json() || [];
        for (let recipe of recipes) {
          if (!recipe.hasOwnProperty('ingredients')) {
            recipe.ingredients = [];
          }
        }
        return recipes;
      })
      .do((data) => this.recipes = data || []);
  }
}
