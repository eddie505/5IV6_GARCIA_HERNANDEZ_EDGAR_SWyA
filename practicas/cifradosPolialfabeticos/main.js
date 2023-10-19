document.addEventListener("DOMContentLoaded", function () {
    const texto = document.getElementById("texto");
    const seleccionarCesar = document.getElementById("seleccionarCesar");
    const seleccionarVigenere = document.getElementById("seleccionarVigenere");
    const desplazamiento = document.getElementById("desplazamiento");
    const clave = document.getElementById("clave");
    const cifrado = document.getElementById("cifrado");
    const cifrarBtn = document.getElementById("cifrarBtn");
    const descifrarBtn = document.getElementById("descifrarBtn");
    const copiarBtn = document.getElementById("copiarBtn");
    const reiniciarBtn = document.getElementById("reiniciarBtn");
    const cesarOptions = document.getElementById("cesar-options");
    const vigenereOptions = document.getElementById("vigenere-options");


    seleccionarCesar.addEventListener("click", function () {
        cesarOptions.style.display = "block";
        vigenereOptions.style.display = "none";
    });

    seleccionarVigenere.addEventListener("click", function () {
        vigenereOptions.style.display = "block";
        cesarOptions.style.display = "none";
    });

    cifrarBtn.addEventListener("click", function () {
        const textoIngresado = texto.value;
        if (cesarOptions.style.display === "block") {
            const valorDesplazamiento = parseInt(desplazamiento.value);
            cifrado.value = cifrarCesar(textoIngresado, valorDesplazamiento);
        } else {
            const claveValor = clave.value;
            cifrado.value = cifrarVigenere(textoIngresado, claveValor);
        }
    });

    descifrarBtn.addEventListener("click", function () {
        const textoIngresado = texto.value;
        if (cesarOptions.style.display === "block") {
            const valorDesplazamiento = parseInt(desplazamiento.value);
            cifrado.value = descifrarCesar(textoIngresado, valorDesplazamiento);
        } else {
            const claveValor = clave.value;
            cifrado.value = descifrarVigenere(textoIngresado, claveValor);
        }
    });

    desplazamiento.addEventListener("change", function () {
        const valorDesplazamiento = parseInt(desplazamiento.value);
        document.getElementById("valorDesplazamiento").textContent = valorDesplazamiento;
    });  

    copiarBtn.addEventListener("click", function () {
        const textoCifradoValor = cifrado.value;
        texto.value = textoCifradoValor;
    });

    reiniciarBtn.addEventListener("click", function () {
    texto.value = ""; 
    clave.value = "";
    cifrado.value = ""; 
    });
});

function cifrarCesar(texto, desplazamiento) {
    const letrasMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    return texto.replace(/[a-zA-Z]/g, function (match) {
        let letras;
        if (letrasMayusculas.includes(match)) {
            letras = letrasMayusculas;
        } else {
            letras = letrasMinusculas;
        }
        const indice = letras.indexOf(match);
        const nuevoIndice = (indice + desplazamiento) % letras.length;
        return letras.charAt(nuevoIndice);
    });
}

function descifrarCesar(texto, desplazamiento) {
    const letrasMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    return texto.replace(/[a-zA-Z]/g, function (match) {
        let letras;
        if (letrasMayusculas.includes(match)) {
            letras = letrasMayusculas;
        } else {
            letras = letrasMinusculas;
        }
        const indice = letras.indexOf(match);
        const nuevoIndice = (indice - desplazamiento + letras.length) % letras.length;
        return letras.charAt(nuevoIndice);
    });
}

function cifrarVigenere(texto, clave) {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const claveRepetida = clave.repeat(Math.ceil(texto.length / clave.length)).substring(0, texto.length);
    let resultado = '';

    for (let i = 0; i < texto.length; i++) {
        const textoChar = texto[i];
        if (/[A-Za-z]/.test(textoChar)) {
            const isUpperCase = textoChar === textoChar.toUpperCase();
            const textoIndex = letras.indexOf(textoChar.toUpperCase());
            const claveChar = claveRepetida[i].toUpperCase();
            const claveIndex = letras.indexOf(claveChar);
            const newIndex = (textoIndex + claveIndex) % 26;
            const newChar = letras.charAt(newIndex);
            resultado += isUpperCase ? newChar : newChar.toLowerCase();
        } else {
            resultado += textoChar;
        }
    }

    return resultado;
}

function descifrarVigenere(texto, clave) {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const claveRepetida = clave.repeat(Math.ceil(texto.length / clave.length)).substring(0, texto.length);
    let resultado = '';

    for (let i = 0; i < texto.length; i++) {
        const textoChar = texto[i];
        if (/[A-Za-z]/.test(textoChar)) {
            const isUpperCase = textoChar === textoChar.toUpperCase();
            const textoIndex = letras.indexOf(textoChar.toUpperCase());
            const claveChar = claveRepetida[i].toUpperCase();
            const claveIndex = letras.indexOf(claveChar);
            const newIndex = (textoIndex - claveIndex + 26) % 26;
            const newChar = letras.charAt(newIndex);
            resultado += isUpperCase ? newChar : newChar.toLowerCase();
        } else {
            resultado += textoChar;
        }
    }

    return resultado;
}