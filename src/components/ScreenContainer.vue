<template>
  <div class="screen-container">
    <ListRow
      v-for="(filme, index) in formatSession[0]"
      :key="index"
      :titulo="filme.name"
      :class-indicativa="filme.info.classificacao"
      :tipo="labelTipo(filme.info.tipo)"
      v-if="atualizar"
      v-show="sessaoDisponivel(filme.horarios)"
    >
 
      <TimeSession
        v-for="horario in filme.horarios"
        :key="horario"
        :horario="horario"
        :idioma="labelIdioma(filme.info.idioma)"
      />
    </ListRow>
  </div>
</template>
<script>
  import text from "./../data-movie/GRADE_DESTAQUE_688.txt";

  import ListRow from "./ListRow.vue";
  import TimeSession from "./TimeSession.vue";

  import temHorario from "../helpers/index";

  export default {
    name: "Screen",
    components: {
      ListRow,
      TimeSession,
    },
    data() {
      return {
        horaAtualizada: new Date(),
        allSession: [],
        formatSession: [],
        atualizar: true
      };
    },
    methods: {
      async get() {
        await fetch(text)
          .then((response) => response.text())
          .then((data) => {
            let movies = data.split("\n");
            movies.forEach((movie) => {
              const info = movie.substring(58).split(";");
              const infoFormat = info[0].trim().split(" ");
              const infoFilter = infoFormat.filter((item) => {
                return item.length > 0;
              });

              const informacoes = () => {
                return [infoFilter].map((valor) => {
                  return {
                    age: valor[0],
                    idioma: valor[2].substring(0, 5).split("")[0],
                    tipo: valor[4],
                  };
                });
              };

              this.allSession.push({
                name: movie.substring(15, 40).trim(),
                hour: movie.substring(10, 15).trim(),
                info: informacoes()[0],
              });
            });

            let formatMovies = [];
            let mapMovies = new Map();

            this.allSession.forEach((filme) => {
              const chave = `${filme.name}-${filme.info.idioma}-${filme.info.tipo}`;

              if (mapMovies.has(chave)) {
                const filmeExistente = mapMovies.get(chave);
                filmeExistente.horarios.push(filme.hour.replace("h", ":"));
              } else {
                const novoFilme = {
                  name: filme.name,
                  info: {
                    classificacao: filme.info.age,
                    idioma: filme.info.idioma,
                    tipo: filme.info.tipo,
                  },
                  horarios: [filme.hour.replace("h", ":")],
                };
                mapMovies.set(chave, novoFilme);
                formatMovies.push(novoFilme);
              }
            });
            this.formatSession.push(formatMovies);
          });
      },
      labelIdioma(sigla) {
        switch (sigla) {
          case "D":
            return "dub";
          case "L":
            return "leg";
          case "V":
            return "org";
          case "S":
            return "sd";
        }
      },
      labelTipo(tipo) {
        switch (tipo) {
          case "NO":
            return "2d";
          case "XD":
            return "xd";
          case "3D":
            return "3d";
          case "X3":
            return "xd 3d";
        }
      },
      sessaoDisponivel(horarios) {
        return temHorario(horarios);
      },
    },
    watch: {},
    mounted() {
      this.get();
      setInterval(() => { 
      this.atualizar = Math.random();
      }, 60000);
    
    },
  };
</script>

<style scoped>
  .screen-container {
    max-width: 1400px;
    min-width: 950px;
    background: #adaeaf;
  }
</style>
