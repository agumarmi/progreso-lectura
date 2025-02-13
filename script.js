// Inicialización de Pickr
// Simple example, see optional options for more configuration.
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'
    alignment: 'center',
    swatches: ["#f39c12", "#e74c3c", "#8e44ad", "#3498db", "#1abc9c", "#2ecc71", "#f1c40f", "#e67e22", "#ecf0f1"],
    components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
            hex: true,
            rgba: true,
            input: true,
            clear: true,
            save: true
        }
    }
});

// Obtener el color seleccionado y usarlo para actualizar el progreso
pickr.on('save', (color) => {
    const selectedColor = color.toHEXA().toString(); // Obtener el color en formato hexadecimal
    document.getElementById('circle-progress').style.stroke = selectedColor;
    pickr.hide()
});



//--------------- Pickr texto:

const pickr_text = Pickr.create({
    el: '.color-picker-text',
    theme: 'classic', // or 'monolith', or 'nano'
    alignment: 'center',
    swatches: ["#f39c12", "#e74c3c", "#8e44ad", "#3498db", "#1abc9c", "#2ecc71", "#f1c40f", "#e67e22", "#ecf0f1"],
    components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
            hex: true,
            rgba: true,
            input: true,
            clear: true,
            save: true
        }
    }
});

// Obtener el color seleccionado y usarlo para actualizar el progreso
pickr_text.on('save', (color) => {
    const selectedColor = color.toHEXA().toString(); // Obtener el color en formato hexadecimal
    document.getElementById('progress-text').style.color = selectedColor;
    document.getElementById('progress-text-pages').style.color = selectedColor;
    pickr_text.hide();
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
    const totalPages = parseInt(document.getElementById('pages-total').value);
    let pagesRead = parseInt(document.getElementById('pages-read').value);
    const textPrefix = ' ';

    if (pagesRead > totalPages) {
        pagesRead = totalPages;
    }
    if (pagesRead < 0) {
        pagesRead = 0;
    }
    // Calcular el porcentaje de progreso
    const progress = (pagesRead / totalPages) * 100;
    const strokeOffset = 440 - (440 * progress / 100);

    
    // Actualizar el texto del porcentaje
    if(totalPages != 0) {
        document.getElementById('circle-progress').style.strokeDashoffset = strokeOffset;
        document.getElementById('progress-text').textContent = `${textPrefix} ${Math.round(progress)}%`;
        document.getElementById('progress-text-pages').textContent = `${pagesRead} / ${totalPages}`;
    } else {
        document.getElementById('circle-progress').style.strokeDashoffset = null;
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
