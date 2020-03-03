'use strict'
/* global $ */

import api from './api.js';
import store from './store.js';
 

const eventHandlerAddNew = function(){
    $('main').on('click', '.add', () => {
        renderCreateBookmark();
        eventHandlerCreate();
        eventHandlerCancelEdit();
    });
};

const eventHandlerCreate = function(){
    $('#newbmk').submit(event =>{
        event.preventDefault();
        let form = document.getElementById('newbmk');
        let formData = new FormData(form);
        const newBookmark = bmkObj(formData);
        console.log(newBookmark)
        api.createItem(newBookmark)
            .then(newBookmark => store.addItem(newBookmark))
            .then(() => renderBaseLayout())
    });
};

const eventHandlerRemoveAll = function(){
    $('main').on('click', '.clear', event =>{
        event.preventDefault();
        renderEmptyLayout();
    });
};

const eventHandlerRemoveOne = function(){
    $('main').on('click', '.remove', event =>{
        event.stopPropagation();
        let id = getId(event.target);
        api.deleteItem(id)
            .then(() =>{
                store.findById(id);
            });
    });
};

const eventHandlerEditBookmark = function(){
    $('.edit').submit(event =>{
        event.preventDefault();
        let form = document.getElementById('newbmk');
        let formData = new FormData(form);
        const newBookmark = bmkObj(formData);
        api.updateItem(newBookmark)
            .then(newBookmark => store.addItem(newBookmark))
            .then(() => renderBaseLayout())
    });
};

const eventHandlerCancelEdit = function(){
    $('main').on('click', '.cancel', event =>{
        event.preventDefault();
        renderBaseLayout();
        editing = false;
    });
};

const bmkObj = function(formData){
    let obj = {};
    formData.forEach((val, name) => obj[name] = val);
    return obj;
}

const generateFilter = function(){
    let currentRating = store.getFilter();
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<option value="${i}" ${currentRating === i ? 'selected' : ''}>${'★'.repeat(i)}</option>`;
    }
    return html;
};

const generateRating = currentRating => {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<option value="${i}" ${Number(currentRating) === i ? 'selected' : '' }>${'★'.repeat(i)}</option>`;
    }
    return html;
};

const getId = function(item){
    return $(item)
      .closest('.bmkItem')
      .data('item-id');
  };

const generateLanding = function(){
    let html = `
    <div id='wrap'>
        <fieldset>
            <legend>
                <button type='submit' class='add'>Add Bookmark</button>
                <button class='clear'>Remove all Bookmarks</button>
                <label for='sortby'>Sort:</label>
                <select class='sortby'>
                    ${generateFilter()}
                </select>
            </legend>
        </fieldset>
    </div>
        <ul class="bmkList">`;
    store.store.bookmarks.forEach(bm => {
      if (bm.rating >= store.getFilter()) {
        if (bm.showDetails && bm.rating) {
          html += `
            <li data-item-id="${bm.id}" class="bmkItem">
                <div class="expanded">
                    <h2 id="bmktitle">${bm.title}</h2>
                    <a class="visit" href="${bm.url}">Visit Site</a>
                    <p>${bm.desc}</p>
                    <button class="edit">Edit</button>
                    <button class="toggle">Close</button>
                    <button class="delete">Delete</button>
                </div>
            </li>`;
        } else {
          html += `
                <li data-item-id="${bm.id}" class="bmkItem">
                <button class="toggle" role="button">
                    <span class="bmkTitle">${bm.title}</span>
                    <span class="bmkRating">${'★'.repeat(bm.rating)}</span>
                </button>
                </li>`;
        }
      }
    });
    html += '</ul>';
    return html;
  };

const generateAddForm = function(){
    return `
    <div id='wrap'>
    <fieldset>
        <legend>
            <button class='addNew'>Add Bookmark</button>
            <button class='cancel'>Cancel</button>
            <button class='clear'>Remove all Bookmarks</button>
            <label for='sortby'>Sort:</label>
                <select class='sortby'>
                ${generateFilter()}
                </select>
        </legend>
        <form class='addform' id='newbmk'>
            <div>
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" required/>
            </div>
            <div>
                <label for="url">URL:</label>
                <input type="url" id="url" name="url" required/>
            </div>
            <div>
                <label for="desc">Description:</label>
                <input type="text" id="desc" name="desc" />
            </div>
            <div>
                <label for="rating">Rating:</label>
                <select id="ratingradio" name="rating">
                    ${generateRating(1)}
                </select>
            </div>
            <button type='submit' class='please'>Submit</button>
        </form>
    </fieldset>
    </div>`;
  };

const generateEmpty = function(){
    
}

const render = function(target, component){
    $(target).html(component);
}

const renderBaseLayout = function(){
    render('main', generateLanding());
}
    
const renderCreateBookmark = function(){
    render('#wrap', generateAddForm());
}
    
const renderEmptyLayout = function(){
    render('main', generateEmpty());
}
    
const eventHandlers = function(){
    eventHandlerAddNew();
    eventHandlerRemoveAll();
    eventHandlerEditBookmark();
    eventHandlerRemoveOne();
}

const initiate = function(){
    store.populate()
        .then(() => renderBaseLayout())
        .then(() => eventHandlers())
    store.setFilter(1);
}

$(initiate);
