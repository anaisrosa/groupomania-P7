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
  margin: 0 30%;
}

#router-view{
  margin: 6.5rem 0
}

</style>
