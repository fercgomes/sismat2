// assets
import { IconPalette, IconShadow, IconTypography, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const teaching = {
    id: 'teaching',
    title: 'Ensino',
    type: 'group',
    children: [
        {
            id: 'sav',
            title: 'Sala de Aula Virtual',
            type: 'item',
            url: '/teaching/sav',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'moodle',
            title: 'Moodle UFRGS',
            type: 'item',
            url: '/teaching/moodle',
            icon: icons.IconPalette,
            breadcrumbs: false
        }
        // {
        //     id: 'util-shadow',
        //     title: 'Shadow',
        //     type: 'item',
        //     url: '/utils/util-shadow',
        //     icon: icons.IconShadow,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'icons',
        //     title: 'Icons',
        //     type: 'collapse',
        //     icon: icons.IconWindmill,
        //     children: [
        //         {
        //             id: 'tabler-icons',
        //             title: 'Tabler Icons',
        //             type: 'item',
        //             url: '/icons/tabler-icons',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'material-icons',
        //             title: 'Material Icons',
        //             type: 'item',
        //             url: '/icons/material-icons',
        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};

export default teaching;
