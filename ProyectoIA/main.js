let model;
let etiquetas;


const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const resultado = document.getElementById('resultado');
const canvita = canvas.getContext('2d');

async function modelote() {
  model = await tf.loadLayersModel('modelo_tfjs/model.json');

  const res = await fetch('clases.json');
  etiquetas = await res.json();

  for (let [k, v] of Object.entries(etiquetas)){
    etiquetas[parseInt(k)]= v;
  }
  resultado.textContent = 'Modelo cargado...';
}

async function iniciarCamara() {
    const ojo = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = ojo;
}

async function predecir() {
  if (!model) return;

  canvita.drawImage(video, 0, 0, 100, 100); 
  const imagenTensor = tf.browser.fromPixels(canvas)
    .toFloat()
    .div(255)
    .expandDims();
  
    console.log(imagenTensor.shape);

  const prediccion = model.predict(imagenTensor);
  const dato = await prediccion.data();
  const maxIndex = dato.indexOf(Math.max(...dato));
  resultado.textContent = etiquetas[maxIndex] || 'Desconocido';

  imagenTensor.dispose();
  prediccion.dispose();
}

async function main() {
  await iniciarCamara();
  await modelote();
  setInterval(predecir, 1000); 
}

main();


const fondoMatrix = document.getElementById('matrix');
const ctx = fondoMatrix.getContext('2d');

fondoMatrix.width = window.innerWidth;
fondoMatrix.height = window.innerHeight;

const letras = '01';
const tamaL = 14;
const columnas = fondoMatrix.width / tamaL;

const gotas = Array.from({ length: columnas }, () => 1);

function dibujarMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, fondoMatrix.width, fondoMatrix.height);

  ctx.fillStyle = '#00f8ff';
  ctx.font = tamaL + 'px monospace';

  for (let i = 0; i < gotas.length; i++) {
    const letra = letras[Math.floor(Math.random() * letras.length)];
    ctx.fillText(letra, i * tamaL, gotas[i] * tamaL);

    if (gotas[i] * tamaL > fondoMatrix.height && Math.random() > 0.975) {
      gotas[i] = 0;
    }

    gotas[i]++;
  }
}

setInterval(dibujarMatrix, 33);

