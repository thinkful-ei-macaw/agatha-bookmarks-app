import api from './api.js';

const store = {
    bookmarks: [],
    error: null,
    filter: 0,
}

const addItem = function(item){
    store.bookmarks.push(item);
}

const setErr = function(e){
    store.error = e;
}

const findById = function(id){
    return store.bookmarks.find(currentItem => currentItem.id === id);
}

const deleteCurrItem = function(id){
    store.bookmarks = store.bookmarks.filter(currentItem => currentItem.id !== id);
}

const populate = function(){
    return api.getItems().then(bookmarks => {
        bookmarks.forEach(bm => addItem(bm));
    });
}

const setFilter = function(rating){
    store.filter = rating;
}

const getFilter = function(){
    return store.filter;
}

const update = function(id, data) {
    const currentBookmark = findById(id);
    Object.assign(currentBookmark, data);
  };

const toggleDetails = function(id){
    const currentBookmark = findById(id);
    currentBookmark.details = !currentBookmark.details;
  };
  
  const resetDetails = function() {
    store.bookmarks.map(e => (e.details = false));
  };

export default {
    store,
    addItem,
    setErr,
    findById,
    deleteCurrItem,
    populate,
    setFilter,
    getFilter,
    toggleDetails,
    resetDetails,
    update
}
