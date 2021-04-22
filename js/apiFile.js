var inputFile, descriptionFile;

window.addEventListener("load", startMain);

function startMain() {
    inputFile = document.getElementById("input-file");
    descriptionFile = document.getElementById("description-file");
    if (window.File && window.FileList && window.FileReader) {
        inputFile.addEventListener("change", processFile);
    } else {
        alert("Su navegador no soporta la API File. Le sugerimos cambiar al Chrome.")
    }

}
function processFile(e) {
    descriptionFile.innerHTML = "";
    let fileSelect = e.target.files[0];
    //alert(fileSelect.type);
    let lector = new FileReader();
    if (fileSelect.type.match(/text/)) {
        lector.readAsText(fileSelect, "iso-8859-1");
        //si es una img usar readAsDataURL
        lector.addEventListener("load", showDescriptionFile);
    } else if (fileSelect.type.match(/image/)) {
        descriptionFile.innerHTML += "Nombre: " + fileSelect.name +"<br>";
        descriptionFile.innerHTML += "Tamaño: " + fileSelect.size +"<br>";
        descriptionFile.innerHTML += "Tipo:" + fileSelect.type +"<br>";
        lector.readAsDataURL(fileSelect);
        lector.addEventListener("load", showImage);
    }
}
function showDescriptionFile(e) {
    let resultLoad = e.target.result;
    descriptionFile.innerHTML += resultLoad;
}

function showImage(e) {
    let resultImage = e.target.result;
    descriptionFile.innerHTML += `<img src="${resultImage}">`;
}