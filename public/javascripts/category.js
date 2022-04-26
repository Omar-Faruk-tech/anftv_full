
var categoryLinks = document.getElementsByClassName("nav-a-link");

var getCategory = function() {
    const attribute = this.innerHTML;
    return attribute;
};

for (var i = 0; i < categoryLinks.length; i++) {
  categoryLinks[i].addEventListener('click', getCategory, false);
};


var captions = document.getElementsByClassName("caption");



