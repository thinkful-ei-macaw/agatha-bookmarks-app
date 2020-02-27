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
    generateAddForm();
}

const renderEmptyLayout = function(){
    generateEmpty();
}

//Event Handler Functions

const eventHandlerCreate = function(){
//this function will handle the creation of a new bookmark
//that will appear at the bottom of the list
    $('main').on('click', '.add', event => {
        event.preventDefault();
        renderCreateBookmark();
});
}

const eventHandlerRemoveAll = function(){
    $('main').on('click', '.clear', event =>{
        event.preventDefault();
        renderEmptyLayout();
    })
}

const eventHandlerRemoveOne = function(){
    $('main').on('click', '.remove', event =>{
        event.preventDefault();
        //remove specific bookmark
    })
}

const eventHandlerEditBookmark = function(){
    $('main').on('click', '.edit', event =>{
        event.preventDefault();
        //allows description to be editted
    })
}

const eventHandlerCancelEdit = function(){
    $('main').on('click', '.cancel', event =>{
        event.preventDefault();
        renderBaseLayout();
    })
}

const eventHandlerSortBy = function(){
    $('main').on('', '.sortby', event =>{
        event.preventDefault();
    })
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
                    <button class='remove'>Remove Bookmark</button>
                    <button class='edit'>Edit Bookmark</button>
                </div>
            </article>`);
}

const generateBookmark = function(){
    $('.wrapper')
}

const generateAddForm = function(){
    $('fieldset').replaceWith(`
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
        <button class='cancel'>Cancel</button>
        </form>
    `)
}

const generateEmpty = function(){
    
}

const eventHandlers = function(){
    eventHandlerCancelEdit();
    eventHandlerCreate();
    eventHandlerRemoveAll();
    eventHandlerEditBookmark();
    eventHandlerRemoveOne();
    eventHandlerSortBy();
}

$(eventHandlers);
$(renderBaseLayout);