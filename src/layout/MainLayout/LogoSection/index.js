// material-ui
import { ButtonBase } from '@mui/material';
// project imports
import config from 'config';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/ufrgs/ufrgs-logo-1.webp';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        {/* <Logo /> */}
        <img src={logo} style={{ width: 50 }} alt="Ufrgs Logo" />
    </ButtonBase>
);

export default LogoSection;
