'use strict'

const apiUrl = 'https://thinkful-list-api.herokuapp.com/agatha/bookmarks';

const fetchFn = function (...params) {
    let error;
    return fetch(...params)
        .then(response => {
            if(!response.ok){
                error = {code: response.status};
            }
            return response.json();
        })
        .then(data => {
            if(error){
                error.message = data.message;
                return Promise.reject(error);
            }
            return data;
        })
}

const getItems = function(){

}

const createItem = function(){

}

const updateItem = function(){

}

const deleteItem = function(){

}


export default {
    getItems,
    createItem,
    updateItem,
    deleteItem,
}