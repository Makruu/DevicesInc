import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Controls from './controls/Controls';

const useStyles = theme => ({
    loginform: {
        textAlign: 'center',
        flexWrap: 'wrap',
        width: '300px',
        margin: '0 auto',
        fontFamily: 'Tahoma, Geneva, sans-serif'
    },
    nappi: {
        margin: theme.spacing(1)
    }
});

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            messages: []
        }
    }

    setInputValue(property, val) {
        this.setState({
            [property]: val
        })
    }

    //lähettää kirjautumisen apiin
    async doLogin() {
        this.setState({ messages: [] })

        try {
            let res = await fetch('/api/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });

            let result = await res.json();

            if (result[0].success) {
                this.props.history.push('/devices')
            } else {
                this.setState({ messages: result })
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.loginform}>
                <h1>Kirjaudu sisään</h1>
                <p>Käyttäjä: testi<br></br>
                Salasana: 123456<br></br></p>
                <Grid>
                    <Controls.Input fullWidth
                        name="username"
                        label="Käyttäjätunnus"
                        value={this.state.username ? this.state.username : ''}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                // ev.preventDefault();
                                this.doLogin();
                            }
                        }}
                        onChange={(val) => this.setInputValue('username', val)}
                    //error={errors.fullName}
                    />
                    <Controls.Input fullWidth
                        name="password"
                        type="password"
                        label="Salasana"
                        value={this.state.password ? this.state.password : ''}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                // ev.preventDefault();
                                this.doLogin();
                            }
                        }}
                        onChange={(val) => this.setInputValue('password', val)}
                    //error={errors.fullName}
                    />
                    <Controls.Button fullWidth
                        type="submit"
                        text="Kirjaudu"
                        onClick={() => this.doLogin()}
                    />
                    {/*
                        <Controls.Button
                            type="submit"
                            text="Rekisteröidy"
                            variant="outlined"
                            onClick={() => this.props.history.push('/register')}
                        />*/}
                    {/*Poistin rekisteröitymisen, koska lisää henkilö -toiminto luotu. -Tapio */}
                </Grid>
                {this.state.messages.map(message =>
                    <p key={message.msg}>{message.msg}</p>
                )}
            </div>
        );
    }
}

export default withStyles(useStyles)(Login);
