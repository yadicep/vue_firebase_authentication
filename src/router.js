import { createRouter, createWebHistory } from 'vue-router';
import { auth, onAuthStateChanged } from './firebase'; // Importa Firebase auth y onAuthStateChanged
import SignUp from './views/SignUp.vue';
import Login from './views/Login.vue';
import Home from './views/Home.vue';

const routes = [
   {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      meta: { requiresAuth: false } // Define que esta ruta no requiere autenticación
   },
   {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false } // Define que esta ruta no requiere autenticación
   },
   {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true } // La vista Home requiere autenticación
   },
   {
      path: '/',
      redirect: '/home' // Redirige a home por defecto
   }
];

// Crea una instancia del enrutador, que manejará la navegación de la aplicación
const router = createRouter({
   // Define cómo se gestionará el historial de navegación, usando HTML5 para URLs "limpias" sin #
   history: createWebHistory(),
   // Lista de rutas que define los componentes a cargar según la URL
   routes,
});


// Función para verificar la autenticación del usuario
const getCurrentUser = () => {
   return new Promise((resolve, reject) => {
      // Escucha el estado de autenticación del usuario
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         unsubscribe(); // Deja de escuchar los cambios de autenticación después de obtener el usuario
         resolve(user); // Resuelve la promesa con el usuario autenticado (o null si no hay usuario)
      }, reject); // Rechaza la promesa si ocurre un error
   });
};

// Guardianes de ruta con onAuthStateChanged
router.beforeEach(async (to, from, next) => {
   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

   if (requiresAuth) {
      try {
         const user = await getCurrentUser(); // Verifica si el usuario está autenticado
         if (user) {
         next(); // El usuario está autenticado, permite el acceso
         } else {
         next('/signup'); // El usuario no está autenticado, redirige a SignUp
         }
      } catch (error) {
         console.error("Error al verificar la autenticación:", error);
         next('/signup'); // En caso de error, redirige a SignUp
      }
   } else {
      next(); // La ruta no requiere autenticación, permite el acceso
   }
});

export default router;