import React from 'react'
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

export default function Input(props) {

    const { name, label, value, error = null, onChange, ...other } = props;
    const classes = useStyles();

    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            {...other}
            {...(error && { error: true, helperText: error })}
            classes={{ root: classes.root, label: classes.label }}
        />
    )
}
