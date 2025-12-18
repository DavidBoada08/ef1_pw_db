<template>
  <div class="casino-container">
    <div v-if="mostrarMensajeFinal" class="message" :class="colorMensaje">
      <div v-if="puntaje < 10">
        <p>Has utilizado tus 5 intentos</p>
        <p>El juego ha terminado, inténtalo nuevamente</p>
      </div>
      <div v-else>
        <p>Puntaje: {{ puntaje }}</p>
        <p>¡Felicitaciones has ganado un premio de $10.000,00!</p>
      </div>
      <button @click="reiniciarJuego">Nuevo Juego</button>
    </div>
    <div v-else>
      <div class="puntajemsj">
        <span class="puntaje">Puntaje: {{ puntaje }}</span>
        <span class="intentos">Intento: {{ intentos }}</span>
      </div>
      <div class="images">
        <div v-for="(casilla, i) in casillas" :key="i" class="casilla">
          <div class="fondo">
            <img v-if="!casilla.oculto" :src="casilla.imagen" width="250" height="250" />
            <img v-else src="https://dummyimage.com/250x250" width="250" height="250" />
          </div>
          <div class="nombre">
            {{ casilla.oculto ? 'xxxxxxxxxx' : casilla.nombre }}
          </div>
        </div>
      </div>
      <div >
        <button class="botonjugar" @click="jugar" :disabled="intentos >= 5 || puntaje >= 10">JUGAR</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idsPosibles: [0,1,2,3,4], 
      casillas: [
        { imagen: 'https://dummyimage.com/250x250', nombre: '', oculto: true },
        { imagen: 'https://dummyimage.com/250x250', nombre: '', oculto: true },
        { imagen: 'https://dummyimage.com/250x250', nombre: '', oculto: true }
      ],
      puntaje: 0,
      intentos: 0,
      mostrarMensajeFinal: false,
      colorMensaje: ''
    };
  },
  methods: {
    async jugar() {
     
      const seleccionados = [];
      for (let i = 0; i < 3; i++) {
        const idx = Math.floor(Math.random() * this.idsPosibles.length);
        seleccionados.push(this.idsPosibles[idx]);
      }

     
      for (let i = 0; i < 3; i++) {
        const id = seleccionados[i];
        this.casillas[i].imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
        this.casillas[i].oculto = false;

        try {
          const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await resp.json();
          this.casillas[i].nombre = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        } catch {
          this.casillas[i].nombre = 'Desconocido';
        }
      }

     
      const nombres = this.casillas.map(c => c.nombre);
      let puntos = 0;
      if (nombres[0] === nombres[1] && nombres[1] === nombres[2]) {
        puntos = 5;
      } else if (nombres[0] === nombres[1] || nombres[0] === nombres[2] || nombres[1] === nombres[2]) {
        puntos = 2;
      }

      this.puntaje += puntos;
      this.intentos += 1;

   
      if (this.intentos >= 5 && this.puntaje < 10) {
        this.mostrarMensajeFinal = true;
        this.colorMensaje = "red";
      } else if (this.puntaje >= 10) {
        this.mostrarMensajeFinal = true;
        this.colorMensaje = "blue";
      }
    },
    reiniciarJuego() {
      this.puntaje = 0;
      this.intentos = 0;
      this.mostrarMensajeFinal = false;
      this.colorMensaje = '';
      this.casillas = [
        { imagen: 'https://dummyimage.com/250x250', nombre: '', oculto: true },
        { imagen: 'https://dummyimage.com/250x250', nombre: '', oculto: true },
        { imagen: 'https://dummyimage.com/250x250', nombre: '', oculto: true }
      ];
    }
  }
};
</script>

<style scoped>
.casino-container {
  border: 2px solid #222;
  max-width: 820px;
  margin: 30px auto;
  padding: 20px 10px 30px 10px;
  text-align: center;
  background: #fff;
  box-sizing: border-box;
}
.puntajemsj {
  display: flex;
  justify-content: space-between;
  margin: 0 60px 10px 60px;
  font-size: 1.2em;
  font-weight: bold;
}
.puntaje {
  margin-left: 30px;
}
.intentos {
  margin-right: 30px;
}
.images {
  display: flex;
  justify-content: space-between;
  margin: 0 30px 10px 30px;
  gap: 10px;
}
.casilla {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.fondo {
  width: 250px;
  height: 250px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #aaa;
  margin-bottom: 5px;
  box-sizing: border-box;
}
.imagenGris {
  width: 250px;
  height: 250px;
  background: #ccc;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  font-weight: bold;
}
.nombre {
  margin-top: 0px;
  font-size: 1.1em;
  letter-spacing: 2px;
}
.botonjugar {
  margin-top: 20px;
}
.botonjugar {
  padding: 8px 50px;
  font-size: 1.1em;
  border: 2px solid #222;
  background: #fff;
  cursor: pointer;
  font-weight: bold;
}
.botonjugar:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.message {
  border: 2px solid #222;
  padding: 30px;
  margin: 30px auto;
  font-size: 1.3em;
  font-weight: bold;
}
.red {
  color: red;
}
.blue {
  color: #1a3d8f;
}
</style>