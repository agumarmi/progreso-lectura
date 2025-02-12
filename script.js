// Inicialización de Pickr
// Simple example, see optional options for more configuration.
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'
    alignment: 'center',
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            hsva: true,
            cmyk: true,
            input: true,
            clear: true,
            save: true
        }
    }
});

// Obtener el color seleccionado y usarlo para actualizar el progreso
pickr.on('change', (color) => {
    const selectedColor = color.toHEXA().toString(); // Obtener el color en formato hexadecimal
    document.getElementById('circle-progress').style.stroke = selectedColor;
});

//--------------- Función para añadir una página
function addPage() {
    const pagesRead = document.getElementById('pages-read');
    pagesRead.value = parseInt(pagesRead.value) + 1;
    updateProgress();
}
//--------------- Funcion para restar una página
function delPage() {
    const pagesRead = document.getElementById('pages-read');
    pagesRead.value = parseInt(pagesRead.value) - 1;
    updateProgress();
}
//--------------- Función para actualizar el progreso
function updateProgress() {
    const totalPages = document.getElementById('pages-total').value;
    const pagesRead = document.getElementById('pages-read').value;
    const textPrefix = ' ';

    // Calcular el porcentaje de progreso
    const progress = (pagesRead / totalPages) * 100;
    const strokeOffset = 440 - (440 * progress / 100);

    // Actualizar el progreso en el círculo
    document.getElementById('circle-progress').style.strokeDashoffset = strokeOffset;
    
    // Actualizar el texto del porcentaje
    if(totalPages != 0) {
        document.getElementById('progress-text').textContent = `${textPrefix} ${Math.round(progress)}%`;
        document.getElementById('progress-text-pages').textContent = `${pagesRead} / ${totalPages}`;
    } else {
        document.getElementById('progress-text').textContent = `${textPrefix} 0%`;
        document.getElementById('progress-text-pages').textContent = `0 / 0`;
    }
}
//--------------- Función para mostrar todo
function showAll() {
    showContainer();
    showConfig();
}

//--------------- Mostrar/ ocultar el div

//Obtenemos info del div
let circle_container = document.getElementById('circle-container');
let container = document.getElementById('container');
let config = document.getElementById('config');

// Función para mostrar/ocultar el div del círculo de progreso
function showProgress() {
    circle_container.style.display = (circle_container.style.display === "none") ? "block" : "none";
}
// Función para mostrar/ocultar el div del contenedor
function showContainer() {
    container.style.display = (container.style.display === "none") ? "block" : "none";
}

//Función para resetear el progreso
function resetProgress() {
    document.getElementById('pages-read').value = 0;
    document.getElementById('pages-total').value = 0;
    updateProgress();
}
 //Función para mostrar/ocultar las páginas 
 function showPages() {
    const pages = document.getElementById('progress-text-pages');
    pages.style.display = (pages.style.display === "none") ? "block" : "none";
 }

 //Función para mostrar/ocultar la configuración	
 function showConfig() {
    config.style.display = (config.style.display === "none") ? "block" : "none";
 }

 //Función para mostrar/ocultar el porcentaje
 function showPercentage() {
    const percentage = document.getElementById('progress-text');
    percentage.style.display = (percentage.style.display === "none") ? "block" : "none";
 }

// Variables para guardar la posición
let offsetX = 0, offsetY = 0;


// Evento cuando empieza el arrastre
document.addEventListener("dragstart", (e) => {
    offsetX = e.clientX - circle_container.offsetLeft;
    offsetY = e.clientY - circle_container.offsetTop;
    e.dataTransfer.setData("text/plain", ""); // Necesario para permitir el arrastre en algunos navegadores
});
// Permitir soltar en cualquier parte del documento
document.addEventListener("dragover", (e) => {
    e.preventDefault(); // Necesario para permitir el drop
});
// Evento cuando el div es soltado
document.addEventListener("drop", (e) => {
    e.preventDefault();
    circle_container.style.left = `${e.clientX - offsetX}px`;
    circle_container.style.top = `${e.clientY - offsetY}px`;
});

// // Evento cuando empieza el arrastre
// div_.addEventListener("dragstart", (ev) => {
//     offsetA = ev.clientX - div_.offsetLeft;
//     offsetB = ev.clientY - div_.offsetTop;
//     ev.dataTransfer.setData("text/plain", ""); // Necesario para permitir el arrastre en algunos navegadores
// });
// // Permitir soltar en cualquier parte del documento
// document.addEventListener("dragover", (ev) => {
//     ev.preventDefault(); // Necesario para permitir el drop
// });
// // Evento cuando el div es soltado
// document.addEventListener("drop", (ev) => {
//     ev.preventDefault();
//     div_.style.left = `${ev.clientX - offsetA}px`;
//     div_.style.top = `${ev.clientY - offsetB}px`;
// });