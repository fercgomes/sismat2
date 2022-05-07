// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'help',
            title: 'Preciso de Ajuda',
            type: 'item',
            url: '/',
            icon: icons.IconHelp,
            external: true,
            target: true
        }
    ]
};

export default other;
