/* var file = new File(["foo"], "foo.txt", {
    type: "text/plain",
}); */
var resultado, inputUI, btnCreateFile;
const QUOTA = 5 * 1024 * 1024;

window.addEventListener("load", () => {
    resultado = document.getElementById("result");
    inputUI = document.getElementById("nameFile");
    btnCreateFile = document.getElementById("btn-create-file");
    
    btnCreateFile.addEventListener("click", createFile);
    
    //para chrome
    navigator.webkitPersistentStorage.requestQuota(QUOTA, acceso);
});

function acceso() {
    window.webkitRequestFileSystem(PERSISTENT, QUOTA, createSystem, errores);    
}

function createSystem(sistema) {    
    espacio = sistema.root; 
    ruta = "";
    mostrar();   
}

function crear(){
    var fileName = inputUI.value;
    if(fileName.length != 0){
        
    }
}
function errores(e) {
    alert("Se ha producido un error" + e.code);
}

