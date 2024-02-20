import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import previewView from './previewView.js';

// if (module.hot) {
//     module.hot.accept();
// }

class ResultView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query! Please try again :)';

    _generateMarkup() {
        return this._data.map(result => previewView.render(result, false)).join('');

    }

    // _generateMarkupPreview(result) {
    //     //we are checking if the result.id is equal to the current id in the url
    //     const id = window.location.hash.slice(1);

    //     return `<li class="preview ${result.id === id ? "preview__link--active" : ''}">
    //         <a class="preview__link " href="#${result.id} ">
    //     <figure class="preview__fig" >
    //         <img src="${result.image}" alt="${result.title}" />
    //             </figure >
    // <div class="preview__data">
    //     <h4 class="preview__title">${result.title}</h4>
    //     <p class="preview__publisher">${result.publisher}</p>

    // </div>
    //         </a >
    //     </li > `
    // }
}

export default new ResultView();