var inputFile, descriptionFile;

window.addEventListener("load", startMain);

function startMain() {
    inputFile = document.getElementById("input-file");
    descriptionFile = document.getElementById("description-file");
    if (window.File && window.FileList && window.FileReader){
        inputFile.addEventListener("change", processFile);
    }else{
        alert("Su navegador no soporta la API File. Le sugerimos cambiar al Chrome.")
    }

}
function processFile(e) {
    descriptionFile.innerHTML = "";
    let fileSelect = e.target.files[0];
    let lector = new FileReader();
    lector.readAsText(fileSelect,"iso-8859-1");
    lector.addEventListener("load", showDescriptionFile);

}
function showDescriptionFile(e) {
    let resultLoad = e.target.result;
    let fileName = resultLoad.name;
    descriptionFile.innerHTML = resultLoad;
}