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
        bookmarks.forEach(bm => this.addItem(bm));
    });
}

const setFilter = function(rating){
    store.filter = rating;
}

const getFilter = function(){
    return store.filter;
}

const toggleDetails = function(id){
    const currentBookmark = findById(id);
    currentBookmark.details = !currentBookmark.details;
    console.log(store)
  };
  
  const resetDetails = function() {
    store.bookmarks.map(e => (e.details = false));
    console.log(store)
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
    resetDetails
}
