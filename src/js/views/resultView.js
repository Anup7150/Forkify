import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

if (module.hot) {
    module.hot.accept();

}

class ResultView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query! Please try again :)';

    _generateMarkup() {
        return this._data.map(data => this._generateMarkupPreview(data)).join('');

    }

    _generateMarkupPreview(result) {

        return `<li class="preview">
            <a class="preview__link " href="#${result.id}">
                <figure class="preview__fig">
                    <img src="${result.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${result.title}</h4>
                    <p class="preview__publisher">${result.publisher}</p>
                    <div class="preview__user-generated">
                      
                    </div>
                </div>
            </a>
        </li>`
    }
}

export default new ResultView();