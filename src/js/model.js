import { API_URL, RES_PER_PAGE, KEY } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';

import { AJAX } from './helpers.js';

// state is an object that will store all the data that we need to in the application
// we will store the recipe data in the state object
export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1, // we will store the page 1 as default page
    },
    bookmark: [],
    // since this number is constant and will never change, we will store it in the config file
    // numberPerPage: 10,
}

// here we will create an object to create the recipe
const createRecipeObject = function (data) {

    let { recipe } = data.data;
    // now we will store the recipe data in the state recipe object
    // state.recipe = {
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        // the code below is that if the key exists, we will add the key property to the recipe object, which returns an object and we are using the spread operator to add the key property to the recipe object
        ...(recipe.key && { key: recipe.key }), // this is a short circuiting and we are using the spread operator to add the key property to the recipe object

    }

    console.log(recipe);
}

// now we will create a function to get the recipe from the api
// the function will take the id as a parameter to get the recipe with that id
export const loadRecipe = async function (id) {
    try {
        // we are fetching the recipe data from the api
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`)

        // here we will create an recipe object with the properties we want from the data object we got from the API
        state.recipe = createRecipeObject(data);
        console.log(state.recipe);

        // here we want to check if the recipe is bookmarked or not
        // we can do that by checking the recipe id that is in the bookmark array with the recipe id in the state object
        // if the id matches and the recipe is bokmarked, we will set the bookmarked property to true
        // if the recipe is not bookmarked, we will set the bookmarked property to false
        // we will use the some method of array to check the condition

        state.bookmark.some(bookmark => bookmark.id === id ? state.recipe.bookmarked = true : state.recipe.bookmarked = false)

    } catch (err) {
        // since the error here doesnot belong in the model, we need to catch in show in the view
        // so we will re throw the error again so that we can catch it in the controller
        // and send to the view

        console.error(err + '💣💣💣💣💣');
        throw err;
    }

    // console.log(state.recipe);
}

// now we will create a function to get the search results from the api
// we need to export the function so that we can us it in the controller
// the function will take the query as a parameter which will be passed from the controller
// the function will be async because we are doing the AJAX call

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`)
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
                ...(rec.key && { key: rec.key }),

            }
        })

        state.search.page = 1;
        // console.log(state.search.results);

    } catch (err) {
        console.error(err);
        throw err;
    }
}

// here we will create a function to get the search results for the pagination feature
// the logic for the pagination feature will be implemented in the model because the model is the place where we store the data
// the function will take the page as a parameter

export const getResultsPage = function (page = state.search.page) {
    // since we arleady have the search results and we only want to display certain amount of results per page
    // we will use the slice method to slice the search results array
    // we will store the value of page that is comming in the parameter in a variable called page
    // because we will use it to calculate the number of page
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    // console.log(start, end);
    return state.search.results.slice(start, end);
}

// here we will create a function to update the servings
export const updateServings = function (newServing) {
    // with the serving, we also need to update the ingredients quantity which is inside the ingredients array
    // so we will loop through the ingredients array and update the quantity
    state.recipe.ingredients.forEach(ing => {
        // the logic here is that we will multiply the quantity of each ingredient by the new serving and divide it by the old serving
        // this will give us the new quantity for each ingredient
        const newQuantity = (ing.quantity * newServing) / state.recipe.servings;
        ing.quantity = newQuantity;

    })
    // now we will update the servings in the state object
    state.recipe.servings = newServing;
}

// now here we will create a function to add the bookmarked recipe in the local storage
// simply we want to render the bookmarked recipe when the user refresh the page
const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmark)); // here we are storing the bookmark array in the local storage as a string because the local storage can only store strings

}

// here now we will create a function for the bookmarks which we will export so that we can use it in the controller

// Add a bookmarked recipe
export const addBookmark = function (recipe) {
    // here now we will add the incoming recipe to the bookmarks array
    state.bookmark.push(recipe);
    // now we if the recipe is bookmarked, we will render the recipe as the bookmarked recipe
    // we can do that by comparing the incoming recipe id with the id of the recipe in the state object

    // mark current recipe as bookmarked
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    // now we will store the bookmarked recipe in the local storage
    persistBookmarks();
}

// here we will create another function to remove the bookmarked recipe
// in this function we will need a recipe id to remove the recipe from the bookmark array
// we will use the splice method to remove the recipe from the bookmark array

// Delete a bookmarked recipe
export const deleteBookmark = function (id) {
    // here we will find the index of the recipe in the which we want to remove from the bookmark array
    // here we will use the findIndex method to find the index of the recipe in the bookmark array
    //  the recipe we want to remove will be the recipe whose id matches the id that is coming in the parameter
    const index = state.bookmark.findIndex(el => el.id === id); // it will return the index of the recipe whose id matches the id that is coming in the parameter
    state.bookmark.splice(index, 1); // here the splice method will remove one element from the array

    // mark current recipe as NOT bookmarked
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmarks();
}

// lets create a function to upload the recipe
// sending the data to the API
// it will be an async function because it will make an API call
// it recives an argument which is the new recipe
export const uploadRecipe = async function (newRecipe) {
    try {
        // 1. upload the new recipe data
        // converting an oject to an array and then filtering the array with condition
        const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
            .map(ing => {
                const ingArr = ing[1].split(',').map(el => el.trim());
                // const ingArr = ing[1].replaceAll(' ', '').split(',');

                const [quantity, unit, description] = ingArr;

                // now we will check a conditon
                if (ingArr.length !== 3) throw new Error('Wrong ingredient format! Please use the correct format :)');


                // we are returning an object with the properties we want from the ingredients array
                // we will check a condition for the quantity
                return {
                    quantity: quantity ? + quantity : null, unit, description
                }; // 
            });

        // we will create a new object with the properties we want from the newRecipe object
        // here we are sending in  the same api format as the format that we get from the api
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: newRecipe.cookingTime,
            servings: newRecipe.servings,
            ingredients,
        }
        // console.log(recipe);
        // now we will send the data to the api
        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);

        // here we will create an object of recipe so that we can store the data in the state object
        state.recipe = createRecipeObject(data);
        // now adding the bookmark to the recipe that we uploaded, we can use the addBookmark function
        addBookmark(state.recipe);
        // console.log(data);

    } catch (err) {
        // console.error('💣💣💣💣💣', err);
        throw err;
    }
}


// now here we will create a function to read the bookmarked recipe from the local storage
const init = function () {
    const storage = localStorage.getItem('bookmarks'); // here we are getting the bookmark array from the local storage as a string and we store it in the variable
    if (storage) state.bookmark = JSON.parse(storage);
}

init();


// loadSearchResults('pizza');

