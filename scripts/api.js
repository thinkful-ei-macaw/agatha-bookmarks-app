'use strict'

const apiUrl = 'https://thinkful-list-api.herokuapp.com/agatha/items';

const fetchFn = function (...params) {
    return fetch(...params)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('')
        })

}

const displayResults = function(){
    
}

export default {
    api
}