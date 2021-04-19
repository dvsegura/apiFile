/* var file = new File(["foo"], "foo.txt", {
    type: "text/plain",
}); */
var resultado, inputUI, btnCreateFile;
const QUOTA = 5 * 1024 * 1024;

window.addEventListener("load", () => {
    resultado = document.getElementById("result");
    inputUI = document.getElementById("nameFile");
    btnCreateFile = document.getElementById("btn-create-file");
    btnCreateFile.addEventListener("click", createFile());
    //para chrome
    navigator.webkitPersistentStorage.requestQuota(QUOTA, acceso);
});

function acceso() {
    window.webkitRequestFileSystem(PERSISTENT, QUOTA, createFileSystemLocal, errores);
    console.log("1.acceso");
}

function createFileSystemLocal(objFileSystem) {
    console.log("2.objFileSystem");
    pathFileSystem = objFileSystem.root;
}

function errores(e) {
    alert("Se ha producido un error" + e.code);
}

function createFile() {
    let nameFile = inputUI.value;
    if (nameFile.length != "") {
        pathFileSystem.getFile(nameFile, { create: true, exclusive: true }, successCreation, errores);
        console.log("3.Create File");
    }
}

function successCreation(file) {
    console.log("3.Informacion del archivo creado.");
    inputUI.value = "";
    resultado.innerHTML = "Éxito en la creación.<br>";
    resultado.innerHTML += "Name:" + file.name + "<br>";
    resultado.innerHTML += "Path:" + file.fullPath;
    
}