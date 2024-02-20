import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    // we will creat a constructor so that the addHandlerShowWindow function is called as soon as the object is created
    // we created a constructor because we want to call the function as soon as the object is created
    constructor() {
        super(); // because it is a child class of the View class and we need to call the constructor of the parent class so that we can use this keyword
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {

        this._window.classList.toggle('hidden'); //if the window is hidden, it will be shown and vice versa
        this._overlay.classList.toggle('hidden');

    }

    // lets create a function to add the event listener for the form submission
    addHandlerFormSubmit(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            // the code below is a new way of getting the form data
            const dataArr = [...new FormData(this)]; // this keyword will point to element that the event listener is attached to
            // since the form submission is happen asynchoronously behind the scenes,
            // we will find a way of getting this data to the model through the controller

            const data = Object.fromEntries(dataArr); // this will convert the dataArr array to an object
            handler(data);
        })
    }

    // lets create a function to add the event listener to the open button
    // since we have called this function in the constructor, it will be called as soon as the object is created for this class
    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this)); // the this keyword in the bind method will point to the object of the class
        // this._btnOpen.addEventListener('click', function () {
        //     // this._window.classList.toggle('hidden'); //if the window is hidden, it will be shown and vice versa
        //     // this._overlay.classList.toggle('hidden');
        // })
    }

    // lets create a function to add the event listener to the close button
    // since we have called this function in the constructor, it will be called as soon as the object is created for this class
    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }



    // lets create a function to generate the markup for the pagination buttons
    _generateMarkup() {

    }

}

export default new AddRecipeView();

