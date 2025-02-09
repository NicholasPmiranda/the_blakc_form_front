import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            component: () => import('../layouts/OpenLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'login',
                    component: () => import('../views/login/Login.vue'),
                },
            ]
        },
        {
            path: '/cadastro',
            component: () => import('../layouts/OpenLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'cadastr',
                    component: () => import('../views/login/Cadastro.vue'),
                },
            ]
        },
        {
            path: '/esqueci-minha-senha',
            component: () => import('../layouts/OpenLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'EsqueciMinhaSenha',
                    component: () => import('../views/login/EsqueciMinhaSenha.vue'),
                },
            ]
        },
        {
            path: '/recupear-senha/:token',
            component: () => import('../layouts/OpenLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'cadastr',
                    component: () => import('../views/login/RecuperarMinhaSenha.vue'),
                },
            ]
        },
        {
            path: '/questionario',
            component: () => import('../layouts/OpenLayout.vue'),
            children: [
                {
                    path: ':id',
                    name: 'questionario',
                    component: () => import('../views/Questionario/Questionario.vue'),
                },
                {
                    path: ':id/concluido',
                    name: 'questionarioConcluido',
                    component: () => import('../views/Questionario/QuestionarioConcluido.vue'),
                }
            ]
        },



        {
            path: '',
            name: '',
            component: () => import('../layouts/AppLayout.vue'),
            children: [
                {
                    path: 'assinatura',
                    name: 'assinatura',
                    component: () => import('../views/Perfil/Assinatura.vue'),
                },

                {
                    path: '',
                    name: 'home',
                    component: () => import('../views/home/ListForms.vue'),
                },
                {
                    path: '/perfil',
                    name: 'perfil',
                    component: () => import('../views/Perfil/Perfil.vue'),
                },

            ]
        },
        {
            path: '/edit-form/:id',
            name: '',
            component: () => import('../layouts/EditorLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'edit-frm',
                    component: () => import('../views/form/EditForm.vue'),
                },

            ]
        },

        {
            path: '/:catchAll(.*)', // Captura qualquer caminho não definido
            name: 'NotFound',
            component: () => import('../views/NotFound.vue'),

        }



    ],
})

export default router
