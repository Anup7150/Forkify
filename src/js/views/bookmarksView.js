import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import previewView from './previewView.js';

// if (module.hot) {
//     module.hot.accept();
// }

class bookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks. please select a recipe and bookmark it :)';

    // the function will load the bookmarks from the local storage
    addHandlerEvent = function (handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkup() {
        // here we are calling the render method from the previewView instance and passing the bookmark and false as parameters
        // we are not calling render method from this bookmarksView
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');

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

export default new bookmarksView();