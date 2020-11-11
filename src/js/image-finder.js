import debounce from 'lodash.debounce';


import ApiService from './apiService';
const apiService = new ApiService();


import 'material-design-icons/iconfont/material-icons.css';

import photoCardTpl from '../templates/photo-card.hbs';


const refs = {
    searchForm: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    gallery: document.querySelector('.gallery'),
    header: document.querySelector('.header')
}

refs.searchForm.addEventListener('submit', onSearch);

refs.loadMoreBtn.disabled = true;
refs.loadMoreBtn.addEventListener('click', onLoadMore);

window.addEventListener('scroll', debounce(onScroll, 300));


function onSearch(e) {
    e.preventDefault();

    const searchQuery = e.currentTarget.elements.query.value;   
    apiService.getImages(searchQuery)
        .then(imgDataArray => {
            console.log(imgDataArray);
            scrollUp();
            clearImageMarkup();
            refs.loadMoreBtn.disabled = true;
            appendImagesMarkup(imgDataArray);
        });   
}
function onLoadMore() { 
    apiService.getImages().then((imgDataArray) => {
        appendImagesMarkup(imgDataArray);
        scrollDown();
        refs.loadMoreBtn.disabled = true;
    });   
}

function appendImagesMarkup(imgDataArray) { 
    refs.gallery.insertAdjacentHTML('beforeend', photoCardTpl(imgDataArray));
}
function clearImageMarkup(){ 
    refs.gallery.innerHTML = '';
}


function onScroll() {
      if ((refs.gallery.clientHeight - document.documentElement.clientHeight) === window.pageYOffset) onScrolledToTheBottom();
 }
function scrollUp() {  
    window.scrollTo({
        top: 0,
        // behavior: "smooth"
    });
}
function scrollDown() {  
    const top = window.pageYOffset + document.documentElement.clientHeight - refs.header.clientHeight - 5;
    window.scrollTo({
        top: top,
        behavior: "smooth"
    });
}
function onScrolledToTheBottom() { 
    refs.loadMoreBtn.disabled = false;
    console.log('You scrolled to the bottom');
}

