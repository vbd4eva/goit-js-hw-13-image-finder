export default class ApiService {

    constructor(optionsObj){ 
        this.options = {
            BASE_URL: 'https://pixabay.com/api/',
            defaultOptions: 'image_type=photo&orientation=horizontal',
            page: 1,
            per_page: 12,
            key: '19030678-ed1e5f4c74f32611df53e834e',
            ...optionsObj
        }
    }
    
    getUrl() {
        const { BASE_URL, defaultOptions, searchQuery, page, per_page, key } = this.options;
        const url = `${BASE_URL}?${defaultOptions}&q=${searchQuery}&page=${page}&per_page=${per_page}&key=${key}`;
        return url;
    }
    async fetchImages(url) { 
        // return fetch(url)
        //     .then(response => response.json())
        //     .then(({hits}) => { 
        //         this.options.page += 1;
        //         return hits;
        //     })
        //     .catch(console.log);
        try {
            const response = await fetch(url);
            this.options.page += 1;
            return response.json()
                .then(({ hits }) => hits);
        }
        catch (error) {
            console.log("Ошибка КЕЧ", error);
        }
    }
            
    getImages(searchQuery) {

        if (searchQuery) {
            this.options.searchQuery = searchQuery;
            this.options.page = 1;
        }
            
        
        const url = this.getUrl();

         return this.fetchImages(url);
    }
}
    
    

