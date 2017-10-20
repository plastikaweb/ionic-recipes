import { Ingredient } from './ingredient';

export interface Recipe {
  title: string;
  description: string;
  difficulty: string;
  ingredients: Ingredient[];
}
