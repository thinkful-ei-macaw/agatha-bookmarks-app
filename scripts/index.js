'use strict'
/* global $ */

import api from './api.js';
import store from './store.js';


//Render Functions

const renderBaseLayout = function(){
//this function will be called immediately to render the basic appearance
//of the bookmark page
    generateLanding();
}

const renderCreateBookmark = function(){
//this function will render the section of the page that allows a user
//to add a new bookmark to the display
}


//Event Handler Functions

const eventHandlerCreate = function(){
//this function will handle the creation of a new bookmark
//that will appear at the bottom of the list
    event.preventDefault();
    $('main').on('click', '', function(){

})
}

const eventHandlerRemoveAll = function(){
    event.preventDefault();
}

const eventHandlerRemoveOne = function(){
    event.preventDefault();
}

const eventHandlerEditBookmark = function(){
    event.preventDefault();
}

const eventHandlerCancelEdit = function(){
    event.preventDefault();
}

const eventHandlerSortBy = function(){

}


// Template Generation Functions

const generateLanding = function(){
    $('main').html(`
    <fieldset>
        <button class='add'>Add Bookmark</button>
    </fieldset>
        <button class='clear'>Remove all Bookmarks</button>
        <select class='sortby'>Minimum Rating</select>
            <article class='booktabs'>
                <div class='wrapper'>
                    <h2>Example1</h2>
                    <details class='info'>Example Description</details>
                    <div class='stars'>
                        <h3>3 star(s)</h3>
                        <b>*</b>
                        <b>*</b>
                        <b>*</b>
                    </div>
                    <button class='remove'>Remove Bookmark</button>
                    <button class='edit'>Edit Bookmark</button>
                </div>
                <div class='wrapper'>
                    <h2>Example2</h2>
                    <details class='info'>Example Description</details>
                    <div class='stars'>
                        <h3>1 star(s)</h3>
                        <b>*</b>
                    </div>
                    <button class='remove'>Remove Bookmark</button>
                    <button class='edit'>Edit Bookmark</button>
                </div>
                <div class='wrapper'>
                    <h2>Example3</h2>
                    <details class='info'>Example Description</details>
                    <div class='stars'>
                        <h3>5 star(s)</h3>
                        <b>*</b>
                        <b>*</b>
                        <b>*</b>
                        <b>*</b>
                        <b>*</b>
                    </div>
                    <button class='remove'>Remove Bookmark</button>
                    <button class='edit'>Edit Bookmark</button>
                </div>
            </article>`);
}

const generateAddForm = function(){
    
}

const toggleAdd = function(){

}


renderBaseLayout();
