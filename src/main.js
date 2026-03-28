import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';

import iziToast from 'izitoast';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  refreshLightbox,
} from './js/render-functions';

const refs = {
  searchForm: document.querySelector('.form'),
  searchInput: document.querySelector('.form input[name="search-text"]'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader-wrap'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

let query = '';
let currentPage = 1;
const perPage = 15;

refs.searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  currentPage = 1;

  query = refs.searchInput.value.trim();
  if (query === '') {
    iziToast.error({ message: 'Please fill in the input field.' });
    return;
  }

  hideLoadMoreButton();
  showLoader();

  clearGallery();

  try {
    const data = await getImagesByQuery(query, currentPage);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      refs.gallery.innerHTML = createGallery(data.hits);
      refreshLightbox();

      if (data.totalHits > perPage) {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
    refs.searchForm.reset();
  }
});

refs.loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, currentPage);
    const markup = createGallery(data.hits);

    refs.gallery.insertAdjacentHTML('beforeend', markup);
    refreshLightbox();

    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const cardHeight = galleryItem.getBoundingClientRect().height;

      window.scrollBy({
        top: (cardHeight + 24) * 2.5,
        behavior: 'smooth',
      });
    }

    const totalPages = Math.ceil(data.totalHits / perPage);

    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
});
