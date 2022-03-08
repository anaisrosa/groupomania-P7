<template>

<div>
  <router-view :key="$route.path" id="router-view"></router-view>
</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  margin:0 auto;
  padding: 0 30%
}

#router-view{
  margin: 6.5rem 0
}
  /* @media only screen
  and (max-width: 671px)
  and (max-width: 1024px)
  {
  #app {
  padding: 0 3rem;
  margin: 0;
  }
  } */

@media all and (max-width: 670px){
#app {
padding: 0 2rem;
}

#router-view{
  margin:4rem 0;
}
}



</style>
