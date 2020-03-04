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
        api.createItem(newBookmark)
            .then(newBookmark => store.addItem(newBookmark))
            .then(() => renderBaseLayout())
    });
};

const eventHandlerFilter = function(){
    $('main').on('change', '.sortby', () =>{
        let filterRate = Number($('.sortby').val());
        store.setFilter(filterRate);
        renderBaseLayout();
    });
}

const eventHandlerRemoveOne = function(){
    $('main').on('click', '.delete', event =>{
        event.stopPropagation();
        const id = getId(event.currentTarget);
        api.deleteItem(id)
            .then(() => store.deleteCurrItem(id))
            .then(() => renderBaseLayout())
    });
};

const eventHandlerEditClick = function(){
    $('main').on('click', '.edit', event =>{
        const id = getId(event.currentTarget);
        const bookmark = store.findById(id);
        renderEdit(bookmark);
        eventHandlerEditBookmark(id);
        eventHandlerCancelEdit();
    })
}

const eventHandlerEditBookmark = function(id){
    $('form.updateform').submit(event =>{
        event.preventDefault();
        let form = document.getElementById('updatebmk');
        let formData = new FormData(form);
        const newBookmark = bmkObj(formData);
        api.updateItem(id, newBookmark)
            .then(() => store.update(id, newBookmark))
            .then(() => renderBaseLayout())
    });
};

const eventHandlerCancelEdit = function(){
    $('main').on('click', '.cancel', event =>{
        event.preventDefault();
        renderBaseLayout();
    });
};

const eventHandlerToggle = function(){
    $('main').on('click', '.expand', event => {
        store.resetDetails();
        const id = getId(event.currentTarget);
        store.toggleDetails(id);
        renderBaseLayout();
        eventHandlerClose();
        eventHandlerRemoveOne();
        eventHandlerEditClick();
    });
  };

const eventHandlerClose = function(){
    $('main').on('click', '.close', event => {
      event.stopPropagation();
      const id = getId(event.currentTarget);
      store.toggleDetails(id);
      renderBaseLayout();
      eventHandlerClose();
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
        if (bm.details && bm.rating) {
          html += `
            <li data-item-id="${bm.id}" class="bmkItem">
                <div class="expanded">
                    <h3 id="bmktitle">${bm.title}</h3>
                    <a class="visit" href="${bm.url}">Visit Site</a>
                    <p>${bm.desc}</p>
                    <button class="edit">Edit</button>
                    <button class="close">Close</button>
                    <button class="delete">Delete</button>
                </div>
            </li>`;
        } else {
          html += `
                <li data-item-id="${bm.id}" class="bmkItem">
                <button class="expand" role="button">
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
            <button type='submit'>Submit</button>
        </form>
    </fieldset>
    </div>`;
  };

const generateEdit = function(bookmark){
    return `
        <form class='updateform' id="updatebmk">
        <h3>Update bookmark below:</h3>
        <div>
            <label for="title">Name:</label>
            <input type="text" id="title" name="title" value=${bookmark.title} required/>
        </div>
        <div>
            <label for="url">URL:</label>
            <input type="url" id="url" name="url" value=${bookmark.url} required/>
        </div>
        <div>
            <label for="desc">Description:</label>
            <input type="text" id="desc" name="desc" value="${bookmark.desc}" />
        </div>
        <div>
            <label for="rating">Rating:</label>
            <select id="rating" name="rating">
                ${generateRating(bookmark.rating)}
            </select>
        </div>
        <button class="editsubmit" type="submit">Update Bookmark</button>
        <button class="cancel">Cancel</button>
        </form>
    `;
};

const render = function(target, component){
    $(target).html(component);
}

const renderBaseLayout = function(){
    render('main', generateLanding());
}
    
const renderCreateBookmark = function(){
    render('#wrap', generateAddForm());
}

const renderEdit = function(bookmark){
    render('main', generateEdit(bookmark));
}
    
const eventHandlers = function(){
    eventHandlerAddNew();
    eventHandlerFilter();
    eventHandlerToggle();
}

const initiate = function(){
    store.populate()
        .then(() => renderBaseLayout())
        .then(() => eventHandlers())
    store.setFilter(1);
}

$(initiate);
