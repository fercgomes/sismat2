// assets
import { IconFlask, IconHistory, IconKey, IconUser } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconUser,
    IconHistory,
    IconFlask
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const student = {
    id: 'pages',
    title: 'Aluno',
    type: 'group',
    children: [
        // {
        //     id: 'authentication',
        //     title: 'Authentication',
        //     type: 'collapse',
        //     icon: icons.IconKey,
        //     children: [
        //         {
        //             id: 'login3',
        //             title: 'Login',
        //             type: 'item',
        //             url: '/pages/login/login3',
        //             target: true
        //         },
        //         {
        //             id: 'register3',
        //             title: 'Register',
        //             type: 'item',
        //             url: '/pages/register/register3',
        //             target: true
        //         }
        //     ]
        // }
        {
            id: 'personal-info',
            title: 'Informações Pessoais',
            type: 'item',
            url: '/personal-info',
            icon: icons.IconUser,
            breadcrumbs: true
        },
        {
            id: 'course-history',
            title: 'Histórico do Curso',
            type: 'item',
            url: '/course-history',
            icon: icons.IconHistory,
            breadcrumbs: false
        },
        {
            id: 'enrollment',
            title: 'Encomenda de Matrícula',
            type: 'item',
            url: '/enrollment',
            icon: icons.IconFlask,
            breadcrumbs: false
        }
    ]
};

export default student;
