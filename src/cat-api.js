import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'center-center', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  timeout: 5000,
  clickToClose: true,
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


