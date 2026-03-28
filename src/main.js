import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';

import iziToast from 'izitoast';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  appendToGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  scrollToNewImages,
} from './js/render-functions.js';

const refs = {
  searchForm: document.querySelector('.form'),
  searchInput: document.querySelector('.form input[name="search-text"]'),
  loader: document.querySelector('.loader-wrap'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

let query = '';
let currentPage = 1;
const perPage = 15;

refs.searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  query = refs.searchInput.value.trim();
  currentPage = 1;

  if (!query) {
    iziToast.warning({ message: 'Please enter a search query' });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, currentPage);

    if (data.hits.length === 0) {
      currentPage = 1;
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      createGallery(data.hits);

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (totalPages > 1) {
        showLoadMoreButton();
      } else {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    }
  } catch (error) {
    currentPage = 1;
    iziToast.error({ message: 'Error' });
    return;
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

    appendToGallery(data.hits);

    scrollToNewImages();

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
    iziToast.error({ message: 'Error' });
    return;
  } finally {
    hideLoader();
  }
});
