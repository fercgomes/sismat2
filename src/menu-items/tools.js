// assets
import { IconDeviceDesktop, IconDeviceFloppy, IconPalette, IconShadow, IconTypography, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconDeviceFloppy,
    IconDeviceDesktop
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const tools = {
    id: 'tools',
    title: 'Ferramentas',
    type: 'group',
    children: [
        {
            id: 'drive',
            title: 'Drive',
            type: 'item',
            url: '/tools/drive',
            icon: icons.IconDeviceFloppy,
            breadcrumbs: false
        },
        {
            id: 'proxy',
            title: 'Proxy',
            type: 'item',
            url: '/teaching/proxy',
            icon: icons.IconDeviceDesktop,
            breadcrumbs: false
        }
    ]
};

export default tools;
