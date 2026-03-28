import{a as w,S as v,i as f}from"./assets/vendor-DBgeciyq.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();async function y(r,t){const e="https://pixabay.com/api/",o={key:"55161607-9b63bc502ca8d8d43be331324",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15};return(await w.get(e,{params:o})).data}const m=document.querySelector(".gallery"),u=document.querySelector(".loader-wrap"),d=document.querySelector(".load-more-btn"),M=new v(".gallery a",{captionsData:"alt",captionDelay:250,scrollZoom:!1});function P({webformatURL:r,largeImageURL:t,tags:s,likes:a,views:e,comments:o,downloads:i}){return`<li class="gallery-item">
  <a href="${t}">
  <img 
    class="image"
    src="${r}"
    data-source="${t}"
    alt="${s}"
    loading="lazy"
  />
  </a>
  <ul class="info-list">
  <li>
  <p class="info-title">likes</p>
  <p class="info-text">${a}</p>
  </li>
  <li>
  <p class="info-title">views</p>
  <p class="info-text">${e}</p>
  </li>
  <li>
  <p class="info-title">comments</p>
  <p class="info-text">${o}</p>
  </li>
  <li>
  <p class="info-title">downloads</p>
  <p class="info-text">${i}</p>
  </li>
  </ul>
</li>`}function h(r){return!r||r.length===0?"":r.map(P).join("")}function g(){M.refresh()}function x(){m&&(m.innerHTML="")}function L(){u&&u.classList.remove("is-hidden")}function b(){u&&u.classList.add("is-hidden")}function S(){d&&d.classList.remove("is-hidden")}function p(){d&&d.classList.add("is-hidden")}const n={searchForm:document.querySelector(".form"),searchInput:document.querySelector('.form input[name="search-text"]'),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader-wrap"),loadMoreBtn:document.querySelector(".load-more-btn")};let c="",l=1;const q=15;n.searchForm.addEventListener("submit",async r=>{if(r.preventDefault(),l=1,c=n.searchInput.value.trim(),c===""){f.error({message:"Please fill in the input field."});return}p(),L(),x();try{const t=await y(c,l);t.hits.length===0?f.error({message:"Sorry, there are no images matching your search query. Please try again!"}):(n.gallery.innerHTML=h(t.hits),g(),t.totalHits>q&&S())}catch(t){console.log(t)}finally{b(),n.searchForm.reset()}});n.loadMoreBtn.addEventListener("click",async()=>{l+=1,p(),L();try{const r=await y(c,l),t=h(r.hits);n.gallery.insertAdjacentHTML("beforeend",t),g();const s=document.querySelector(".gallery-item");if(s){const e=s.getBoundingClientRect().height;window.scrollBy({top:(e+24)*2.5,behavior:"smooth"})}const a=Math.ceil(r.totalHits/q);l>=a?(p(),f.info({message:"We're sorry, but you've reached the end of search results."})):S()}catch(r){console.log(r)}finally{b()}});
//# sourceMappingURL=index.js.map
