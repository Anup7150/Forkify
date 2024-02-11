// here we are importing everything from the model.js file
import * as model from './model.js';
//here we are importing the instance of the class from the recipeView.js file
import recipeView from './views/recipeView.js'


import 'core-js/stable';
import 'regenerator-runtime/runtime';

// console.log(icons);
// const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2
// if (!res.ok) throw new Error(`${data.message} (${res.status})`)

// creating a new object with the properties we want from the data object we got from the API
// using the destructuring method with the same name as the property we want to extract, here is recipe
// let { recipe } = data.data;

// now here we are creating an object with the properties we want from the recipe object
// recipe = {
//     id: recipe.id,
//     title: recipe.title,
//     publisher: recipe.publisher,
//     sourceUrl: recipe.source_url,
//     image: recipe.image_url,
//     servings: recipe.servings,
//     cookingTime: recipe.cooking_time,
//     ingredients: recipe.ingredients

//}
///////////////////////////////////////
// creating a function to render the spinner to the element we want to render it to
// in this case the parentEl is the recipeContainer because we want to render the spinner to the recipeContainer


const showRecipe = async function () {

    // loading the recipe
    try {
        // rendering the spinner
        recipeView.renderSpinner();

        // getting the hash from the url
        const id = window.location.hash.slice(1); // here the location is the browser location and the hash is the hash of the url
        // and we are slicing the hash from the url to get the id of the recipe
        console.log(id);

        // if there is no id in the url, we return from the function by using the guard clause
        if (!id) return;

        // loading the recipe
        // we are calling the loadRecipe function from the model.js file and passing the id as a parameter
        // since the loadRecipe function is an async function, we can use the await keyword to wait for the promise to be resolved
        await model.loadRecipe(id);

        // rendering the recipe
        // here we are rendering the recipe to the UI by calling the render method from the recipeView instance
        // and passing the recipe as a parameter
        recipeView.render(model.state.recipe)



    }
    catch (err) {
        console.error(err);
    }
}

// since both of the call back functions are calling the same function,  we can put both of them in an array and loop through them
// and add the event listener to each of them
const eventArray = ['hashchange', 'load'];
eventArray.forEach(ev => window.addEventListener(ev, showRecipe));

// this is the event listener for the hashchange event which is fired when the hash of the url changes
//window.addEventListener('hashchange', showRecipe);

// this is the event listener for the load event which is fired when the page is loaded or refreshed
//window.addEventListener('load', showRecipe);

// showRecipe();

