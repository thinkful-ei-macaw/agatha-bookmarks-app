'use strict'
/* global $ */

import api from './api.js';
import store from './store.js';
 

//Event Handler Functions


const eventHandlerAddNew = function(){
    $('main').on('click', '.add', () => {
        renderCreateBookmark();
        eventHandlerCreate();
        eventHandlerCancelEdit();
    });
}

const eventHandlerCreate = function(){
    $('.wrapper').submit(event =>{
        event.preventDefault();
        let form = document.getElementById(`${bookmarks.id}`);
        let formData = new FormData(form);
        const newBookmark = jsonStringify(formData);
        api.createItem(newBookmark)
            .then(newBookmark => store.addItem(newBookmark))
            .then(() => renderBaseLayout())
    })
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
        editing = false;
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
    let html = `
    <div class='formWrap'>
        <fieldset>
            <legend>
                <button class='add'>Add Bookmark</button>
                <button class='clear'>Remove all Bookmarks</button>
                <label for='sortby'>Sort by Rating:</label>
                <select class='sortby'>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
            </legend>
        </fieldset>
    </div>
            <article class='booktabs'>
                
            </article>`;
    return html;
}

const generateBookmarkStrng = function(){
    let bookmark = store.bookmarks.filter(bookmarks => bookmarks.rating >= store.filter)
    bookmark = bookmark.map((bookmark) => generateBookmark(bookmark));
    return bookmark.join('');
}

const generateBookmark = function(){
    return `
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
}

const generateAddForm = function(){
    return `
    <fieldset>
        <legend>
            <button class='addNew'>Add Bookmark</button>
            <button class='cancel'>Cancel</button>
            <button class='clear'>Remove all Bookmarks</button>
            <label for='sortby'>Sort by Rating:</label>
                <select class='sortby'>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
        </legend>
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
                </form>
    </fieldset>`;
}

const generateEmpty = function(){
    
}

//Render Functions

const render = function(target, component){
    $(target).html(component);
}

const renderBaseLayout = function(){
    render('main', generateLanding());
}
    
const renderCreateBookmark = function(){
    render('.formWrap', generateAddForm());
}
    
const renderEmptyLayout = function(){
    generateEmpty();
}
    
const eventHandlers = function(){
    eventHandlerAddNew();
    eventHandlerRemoveAll();
    eventHandlerEditBookmark();
    eventHandlerRemoveOne();
    eventHandlerSortBy();
}

$(eventHandlers);
$(renderBaseLayout);