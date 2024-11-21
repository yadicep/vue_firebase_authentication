<template>
   <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="col-12 col-md-6 col-lg-4 p-4 bg-light rounded shadow">
         <h2 class="text-center">Registro de Usuario</h2><br>
         <form @submit.prevent="registerUser">
            <div class="mb-3 text-start">
               <label for="email" class="form-label">Correo Electrónico</label>
               <input v-model="email" type="email" class="form-control" id="email" required>
            </div>
            <div class="mb-3 text-start">
               <label for="password" class="form-label">Contraseña</label>
               <input v-model="password" type="password" class="form-control" id="password" required>
            </div><br>
            <button type="submit" class="btn btn-dark w-100">Registrarse</button>
         </form>
         <p class="text-center mt-3">¿Ya tienes una cuenta? <router-link to="/login">Inicia Sesión</router-link></p>
      </div>
      <!-- Modal de confirmación de registro -->
      <div v-if="showModal" class="modal-overlay">
         <div class="modal-content">
            <h4>¡Registro Exitoso!</h4>
            <p>Tu cuenta ha sido creada correctamente.</p>
            <button @click="confirmRegistration" class="btn btn-dark mt-3">Aceptar</button>
         </div>
      </div>
   </div>
</template>

<script setup>
   import { ref } from 'vue';
   import { useRouter } from 'vue-router';
   import { auth, createUserWithEmailAndPassword } from '../firebase';
   
   const email = ref('');
   const password = ref('');
   const router = useRouter();
   const showModal = ref(false); // Controla la visualización del modal

   const registerUser = async () => {
      try {
         await createUserWithEmailAndPassword(auth, email.value, password.value);
         showModal.value = true; // Muestra el modal después del registro exitoso
      } catch (error) {
         console.error('Error registrando usuario:', error.message);
         alert('Error al registrar el usuario: ' + error.message);
      }
   };

   const confirmRegistration = () => {
      showModal.value = false; // Oculta el modal
      router.push('/home'); // Redirige a Home después de cerrar el modal
   };
</script>

<style scoped>
   .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
   }

   .modal-content {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      width: 300px;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
   }
</style>