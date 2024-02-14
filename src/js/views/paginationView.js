import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  // here lets create a publisher-subscriber pattern to handle the event of the pagination buttons
  addHandlerClick(handler) {
    // here we cannot pass the handler function directly to the addEventListener method
    // because we want to listen the click either on the next or the previous button
    this._parentElement.addEventListener('click', function (e) {

      // for that we can use page delegation to listen to the click event on the parent element
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      // now since we have got the page number from the dataset of the button
      // we will send it back to the controller so that it can be used to load the results based on that number using some method
      handler(goToPage);
    })
  }

  // lets create a function to generate the markup for the pagination buttons
  _generateMarkup() {

    const currentPage = this._data.page;
    // console.log(this._data);

    // we will use the search object coming from the state object to check if there are other pages
    const numberOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    // console.log(numberOfPages);
    // 1. we are in the first page and there are other pages
    if (currentPage === 1 && numberOfPages > 1) {

      // here we are using the custom data attribute to make connection between DOM and our code
      // basically we are using the data-goto attribute to store the page number which we will use later on addHandlerClick method to get the page number
      return `
            <button data-goto = "${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
    }
    // 2. we are in the last page and there are other pages
    if (currentPage === numberOfPages && numberOfPages > 1) {
      return `
            <button data-goto = "${currentPage - 1}"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>`
    }
    // 3. we are in other page
    if (currentPage < numberOfPages) {
      return `
            <button data-goto = "${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          
          <button data-goto = "${currentPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
          `
    }
    // 4. we are in the first page and there are no other pages
    return '';
  }

}

export default new PaginationView();

