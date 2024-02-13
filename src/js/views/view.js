import icons from 'url:../../img/icons.svg'; // Parcel 2


// here we will export the class instead of the instance of the class because it will be the parent class of other child view classes
export default class View {

    _data;


    // we will create a method called render that will render the recipe details to the UI
    // the data that will be coming in the render method will be stored in the data of the instance of the class
    render(data) {
        this._data = data;
        if (!data || Array.isArray(data) && data.length === 0) return this.renderError();
        // now we will call the generateMarkup method to generate the markup for the recipe details
        // since the generateMarkup method will return the markup for the recipe details, we will store the markup in a variable
        const markup = this._generateMarkup();
        // now we will clear the parentElement
        this._parentElement.innerHTML = '';
        // now we will insert the markup into the parentElement
        this._parentElement.insertAdjacentHTML('afterbegin', markup);

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
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    clear() {
        this._parentElement.innerHTML = '';
    }


    renderError(message = this._errorMessage) {

        const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div> `

        this.clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);

    }


    renderMessage(message = this._message) {

        const markup = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div> `

        this.clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);

    }

    _generateMarkupIngredient(ing) {
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