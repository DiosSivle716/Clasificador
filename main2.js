document.addEventListener('DOMContentLoaded', () => {
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
});

