import React, { Component } from 'react'
import Controls from './controls/Controls';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        flexGrow: 1,
    }

});

export class AddUserForm extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            phone: '',
            username: '',
            password: '',
            type: '',
            messages: []
        }
        this.handleChange = this.handleChange.bind(this)
    }

    setInputValue(property, val) {
        this.setState({
            [property]: val
        })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    async addUser() {
        
        this.setState({ messages: [] })

        try {
            let res = await fetch('/api/user', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    phone: this.state.phone,
                    username: this.state.username,
                    password: this.state.password,
                    type: this.state.type
                })
            });

            let result = await res.json();

            this.setState({ messages: result })
        }
        catch (e) {
            console.log(e);
        }
    }

    render() {
        const classes = this.props;

        return (
            <div className={classes.root}>
                <h2>Lisää käyttäjä</h2>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={4}>
                        <Controls.Input fullWidth
                            name="name"
                            label="Nimi"
                            value={this.state.name ? this.state.name : ''}
                            onChange={(val) => this.setInputValue('name', val)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Controls.Input fullWidth
                            name="phone"
                            label="Puhelinnumero"
                            value={this.state.phone ? this.state.phone : ''}
                            onChange={(val) => this.setInputValue('phone', val)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Controls.Input fullWidth
                            name="username"
                            label="Käyttäjätunnus"
                            value={this.state.username ? this.state.username : ''}
                            onChange={(val) => this.setInputValue('username', val)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Controls.Input fullWidth
                            name="password"
                            type="password"
                            label="Salasana"
                            value={this.state.password ? this.state.password : ''}
                            onChange={(val) => this.setInputValue('password', val)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel>Tyyppi</InputLabel>
                            <Select
                                name ='type'
                                value={this.state.value}
                                onChange={this.handleChange}
                            >
                                <MenuItem value={1}>Pääkäyttäjä</MenuItem>
                                <MenuItem value={2}>Asiakas</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Controls.Button className={classes.nappi} fullWidth
                            type="submit"
                            text="Lisää"
                            onClick={() => this.addUser()}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(useStyles)(AddUserForm);