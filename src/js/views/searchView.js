class searchView {
    #parentEl = document.querySelector('.search');
    // we will create a method called getQuery that will get the input value from the search input form
    getQuery() {
        const query = this.#parentEl.querySelector('.search__field').value;
        this.#clearInput();
        return query;
    }

    // we will create a method called clearInput that will clear the input value from the search input form after the form is submitted
    #clearInput() {
        this.#parentEl.querySelector('.search__field').value = '';
    }

    // we will create a method called addHandlerSearch that will take a function as a parameter
    addHandlerSearch(handler) {
        this.#parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();

        });

    }
}

// we will create a new instance of the searchView class and export it so that controller.js can use it
export default new searchView();