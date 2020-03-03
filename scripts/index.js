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
    $('.addform').submit(event =>{
        event.preventDefault();
        let form = document.getElementById('newbmk');
        let formData = new FormData(form);
        const newBookmark = bmkObj(formData);
        api.createItem(newBookmark)
            .then(newBookmark => store.addItem(newBookmark))
            .then(() => renderBaseLayout())
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
        editing = false;
    })
}

const eventHandlerSortBy = function(){
    $('main').on('', '.sortby', event =>{
        event.preventDefault();
    })
}

const bmkObj = function(formData){
    let obj = {};
    formData.forEach((val, name) => object[name] = val);
    return obj;
}

// Template Generation Functions

const generateFilter = function(){
    let currentRating = store.getFilter();
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `
      <option value="${i}" ${currentRating === i ? 'selected' : ''}>${'★'.repeat(
        i
      )}</option>
     `;
    }
    return html;
  };

const generateRating = currentRating => {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `
      <option value="${i}" ${
        Number(currentRating) === i ? 'selected' : ''
      }>${'★'.repeat(i)}</option>
     `;
    }
    return html;
};

const generateLanding = function(){
    let html = `
    <div class='formWrap'>
        <fieldset>
            <legend>
                <button class='add'>Add Bookmark</button>
                <button class='clear'>Remove all Bookmarks</button>
                <label for='sortby'>Sort by Rating:</label>
                <select class='sortby'>
                    ${generateFilter()}
                </select>
            </legend>
        </fieldset>
    </form>
        <ul class="bmkList">`;
    store.store.bookmarks.forEach(bm => {
      if (bm.rating >= store.getFilter()) {
        if (bm.showDetails && bm.rating) {
          html += `
            <li data-item-id="${bm.id}" class="bookmark-item js-bookmark-item">
              <div class="expanded-content js-expanded-content">
                <h2 id="bm-title js-bm-title">${bm.title}</h2>
                <a class="anchor-visit" href="${bm.url}">Visit Site</a>
                <p>${bm.desc}</p>
                <button class="js-edit-bm edit-bm">Edit</button>
                <button class="js-close-bm close-bm">Close</button>
                <button class="js-delete-bm delete-bm">Delete</button>
              </div>
            </li>`;
        } else {
          html += `
            <li data-item-id="${bm.id}" class="bookmark-item js-bookmark-item">
              <button
                class="bm-expand js-bm-expand"
                role="button"
              >
                <span class="bm-title js-bm-title">${bm.title}</span>
                <span class="bm-rating js-bm-rating">${'★'.repeat(
                  bm.rating
                )}</span>
              </button>
            </li>
          `;
        }
      }
    });
    html += '</ul>';
    return html;
  };



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
        </form>
    </fieldset>`;
  };

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
    render('main', generateEmpty());
}
    
const eventHandlers = function(){
    eventHandlerAddNew();
    eventHandlerRemoveAll();
    eventHandlerEditBookmark();
    eventHandlerRemoveOne();
    eventHandlerSortBy();
}

const initiate = function(){
    store.populate()
        .then(() => renderBaseLayout())
        .then(() => eventHandlers())
    store.setFilter(1);
}

$(initiate);
