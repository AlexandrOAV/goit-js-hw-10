import { fetchBreeds, fetchCatByBreed } from './cat-api'
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '360px',
  position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 4000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,

  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4001,
  fontFamily: 'Quicksand',
  fontSize: '16px',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'fade', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  closeButton: false,
  useIcon: false,
  useFontAwesome: false,
  fontAwesomeIconStyle: 'basic', // 'basic' - 'shadow'
  fontAwesomeIconSize: '34px',

  success: {
    background: '#32c682',
    textColor: '#fff',
    childClassName: 'notiflix-notify-success',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-check-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(50,198,130,0.2)',
  },

  failure: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },
});
const selectEl = document.querySelector('.breed-select');
const divInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

fetchBreeds().then(catsArray => {
  addOption(catsArray);
 })
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
  });
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
