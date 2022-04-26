


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

var img = document.getElementById('img');

function prevDef(e) {
  e.preventDefault();
}


var file = document.getElementById('media-upload-input');
file = file.files[0];
console.log(file)
getBase64(file).then(
  data => console.log(data)
);