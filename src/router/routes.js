const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'usuarios', component: () => import('src/components/auth/ListaUsuarios.vue') },
      { path: 'login', component: () => import('src/components/auth/LoginForm.vue') }
    ]
  },

  {
    path: '/login',
    component: () => import('src/components/auth/LoginForm.vue'),
  },


  {
    path: '/usuarios',
    component: () => import('src/components/auth/ListaUsuarios.vue'),
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
