import {
    Card,
    CardContent,
    createStyles,
    Divider,
    makeStyles,
    Typography,
} from '@material-ui/core';
import React from 'react';

type PageWrapperProps = {
    children?: React.ReactNode;
    title: string;
};

const useStyles = makeStyles(() =>
    createStyles({
        divider: {
            margin: '20px 10px',
        },
    }),
);

const PageWrapper: React.FC<PageWrapperProps> = ({ title, children }: PageWrapperProps) => {
    const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <Typography variant="h4">{title}</Typography>
                <Divider className={classes.divider} />
                {children}
            </CardContent>
        </Card>
    );
};

export default PageWrapper;
