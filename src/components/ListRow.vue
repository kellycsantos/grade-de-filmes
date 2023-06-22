<template>
  <div class="row-container">
    <h1 class="movie-title">{{ titulo }}</h1>
    <span class="icon-class"
      ><img :src="iconClassIndicativa[classIndicativa]"
    /></span>
    <span class="movie-type" :class="tipo == 'xd' ? 'xType': ''">{{ tipo }}</span>    
    <slot></slot>   
  </div>
</template>
<script>
  import livre from "../assets/icons-ci/livre.png";
  import ci10 from "../assets/icons-ci/10.png";
  import ci12 from "../assets/icons-ci/12.png";
  import ci14 from "../assets/icons-ci/14.png";
  import ci16 from "../assets/icons-ci/16.png";
  import ci18 from "../assets/icons-ci/18.png";
  export default {
    name: "ListRow",
    props: {
      titulo: String,
      classIndicativa: String,
      tipo: String,
    },
    data() {
      return {
        iconClassIndicativa: {
          0: livre,
          10: ci10,
          12: ci12,
          14: ci14,
          16: ci16,
          18: ci18,
        },
      };
    },
   
    mounted(){
      
    }
  };
</script>

<style scoped>
  .row-container {
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
    border-block: 1px solid #6e7172;
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

  .movie-type.xType{
    color: #e4e4e4;
    text-shadow: 0px 5px 10px #f8f8f89c;    
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

</style>
