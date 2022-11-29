import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  constructor(private slService: ShoppingListService) {}
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Pasta',
  //     'Gud taste',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=300,272',
  //     [new Ingredient('Meat', 1), new Ingredient('French Toast', 2)]
  //   ),
  //   new Recipe(
  //     'Burger',
  //     'Gud taste',
  //     'https://www.thespruceeats.com/thmb/re5LBEzjhR0aTJAMukjpG_-IVyI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/indian-style-burger-1957599-hero-01-266103a4bb4e4ee7b5feb4da2d2e99da.jpg',
  //     [new Ingredient('Meat', 1), new Ingredient('French Toast', 2)]
  //   ),
  // ];
  private recipes: Recipe[] = [];
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }
  addToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
