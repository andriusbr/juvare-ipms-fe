import React from 'react';
import { AppBar, createStyles, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Routes } from '../../../constant/Routes';
import { JWTService } from '../../../service/JWTService';

interface INavBar {
    authenticated?: boolean;
}

const useStyles = makeStyles(() =>
    createStyles({
        rightToolbar: {
            marginLeft: 'auto',
            marginRight: -12,
        },
        navBarLink: {
            color: 'inherit',
            marginRight: 10,
            textDecoration: 'none',
        },
        navBarMainLink: {
            marginRight: 20,
        },
        navLinkIcon: {
            verticalAlign: 'middle',
            marginRight: 5,
        },
    }),
);

const NavBar: React.FC<INavBar> = ({ authenticated }) => {
    const classes = useStyles();

    const logout = () => {
        JWTService.clearAccessToken();
    };

    return (
        <AppBar color="primary" position="static">
            <Toolbar>
                <Typography className={classes.navBarMainLink} variant="h6">
                    <NavLink className={classes.navBarLink} to={Routes.INCIDENTS}>
                        IPMS
                    </NavLink>
                </Typography>

                {authenticated && (
                    <NavLink className={classes.navBarLink} to={Routes.INCIDENTS}>
                        Incidents
                    </NavLink>
                )}

                <section className={classes.rightToolbar}>
                    {!authenticated ? (
                        <NavLink className={classes.navBarLink} to={Routes.LOGIN}>
                            <ExitToAppIcon className={classes.navLinkIcon} />
                            Login
                        </NavLink>
                    ) : (
                        <NavLink className={classes.navBarLink} to={Routes.LOGIN} onClick={logout}>
                            <ExitIcon className={classes.navLinkIcon} />
                            Logout
                        </NavLink>
                    )}
                </section>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
