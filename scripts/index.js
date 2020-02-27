'use strict'

import api from './api';
import store from './store';


//Render Functions

const renderBaseLayout = function(){
//this function will be called immediately to render the basic appearance
//of the bookmark page
}

renderBaseLayout();

const renderCreateBookmark = function(){
//this function will render the section of the page that allows a user
//to add a new bookmark to the display
}


//Event Handler Functions

const eventHandlerCreate = function(){
//this function will handle the creation of a new bookmark
//that will appear at the bottom of the list
    $('main').on('click', '', function(){

})
}

const eventHandlerRemoveAll = function(){

}

const eventHandlerRemoveOne = function(){

}

const eventHandlerEditBookmark = function(){

}

const eventHandlerCancelEdit = function(){

}

const eventHandlerSortBy = function(){

}


// Template Generation Functions

const generateAddBookmark = function(){
    return `
    <fieldset>
        <button class='add'>Add Bookmark</button>
    </fieldset>
    `;
}

const generateAddForm = function(){
    return `
    <fieldset>
        <form class='addform'>
            <label>Title</label>
            <input>
            <label>URL</label>
            <input>
            <label>Description</label>
            <input>
        <div class='ratingradio'>
            <h3>Rating</h3>
            <label><input type='radio' value='one star' required>1 Star</label>
            <label><input type='radio' value='two star' required>2 Stars</label>
            <label><input type='radio' value='three star' required>3 Stars</label>
            <label><input type='radio' value='four star' required>4 Stars</label>
            <label><input type='radio' value='five star' required>5 Stars</label>
        </div>
            <button class='add'>Add Bookmark</button>
            <button class='add'>Cancel</button>
        </form>
    </fieldset>
    `;
}

const toggleAdd = function(){

}