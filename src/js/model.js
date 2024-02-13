import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

// state is an object that will store all the data that we need to in the application
// we will store the recipe data in the state object
export const state = {
    recipe: {},
    search: {
        query: '',
        results: []
    }
}

// now we will create a function to get the recipe from the api
// the function will take the id as a parameter to get the recipe with that id
export const loadRecipe = async function (id) {
    try {
        // we are fetching the recipe data from the api
        const data = await getJSON(`${API_URL}${id}`)

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
        // console.log(state.recipe);
    } catch (err) {
        // since the error here doesnot belong in the model, we need to catch in show in the view
        // so we will re throw the error again so that we can catch it in the controller
        // and send to the view

        console.error(err + '💣💣💣💣💣');
        throw err;
    }
}

// now we will create a function to get the search results from the api
// we need to export the function so that we can us it in the controller
// the function will take the query as a parameter which will be passed from the controller
// the function will be async because we are doing the AJAX call

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`)
        console.log(data);
        // we will store the data coming from the api in new object and store it in the state object
        state.search.results = data.data.recipes.map(rec => {
            // here we are creating a new object with the properties we want from the data object we got from the API
            //
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        })
        // console.log(state.search.results);

    } catch (err) {
        console.error(err);
        throw err;
    }
}

// loadSearchResults('pizza');

