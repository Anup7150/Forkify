import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

// if (module.hot) {
//     module.hot.accept();
// }

// we are creating a this class which will be the child class of resultView and bookmarksView because they have the same functionality
class PreviewView extends View {
    _parentElement = '';
    // _parentElement = document.querySelector('.bookmarks__list');
    // _errorMessage = 'No bookmarks. please select a recipe and bookmark it :)';


    _generateMarkup() {
        //we are checking if the result.id is equal to the current id in the url
        const id = window.location.hash.slice(1);

        return `<li class="preview ${this._data.id === id ? "preview__link--active" : ''}">
            <a class="preview__link " href="#${this._data.id} ">
        <figure class="preview__fig" >
            <img src="${this._data.image}" alt="${this._data.title}" />
                </figure >
    <div class="preview__data">
        <h4 class="preview__title">${this._data.title}</h4>
        <p class="preview__publisher">${this._data.publisher}</p>

    </div>
            </a >
        </li > `
    }
}

export default new PreviewView();