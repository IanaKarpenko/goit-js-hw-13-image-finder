import './styles.css';
import getRefs from './js/refs';
import ApiService from './js/apiService';
import imageTempl from './templates/imageTempl.hbs';
import notification from './js/inputNotification.js';

const refs = getRefs();

const apiService = new ApiService();

function submitSearchButtonHandler(event) {
    event.preventDefault();
    apiService.query = event.currentTarget.elements.query.value;

    // if our search input is empty
    if (apiService.query === '') {
        notification.enterImageName();
        return;
    }
  
    refs.gallery.innerHTML = '';
    apiService.resetPage();
    clear();
    apiService.fetchHits().then(hits => {
        updatePagelayout(hits);
        apiService.incrementPage();
        refs.loadMore.classList.add('load-more-buttton');
        refs.loadMore.classList.remove('is-hidden');
    });
}
 
function loadMoreButtonHandler() {
    const scrollHeight = document.documentElement.scrollHeight;
    apiService.fetchHits().then(hits => {
        updatePagelayout(hits);  
        apiService.incrementPage();

    window.scrollTo({
        top: scrollHeight,            
        behavior: 'smooth'
    });    
    });
}


function updatePagelayout(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', imageTempl(hits)); 
}

function clear(){
    refs.gallery.innerHTML = '';
}

//page behavior
refs.loadMore.classList.remove('load-more-buttton');
refs.loadMore.classList.add('is-hidden');
refs.searchForm.addEventListener('submit', submitSearchButtonHandler);
refs.loadMore.addEventListener('click', loadMoreButtonHandler);

