import icons from 'url:../../img/icons.svg'; // Parcel 2


// here we will export the class instead of the instance of the class because it will be the parent class of other child view classes
export default class View {

  _data;


  // we will create a method called render that will render the recipe details to the UI
  // the data that will be coming in the render method will be stored in the data of the instance of the class
  /**
   * @param {Object | Object[array]} data the data to be rendered to the UI (for eg: recipe) 
   * @param {boolean} [render = true] if false, create a markup string instead of rendering to the UI
   * @returns {undefined | string} A markup string is returned if render = false
   */
  render(data, render = true) {
    this._data = data;
    if (!data || Array.isArray(data) && data.length === 0) return this.renderError();
    // now we will call the generateMarkup method to generate the markup for the recipe details
    // since the generateMarkup method will return the markup for the recipe details, we will store the markup in a variable
    const markup = this._generateMarkup();

    // if render is false, we will not render the markup to the UI
    if (!render) return markup;

    this.clear();
    // now we will clear the parentElement
    // this._parentElement.innerHTML = '';
    // now we will insert the markup into the parentElement
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

  }

  // here we will create a method to update the elements that are changed in the recipe details
  // this function will still take the state object as a parameter
  update(data) {
    this._data = data;
    // if (!data || Array.isArray(data) && data.length === 0) return this.renderError();
    // now we will call the generateMarkup method to generate the markup for the recipe details
    // since the generateMarkup method will return the markup for the recipe details, we will store the markup in a variable
    const markup = this._generateMarkup();

    // now we will convert the markup to a virtual DOM object so that we can compare it with the actual DOM object
    const newDOM = document.createRange().createContextualFragment(markup);
    // console.log(newDOM);
    // since we have the node now, we cannot compare it with the actual DOM object
    // to comapare it with the actual DOM object, we will convert it to array of nodes
    // we can use Array.from method to convert it to an array of nodes
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // now we have the array of nodes from both the virtual DOM and the actual DOM
    // we can now loop through the array of nodes and compare them
    // we will loop through the newElements array because the newElements array will always have the same length as the curElements array
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // update Changed TEXT
      // here we can use the isEqualNode method to compare the nodes
      // but we will use the condition to check if the node is not equal to null
      // if it is not equal to null then we will compare the nodes
      // nodeValue helps to take the text content of the node
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }

      // update changed ATTRIBUTES
      // here we will compare the attributes of the nodes
      // we will use the attributes property of the node to get the attributes of the node
      if (!newEl.isEqualNode(curEl))
        // console.log(newEl.attributes);
        // here we are looping through the attributes of the newEl node
        // and we are setting the attributes of the curEl node to the attributes of the newEl node
        Array.from(newEl.attributes).forEach(attr => {
          // we are setting the attributes of current element coming from the new element
          curEl.setAttribute(attr.name, attr.value)

        })


      // console.log(curEl, newEl.isEqualNode(curEl));


    })

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


}