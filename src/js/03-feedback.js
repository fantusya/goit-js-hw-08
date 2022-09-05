import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onFormInput, 500));

form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
    const formData = { email: email.value, message: message.value };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function onFormSubmit(e) {
  e.preventDefault();
  console.log({ email: email.value, message: message.value });
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const storageData = load(STORAGE_KEY);
if (storageData) {
  email.value = storageData.email;
  message.value = storageData.message;
}

// const form = document.querySelector('.feedback-form');

// const STORAGE_KEY = "feedback-form-state";

// let formData = {};

// form.addEventListener('submit', onFormSubmit);
// form.addEventListener('input', throttle(onFormInput, 500));

// function onFormInput(e) {
//     formData[e.target.name] = e.target.value;
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
// }
          
// function onFormSubmit(e) {
//     e.preventDefault();
//     console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
//     e.currentTarget.reset();
//     localStorage.removeItem(STORAGE_KEY);
// }

// const dataFromLocalStorage = function () {
//     if (localStorage.length > 1) {
//        const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

//     const keys = Object.keys(savedData);
//     const children = form.elements;
    
//     for (const key of keys) {
//         for (const child of children) {
//             if (child.getAttribute('name') === key) {
//                 child.value = savedData[key];
//             }
//         }
//     } 
//     // }
// }

// dataFromLocalStorage();
