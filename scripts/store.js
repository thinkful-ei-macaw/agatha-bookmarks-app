import defaultExport from './api';

const store = {
    bookmarks: [
        {
        title: 'Github',
        id: '',
        url: 'https://github.com/',
        rating: 4,
        description: 'An online repository that allows for ease of collaboration, and creates a history of changes that allow for better debugging and editing.'
        },
        {
        title: '',
        id: '',
        url: '',
        rating: '',
        description: ''
        },
        {

        },
    ],
    adding: false,
    editing: false,
    error: null,
    filter: 0
}

const addBookmark = function(bookmarks){

}

export default {
    store
}