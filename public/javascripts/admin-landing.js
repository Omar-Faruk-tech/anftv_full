
let newsButtonWrapper = 
document.getElementById('news-list-container-mobile');

let modal = document.getElementsByClassName('modal-background');
let close = document.getElementsByClassName('close');
let modalId = document.getElementById('modal-background');
let closeId = document.getElementById('close');
let menu = document.getElementById('hamburger');

function openNav() {
    newsButtonWrapper.classList.add('open-news-categories-mobile');
    modalId.classList.add('modal-background');
    closeId.classList.add('close');
    menu.style.color = 'rgba(255, 255, 255, 0.9)';
};

function closeNav() {
  newsButtonWrapper.classList.remove('open-news-categories-mobile');
  modalId.classList.remove('modal-background');
  closeId.classList.remove('close');
  menu.style.color = '#2201f9';
};


let manageNews = document.getElementById('manage-news-button').addEventListener('click', toggleNewsButtons);

let newsButtonContainer = document.getElementById('news-buttons');

function toggleNewsButtons() {
  newsButtonContainer.classList.toggle('open-news-buttons')
}

function logOut() {
  window.location = "admin-login.html";
}


let manageUser = document.getElementById('manage-user-button').addEventListener('click', toggleUserButtons);

let userButtonContainer = document.getElementById('user-buttons');

function toggleUserButtons() {
  userButtonContainer.classList.toggle('open-user-buttons')
}

