// here we are importing everything from the model.js file
import * as model from './model.js';
//here we are importing the instance of the class from the recipeView.js file
import recipeView from './views/recipeView.js';

import searchView from './views/searchView.js';

import resultView from './views/resultView.js';

import paginationView from './views/paginationView.js';

import bookmarksView from './views/bookmarksView.js';

import addRecipeView from './views/addRecipeView.js';


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



        // getting the hash from the url
        const id = window.location.hash.slice(1); // here the location is the browser location and the hash is the hash of the url
        // and we are slicing the hash from the url to get the id of the recipe
        // console.log(id);

        // if there is no id in the url, we return from the function by using the guard clause
        if (!id) return;

        // 0. update results view to mark selected search result
        resultView.update(model.getResultsPage());

        //1. rendering the spinner
        recipeView.renderSpinner();

        // 0. update the view to mark the selected search result

        //2. loading the recipe
        // we are calling the loadRecipe function from the model.js file and passing the id as a parameter
        // since the loadRecipe function is an async function, we can use the await keyword to wait for the promise to be resolved
        await model.loadRecipe(id);

        //3. rendering the recipe
        // here we are rendering the recipe to the UI by calling the render method from the recipeView instance
        // and passing the recipe as a parameter
        recipeView.render(model.state.recipe)

        // debugger;
        //4. updating the bookmarks view
        bookmarksView.update(model.state.bookmark);


    }
    catch (err) {
        // console.error(err);
        // we should not set the error message in the controller here
        // instead we will set the error message in the view because the error mesasage will be rendered to the UI
        // we will only call the renderError method from the recipeView instance
        recipeView.renderError();
        console.error(err); // here we are logging the error to the console
    }
}

// we will create a function for the search results feature
// since we will be using the loadSearchResults function from the model.js file, which is asynchronous
// we will make the function asynchronous as well
const controlSearchResults = async function () {
    try {
        // get the query from the search input

        // 1. get the query from the search input
        const query = searchView.getQuery();
        if (!query) return;

        resultView.renderSpinner();

        // 2. load the search results
        await model.loadSearchResults(`${query}`);

        // 3. render the search results
        // console.log(model.state.search.results);
        //resultView.render(model.state.search.results);
        resultView.render(model.getResultsPage());

        // 4. render the initial pagination buttons
        paginationView.render(model.state.search)

    } catch (err) {
        console.error(err);
    }
}
// controlSearchResults();

// since both of the call back functions are calling the same function,  we can put both of them in an array and loop through them
// and add the event listener to each of them

// the handler code in here is not supposed to be in controller.js
// it is related to the view and should be in the view
// but the handler function should be in the controller so to fix this we will use the publisher subscriber pattern

// const eventArray = ['hashchange', 'load'];
// eventArray.forEach(ev => window.addEventListener(ev, showRecipe));

// here we are creating a publisher-subscriber pattern here
// we are calling the addHandlerRender method from the recipeView instance and passing the showRecipe function as a parameter
// the showRecipe function will be used as callback function in the addHandlerRender method in the recipeView.js file
// recipeView.addHandlerRender(showRecipe)

// here we will create a different function to handle the pagination buttons
// here we are using the goToPage parameter which will be coming from the paginationView.js addHandlerClick method
const controlPagination = function (goToPage) {
    // render the new results
    // console.log(goToPage);
    resultView.render(model.getResultsPage(goToPage));
    paginationView.render(model.state.search)

}

// here now we will create a handler function for the serving buttons
// basically this function is to update the servings in the state object in the model
const controlServings = function (newServings) {
    // we will not directly update the servings in the state object from the controller
    // we will create a method in the model to update the servings

    //1. update the recipe servings (in state)
    model.updateServings(newServings);

    //2. updated the recipe view
    // if we use the render method in here then it will update the whole page which is not good
    // so what we can do is to only update the the elements that are changed
    // recipeView.render(model.state.recipe)

    // we will create this method  in the parent view that is the view.js file
    recipeView.update(model.state.recipe)

}

// here now we will create a controller function for the bookmark feature
const controlBookmark = function () {
    // console.log(!model.state.recipe.bookmarked);

    // 1. add or remove the bookmark
    // here if the recipe bookmarked property is true, we will add the recipe to the bookmark array in the state object
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    // if the recipe bookmarked property is false, we will delete the recipe from the bookmark array in the state object by passing the id of the recipe
    else model.deleteBookmark(model.state.recipe.id);

    // console.log(model.state.recipe);

    // 2. update the recipe view
    // we need to update the recipe view when the recipe is bookmarked
    // and we will pass the parameter that needs to be updated
    recipeView.update(model.state.recipe)

    // 3. render the bookmarks view
    // we will render the bookmarks view when the recipe is bookmarked
    // the bookmarked recipe will be rendered on the bookmark panel
    bookmarksView.render(model.state.bookmark); // here we are passing the bookmark array from the state object in the model to the render method in the bookmarksView instance

}

const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmark);

}

const controlAddRecipe = async function (newRecipe) {
    try {
        // we need to await the upload recipe method because it is an async function and it returns a promise
        await model.uploadRecipe(newRecipe);
    }
    // console.log(newRecipe);
    catch (err) {
        console.error('💥', err);
        addRecipeView.renderError(err.message);
    }


}

// here we are connecting the handler function to the event listener or view
const init = function () {
    recipeView.addHandlerRender(showRecipe);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerBookmark(controlBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    bookmarksView.addHandlerEvent(controlBookmarks);
    addRecipeView.addHandlerFormSubmit(controlAddRecipe);
    // controlBookmark();
}
init();
// this is the event listener for the hashchange event which is fired when the hash of the url changes
//window.addEventListener('hashchange', showRecipe);

// this is the event listener for the load event which is fired when the page is loaded or refreshed
//window.addEventListener('load', showRecipe);

// showRecipe();

