<template>
<div>

  <div>
    <img src="icon-left-font.png" alt="logo_groupomania" id="logo_groupomania">
  </div>

  <div id="nav">
    <router-link to="/new-post">Mon post</router-link>
    <router-link to="/feed"> Feed </router-link> 
    <router-link to="/">Connexion</router-link> 
    <router-link to="/profile">Profile</router-link> 

  </div>
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

#logo_groupomania{
  width: 18%;
  position: absolute;
  top : -45px;
  left: 27%;
  z-index: -100;
}

#nav {
  padding: 1rem 0.5rem 1rem 0;
  text-align: right;
  
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 0 0.5rem 0 0;
  
}

#nav a.router-link-exact-active {
  color: #fd2d01;
}

#router-view{
  margin: 6.5rem 0
}


</style>
