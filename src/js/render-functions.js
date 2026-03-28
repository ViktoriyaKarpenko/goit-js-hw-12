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

function createImageMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
    <a href="${largeImageURL}">
      <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <ul class="info-list">
      <li><p class="info-title">Likes</p><p class="info-text">${likes}</p></li>
      <li><p class="info-title">Views</p><p class="info-text">${views}</p></li>
      <li><p class="info-title">Comments</p><p class="info-text">${comments}</p></li>
      <li><p class="info-title">Downloads</p><p class="info-text">${downloads}</p></li>
    </ul>
  </li>`
    )
    .join('');
}

export function createGallery(images) {
  if (!gallery) return;
  if (!images || images.length === 0) return;
  gallery.innerHTML = createImageMarkup(images);
  lightbox.refresh();
}

export function appendToGallery(images) {
  gallery.insertAdjacentHTML('beforeend', createImageMarkup(images));
  lightbox.refresh();
}

export function scrollToNewImages() {
  const galleryItem = gallery?.querySelector('.gallery-item');
  if (galleryItem) {
    const height = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
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
