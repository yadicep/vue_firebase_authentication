<template>
   <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="col-12 col-md-6 col-lg-4 p-4 bg-light rounded shadow">
         <h2 class="text-center">Iniciar Sesión</h2><br>
         <form @submit.prevent="loginUser">
            <div class="mb-3 text-start">
               <label for="email" class="form-label">Correo Electrónico</label>
               <input v-model="email" type="email" class="form-control" id="email" required>
            </div>
            <div class="mb-3 text-start">
               <label for="password" class="form-label">Contraseña</label>
               <input v-model="password" type="password" class="form-control" id="password" required>
            </div><br>
            <button type="submit" class="btn btn-dark w-100">Iniciar Sesión</button>
         </form>
         <p class="text-center mt-3">¿No tienes una cuenta? <router-link to="/signup">Regístrate</router-link></p>
      </div>
   </div>
</template>
 
<script setup>
   import { ref } from 'vue';
   import { useRouter } from 'vue-router';
   import { auth, signInWithEmailAndPassword } from '../firebase'; // Importa el método para iniciar sesión desde Firebase
   
   const email = ref('');
   const password = ref('');
   const router = useRouter();
   
   const loginUser = async () => {
      try {
         await signInWithEmailAndPassword(auth, email.value, password.value); // Inicia sesión con Firebase
         router.push('/home'); // Redirige a Home después de iniciar sesión
      } catch (error) {
         console.error('Error al iniciar sesión:', error.message);
         alert('Error al iniciar sesión: ' + error.message); // Muestra el error en una alerta
      }
   };
</script> 