//import icon from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2
// var Fraction = require('fractional').Fraction // old way of importing
import { Fraction } from 'fractional';
console.log(Fraction);

// in the recipeView.js file, we will create a class called RecipeView that will be responsible for rendering the recipe details to the UI.
// We will also create a method called render that will render the recipe details to the UI.

class recipeView {
    #data;

    #parentElement = document.querySelector('.recipe');

    // we will create a method called render that will render the recipe details to the UI
    // the data that will be coming in the render method will be stored in the data of the instance of the class
    render(data) {
        this.#data = data;
        // now we will call the generateMarkup method to generate the markup for the recipe details
        // since the generateMarkup method will return the markup for the recipe details, we will store the markup in a variable
        const markup = this.#generateMarkup();
        // now we will clear the parentElement
        this.#parentElement.innerHTML = '';
        // now we will insert the markup into the parentElement
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);

    }

    renderSpinner = function () {
        const markup = ` 
    <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div> 
            `;
        this.clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    clear() {
        this.#parentElement.innerHTML = '';
    }

    // we will create a method called generateMarkup that will generate the markup for the recipe details
    // this method will return the markup for the recipe details
    #generateMarkup() {
        return `<figure class="recipe__fig">
        <img src="${this.#data.image}" alt="${this.#data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.#data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">

        ${this.#data.ingredients.map(this.#generateMarkupIngredient).join('')}

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
          <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this.#data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
    }

    #generateMarkupIngredient(ing) {
        return `<li class="recipe__ingredient">
                <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
                <div class="recipe__description">
                    <span class="recipe__unit">${ing.unit}</span>
                    ${ing.description}
                </div>
            </li>`
    }
}

// we will not export the whole class, we will export the instance of the class
// so that we can use the instance of the class in the controller.js file instead of creating a new instance of the class
export default new recipeView();