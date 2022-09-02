import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
console.log(form.elements);

const STORAGE_KEY = "feedback-form-state";

const formData = {};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
          
function onFormSubmit(e) {
    e.preventDefault();
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

const dataFromLocalStorage = function () {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    const keys = Object.keys(savedData);
    const children = form.elements;
    
    for (const key of keys) {
        for (const child of children) {
            if (child.getAttribute('name') === key) {
                child.value = savedData[key];
            }
        }
    }
}

dataFromLocalStorage();