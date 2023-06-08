import { fetchBreeds, fetchCatByBreed } from './cat-api'
import Notiflix from 'notiflix';

const selectEl = document.querySelector('.breed-select');
const divInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

fetchBreeds().then(catsArray => {
  addOption(catsArray);
})
  .catch(error => {
    Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  });
  
function addOption(array) {
const selectHtml = array.map(({id, name}) => {
      return `<option value=${id}>${name}</option>`
}).join('\n');
  selectEl.insertAdjacentHTML('afterbegin', selectHtml)
  selectEl.classList.remove('hidden');
  selectEl.classList.add('visible');
  loaderEl.classList.add('hidden');
};
selectEl.addEventListener('change', event => {
  const breedId = event.target.value;
  loaderEl.classList.remove('hidden');
  fetchCatByBreed(breedId).then(cats => {
    const imgURL = cats.url;
    const infoCat = cats.breeds[0].description;
    const temperamentCat = cats.breeds[0].temperament;
    const nameHeader = cats.breeds[0].name;
    addInfoCat({ imgURL, infoCat, temperamentCat, nameHeader });
  })
  .catch (error => {
    loaderEl.classList.add('hidden');
    divInfoEl.innerHTML = '';
    Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  }
  
  );
})


function addInfoCat({imgURL, infoCat, temperamentCat, nameHeader}) {
   
  const divInfo = `<img src="${imgURL}" alt="cat photo breed ${nameHeader}" style="max-width: 360px;"/>
<div><h1 class="header">${nameHeader}</h1>
<p class="info">${infoCat}</p>
<p class="info">
  <span class="text-explanation">Temperament: </span>${temperamentCat}
</p>
</div>
  ` 
  loaderEl.classList.add('hidden');
  return divInfoEl.innerHTML=divInfo;
}
