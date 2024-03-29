// we will import the parent View class 
import View from './view.js'

//import icon from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2
// var Fraction = require('fractional').Fraction // old way of importing
import fracty from 'fracty';
// import { Fraction } from 'fractional';
// console.log(Fraction);

// in the recipeView.js file, we will create a class called RecipeView that will be responsible for rendering the recipe details to the UI.
// We will also create a method called render that will render the recipe details to the UI.

class recipeView extends View {

  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';





  // we will create a method called generateMarkup that will generate the markup for the recipe details
  // this method will return the markup for the recipe details
  _generateMarkup() {
    return `<figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to = "${this._data.servings - 1}">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to = "${this._data.servings + 1}" >
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
            <use href="${icons}#icon-user"></use>
            </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${this._data.bookmarked ? "-fill" : ''}"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">

        ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}

          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">0.5</div>
            <div class="recipe__description">
              <span class="recipe__unit">cup</span>
              ricotta cheese
            </div>
          </li>
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
  }


  _generateMarkupIngredient(ing) {
    return `<li class="recipe__ingredient">
                    <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${ing.quantity ? fracty(ing.quantity).toString() : ''}</div>
                    <div class="recipe__description">
                        <span class="recipe__unit">${ing.unit}</span>
                        ${ing.description}
                    </div>
                </li>`
  }

  // we are creating a publisher-subscriber pattern here
  // we are creating a public method called addHandlerRender that will take a handler as a parameter
  // the handler will be a function that will be called when the hash changes which will be the showRecipe function

  addHandlerRender(handler) {
    const eventArray = ['hashchange', 'load'];
    eventArray.forEach(ev => window.addEventListener(ev, handler));
  }

  // here we are creating the handler function for the serving buttons
  // this function will be called when the user clicks the serving buttons
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest(`.btn--update-servings`);
      if (!btn) return;
      // we are getting the value of the data-update-to attribute from the button to update the servings
      const { updateTo } = btn.dataset;
      // here we are checking the condition and sending the value to the controller so that it can send to model and model can upate the servings
      if (+updateTo > 0) handler(+updateTo);
      // console.log(btn);
      // handler();
    })
  }

  // here we are creating the handler function for the bookmark feature
  // simply we will use the event Delegation here
  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    })
  }

}

// we will not export the whole class, we will export the instance of the class
// so that we can use the instance of the class in the controller.js file instead of creating a new instance of the class
export default new recipeView();