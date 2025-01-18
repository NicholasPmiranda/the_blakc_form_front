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
                }
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
                }
            ]
        },


        {
            path: '',
            name: '',
            component: () => import('../layouts/AppLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('../views/home/ListForms.vue'),
                },
                {
                    path: '/edit-form/:id',
                    name: 'edit-frm',
                    component: () => import('../views/form/EditForm.vue'),
                },

            ]
        },

    ],
})

export default router
