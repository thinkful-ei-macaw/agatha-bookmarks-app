import api from './api.js';

const store = {
    bookmarks: [],
    adding: false,
    editing: false,
    error: null,
    filter: 0
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
        store.bookmarks.forEach(bm => this.addItem(bm));
    });
}

const setFilter = function(rating){
    store.filter = rating;
}

const getFilter = function(){
    return store.filter;
}

export default {
    store,
    addItem,
    setErr,
    findById,
    deleteCurrItem,
    populate,
    setFilter,
    getFilter
}

/*
        {
        title: 'Github',
        id: '',
        url: 'https://github.com/',
        rating: 4,
        description: 'An online repository that allows for ease of collaboration, and creates a history of changes that allow for better debugging and editing.'
        },
        {
        title: 'Hive Workshop',
        id: '',
        url: 'https://www.hiveworkshop.com/',
        rating: '5',
        description: 'A site dedicated to Warcraft 3, serving as the primary destination for custom content such as; maps, skins, models, icons, tools, and more.'
        }
*/