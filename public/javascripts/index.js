
let newsButtonContainer = 
document.getElementById('news-list-container-mobile');

let modal = document.getElementsByClassName('modal-background');
let close = document.getElementsByClassName('close');
let modalId = document.getElementById('modal-background');
let closeId = document.getElementById('close');
let menu = document.getElementById('hamburger');

function openNav() {
    newsButtonContainer.classList.add('open-news-categories-mobile');
    modalId.classList.add('modal-background');
    closeId.classList.add('close');
    menu.style.color = 'rgba(255, 255, 255, 0.9)';
};

function closeNav() {
  newsButtonContainer.classList.remove('open-news-categories-mobile');
  modalId.classList.remove('modal-background');
  closeId.classList.remove('close');
  menu.style.color = '#2201f9';
};

function logOut() {
  window.location = "admin-login.html";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  // alert('done');
}

    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

var categoryLinks = document.getElementsByClassName("nav-a-link");

var categoryCards = document.getElementsByClassName("card");

var getCategory = function() {
    let attribute = this.innerHTML;
    setCookie("category", attribute, 1);
};

var getCategoryFromCard = function() {
    let attribute = this.firstChild.innerHTML;
    setCookie("category", attribute, 1);
    console.log(attribute);
};

for (let i = 0; i < categoryLinks.length; i++) {
  categoryLinks[i].addEventListener('click', getCategory, false);
};

for (let i = 0; i < categoryCards.length; i++) {
  categoryCards[i].addEventListener('click', getCategoryFromCard, false);
};


