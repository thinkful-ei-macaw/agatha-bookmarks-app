'use strict'

const apiUrl = 'https://thinkful-list-api.herokuapp.com/agatha/bookmarks/';




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
    return fetchFn(`${apiUrl}`);
}

const createItem = function(name){
    const newItem = JSON.stringify(name);
    return fetchFn(`${apiUrl}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newItem
    })
}

const updateItem = function(id, updateData){
    const newData = JSON.stringify(updateData);
    return fetchFn(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newData
    })
}

const deleteItem = function(){
    return fetchFn(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
}


export default {
    getItems,
    createItem,
    updateItem,
    deleteItem,
}