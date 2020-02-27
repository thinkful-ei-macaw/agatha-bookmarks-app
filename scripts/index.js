'use strict'
/* global $ */

import api from './api.js';
import store from './store.js';


//Currently non-functional, would greatly appreciate granular feedback 

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
        let id = getId(event.target);
        api.deleteItem(id)
            .then(() =>{
                store.findById(id);
            })
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

// Json

const jsonStringify = function(form){
    let formData = new FormData(form[0]);
    let object = {};
    formData.forEach((val, name) => object[name] = val);
    return JSON.stringify(object);
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
                ${}
            </article>`);
}

const generateBookmarkStrng = function(){
    let bookmark = store.bookmarks.filter(bookmarks => bookmarks.rating >= store.filter)
    bookmark = bookmark.map((bookmark) => generateBookmark(bookmark));
    return bookmark.join('');
}

const generateBookmark = function(bookmark){
    let mark = '';
    mark = `
        <div class='wrapper' item-id='${bookmarks.id}>
        <h2>${bookmarks.title}</h2>
        <div class='stars'>
            <h3>${bookmarks.rating} star(s)</h3>
        </div>
        <details class='info'>
            <p class='url'>'${bookmarks.url}'</p>
            <p class='editable'>${bookmarks.details}</p>
            <button class='remove'>Remove Bookmark</button>
            <button class='edit'>Edit Bookmark</button>
        </details>
        </div class='wrapper'>
    `;
    return mark;
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

//Render Functions

const renderBaseLayout = function(){
        generateLanding();
    }
    
    const renderCreateBookmark = function(){
        generateAddForm();
    }
    
    const renderEmptyLayout = function(){
        generateEmpty();
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