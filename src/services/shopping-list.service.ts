import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { FIREBASE_URL } from '../config/firebase.config';
import { Ingredient } from '../models/ingredient';
import { AuthService } from './auth.service';

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  constructor(private http: Http, private authService: AuthService) {}

  addItem(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  addItems(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }

  getItems() {
    return [ ...this.ingredients ];
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  saveList(token: string) {
    const userId = this.authService.getUser().uid;
    return this.http.put(`${FIREBASE_URL}${userId}/shopping-list.json?auth=${token}`, this.ingredients).map((response: Response) => response.json());
  }

  fetchList(token: string) {
    const userId = this.authService.getUser().uid;
    return this.http.get(`${FIREBASE_URL}${userId}/shopping-list.json?auth`)
      .map((response: Response) => response.json())
      .do((data) => this.ingredients = data || []);
  }
}
