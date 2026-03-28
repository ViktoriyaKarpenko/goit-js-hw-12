import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader-wrap');
const loadMoreBtn = document.querySelector('.load-more-btn');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

function createImageMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="gallery-item">
  <a href="${largeImageURL}">
  <img 
    class="image"
    src="${webformatURL}"
    data-source="${largeImageURL}"
    alt="${tags}"
    loading="lazy"
  />
  </a>
  <ul class="info-list">
  <li>
  <p class="info-title">likes</p>
  <p class="info-text">${likes}</p>
  </li>
  <li>
  <p class="info-title">views</p>
  <p class="info-text">${views}</p>
  </li>
  <li>
  <p class="info-title">comments</p>
  <p class="info-text">${comments}</p>
  </li>
  <li>
  <p class="info-title">downloads</p>
  <p class="info-text">${downloads}</p>
  </li>
  </ul>
</li>`;
}

export function createGallery(images) {
  if (!images || images.length === 0) {
    return '';
  }

  return images.map(createImageMarkup).join('');
}

export function refreshLightbox() {
  lightbox.refresh();
}

export function clearGallery() {
  if (gallery) {
    gallery.innerHTML = '';
  }
}

export function showLoader() {
  if (loader) {
    loader.classList.remove('is-hidden');
  }
}

export function hideLoader() {
  if (loader) {
    loader.classList.add('is-hidden');
  }
}

export function showLoadMoreButton() {
  if (loadMoreBtn) {
    loadMoreBtn.classList.remove('is-hidden');
  }
}

export function hideLoadMoreButton() {
  if (loadMoreBtn) {
    loadMoreBtn.classList.add('is-hidden');
  }
}
