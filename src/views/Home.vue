<template>
   <!-- Navbar -->
   <nav class="navbar navbar-expand-lg navbar-light bg-dark mb-4">
      <div class="container">
         <a class="navbar-brand text-white px-3" href="#">🔒 Mi App Autenticada</a>
         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto px-3">
               <li class="nav-item"><router-link to="/home" class="nav-link text-white" :class="{ active: isHomeActive }">Home</router-link></li>
               <li class="nav-item"><router-link to="/login" class="nav-link text-white" :class="{ active: isLoginActive }">Login</router-link></li>
            </ul>
         </div>
      </div>
   </nav>
   <!-- Contenido de Home -->
   <div class="container text-center p-4 rounded">
      <h2 class="mb-5">Bienvenido al Home</h2><br>
      <img src="../assets/img/fondo.png" class="mb-5 img-fluid"><br>
      <button @click="logout" class="btn btn-dark mt-5">Cerrar Sesión</button>
   </div>
   <!-- Footer -->
   <footer class="my-1 bg-light pt-3 pb-1">
      <p class="text-center">© 2024 Mi App. Todos los derechos reservados.</p>
   </footer>
</template>
 
<script setup>
   import { auth } from '../firebase';
   import { computed } from 'vue';
   import { useRouter, useRoute } from 'vue-router';
   
   const router = useRouter();
   const route = useRoute();
   
   const isHomeActive = computed(() => route.path === '/home'); // Computed property para verificar la ruta actual
   const isLoginActive = computed(() => route.path === '/login'); // Computed property para verificar la ruta actual
   
   const logout = async () => {
      await auth.signOut(); // Cierra la sesión del usuario
      router.push('/login'); // Redirige a Login después de cerrar sesión
   };
</script>