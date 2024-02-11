import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

// state is an object that will store the data we need to render the recipe
// we will store the recipe data in the state object
export const state = {
    recipe: {}
}

// now we will create a function to get the recipe from the api
// the function will take the id as a parameter to get the recipe with that id
export const loadRecipe = async function (id) {
    try {
        // we are fetching the recipe data from the api
        const data = await getJSON(`${API_URL}/${id}`)

        let { recipe } = data.data;
        // now we will store the recipe data in the state recipe object
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
        console.log(state.recipe);
    } catch (err) {
        console.error(err + '💣💣💣💣💣');
    }
}

