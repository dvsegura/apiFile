var zona_dato, nombre_archivo, btnWriteFile;
const QUOTA = 5 * 1024 * 1024;

window.addEventListener("load", () => {
    zona_dato = document.getElementById("result");
    nombre_archivo = document.getElementById("archivo_origen");
    textoUI = document.getElementById("texto");

    btnWriteFile = document.getElementById("btn-create-file");
    btnWriteFile.addEventListener("click", escribir_archivo);

    navigator.webkitPersistentStorage.requestQuota(QUOTA, acceso);
});

function acceso() {
    window.webkitRequestFileSystem(PERSISTENT, QUOTA, crearSistema, errores);
}

function crearSistema(sistema) {
    espacio = sistema.root;
}

function escribir_archivo(e) {
    e.preventDefault(); 
    let nombre = nombre_archivo.value;
    espacio.getFile(nombre, {create: true, exclusive:false},(entrada)=>{
        entrada.createWriter(escribir_contenido, errores);
    },errores);
}

function escribir_contenido(fileWriter){
    let texto = textoUI.value;
    fileWriter.onwriteend = exito();
    let blob = new Blob([texto],{type:"text/html"});
    fileWriter.write(blob);
}

function exito(){
    nombre_archivo.value = "";
    textoUI.value = ""; 
    console.log("exito escribiendo");
}

function errores(e) {
    alert("Se ha producido un error" + e.code);
}