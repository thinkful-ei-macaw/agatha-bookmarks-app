import api from './api.js';

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
        title: 'Hive Workshop',
        id: '',
        url: 'https://www.hiveworkshop.com/',
        rating: '5',
        description: 'A site dedicated to Warcraft 3, serving as the primary destination for custom content such as; maps, skins, models, icons, tools, and more.'
        },
        {

        },
    ],
    adding: false,
    editing: false,
    error: null,
    filter: 0
}


export default {
    store
}