var zonaDatos, inputUI, btnCreateFile, nombre_archivo;
const QUOTA = 5 * 1024 * 1024;

window.addEventListener("load", () => {
    inputUI = document.getElementById("nameFile");
    zonaDatos = document.getElementById("result");
    btnCreateFile = document.getElementById("btn-create-file");

    btnCreateFile.addEventListener("click", crear);
    //para chrome
    navigator.webkitPersistentStorage.requestQuota(QUOTA, acceso);
});

function acceso() {
    window.webkitRequestFileSystem(PERSISTENT, QUOTA, createFileSystemLocal, errores);
}

function createFileSystemLocal(objFileSystem) {
    espacio = objFileSystem.root;
    ruta = "";
    mostrar();
}

function crear() {
    nombre_archivo = inputUI.value;
    if (nombre_archivo != 0) {
        nombre_archivo = ruta + nombre_archivo;
        espacio.getFile(nombre_archivo, { create: true, exclusive: false }, mostrar, errores);
    }
}

function mostrar() {
    //vaciar input
    inputUI.value = "";
    //vaciar zona de informacion
    zonaDatos.innerHTML = "";
    espacio.getDirectory(nombre_archivo, null, leerDir, errores);
}

function leerDir(dir) {
    lector = dir.createReader(); // objeto DirectoryReader q permite accceder a metodo readEntries()
    leer();
}

function leer() {
    lector.readEntries((archivos) => {
        if (archivos.length) {
            listar(archivos);
        }
    }, errores);
}

function listar(archivos) {
    for (i = 0; i < archivos.length; i++) {
        if (archivos[i].isFile) {
            zonaDatos.innerHTML += archivos[i].name + "<br>";
        } else if (archivos[i].isDirectory) {
            zonaDatos.innerHTML += `<h2 onclick="cambiarDir(${archivos[i].name})">${archivos[i].name}</h2>`;
        }
    }
}
function cambiarDir(newDir) {
    ruta = ruta + "\/"+ newDir+"\/"+ "/";
    //ruta = ruta + newDir + "/";
    mostrar();   
}

function volver() {
    espacio.getDirectory(ruta, null, (dirActual) => {
        dirActual.getParent((dirPadre) => {
            ruta = dirPadre.fullPath;
            mostrar();
        }, errores);
    }, errores);
}

function errores(e) {
    alert("Se ha producido un error" + e.code);
}

