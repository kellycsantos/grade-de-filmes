<template>
  <ul class="movie-times" v-if="atualizar">
    <li
      v-if="passouDaHora(horario)"
      :class="falta15min <= 15 ? 'last15min' : ''"
    >
      <span class="movie-time">{{ horario }}</span>
      <span class="movie-language">{{ idioma }}</span>
    </li>
  </ul>
</template>
<script>
  export default {
    name: "ListRow",
    props: {
      horario: String,
      idioma: String,
    },
    data() {
      return {
        atualizar: true,
        falta15min: 0,
      };
    },
    methods: {
      passouDaHora(horarioFilme) {
        let horaAtual = new Date();

        let hFilme = horarioFilme.split(":")[0];
        let mFilme = horarioFilme.split(":")[1];

        let hSessao = new Date().setHours(hFilme, mFilme);

        this.falta15min = (hSessao - horaAtual) / (1000 * 60);

        if (horaAtual > hSessao) {
          return false;
        }

        if (horaAtual < hSessao) {
          return true;
        }
      },
    },
    mounted() {
      setInterval(() => {
        this.atualizar = Math.random();
      }, 60000);
    },
  };
</script>

<style scoped>
  .row-container {
    border: 0.5px solid black;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    height: 75px;
  }

  .movie-title,
  .icon-class,
  .movie-type {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .movie-title {
    font-size: 1.3rem;
    background: #212325;
    color: white;
    width: 320px;
    padding-inline: 20px;
    justify-content: start !important;
  }

  .icon-class {
    background: #363738;
    width: 50px;
    padding: 0 15px;
  }

  .icon-class img {
    width: 100%;
    filter: drop-shadow(2px 4px 2px rgb(0, 0, 0));
  }

  .movie-type {
    background: #5c5c55;
    width: 70px;
    color: #9b9a9a;
    font-size: 2.7rem;
    font-weight: 800;
    padding: 0 10px;
    text-shadow: 1px 1px 5px #252525;
  }

  .movie-times {
    display: flex;
    height: 100%;
    padding: 0;
  }

  .movie-times li {
    border: 0.1px groove #7c7d7e;
    background: #adaeaf;
    width: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 4px 20px;
    color: #343638;
  }

  .movie-time {
    line-height: 2rem;
    font-size: 2.3rem;
    font-weight: 700;
  }

  .movie-language {
    border-top: 2.5px solid #494949da;
    background: #a5a5a6;
    font-size: 1.3rem;
    line-height: 1rem;
    padding: 0 15px;
    border-radius: 12px;
    font-weight: 700;
  }

  .last15min {
    background: rgb(21, 226, 14) !important;
  }

  .last15min .movie-language {
    background: #c9f7aa;
  }
</style>
