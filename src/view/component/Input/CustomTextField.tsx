import { createStyles, makeStyles, TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        input: {
            width: '100%',
        },
    }),
);

const CustomTextField: React.FC<TextFieldProps> = ({ ...rest }: TextFieldProps) => {
    const classes = useStyles();

    return <TextField InputLabelProps={{ shrink: true }} className={classes.input} {...rest} />;
};

export default CustomTextField;
