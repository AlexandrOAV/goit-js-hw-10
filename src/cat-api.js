import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '360px',
  position: 'center-center', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 10000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: true,
  pauseOnHover: true,

  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4001,
  fontFamily: 'Quicksand',
  fontSize: '16px',
  cssAnimation: true,
  cssAnimationDuration: 1000,
  cssAnimationStyle: 'zoom', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
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
const KEY = 'live_rZzjgKrmWzeonY3YGx515qAI1Mr4ZcuaWUnHyhXO3XOAZGOFIhcABMpmmZ7JbhTK';  
export function fetchBreeds() {
    const URL = 'https://api.thecatapi.com/v1/breeds/';
 return fetch(`${URL}?api_key=${KEY}`)
     .then(res => {
         if (!res.ok) {
              throw new Error('Request failed');
         }
            return res.json();
        })
        .then(cats =>
        {
            let catsArray = cats.map(cat =>
                ({ id: cat.id, name: cat.name }))
            return catsArray;
        }
        )
        .catch(error => {
             Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
        });
};
export function fetchCatByBreed(breedId) {
    const URLIM='https://api.thecatapi.com/v1/images/search'
 return fetch(`${URLIM}?breed_ids=${breedId}&api_key=${KEY}`)
     .then(res => {
         if (!res.ok) {
              throw new Error('Request failed');
         }
            return res.json();
        })
        .then(cats =>  cats[0])
        .catch(error => {
             Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
        });
};


