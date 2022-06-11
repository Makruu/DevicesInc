import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Controls from './controls/Controls';

const useStyles = theme => ({
    formi: {
        flexGrow: 1,
        maxWidth: 600
    },
    nappi: {
        margin: theme.spacing(1)
    }
});

class DeviceForm extends Component {

    constructor() {
        super();
        this.state = {
            id: '',
            devicename: '',
            description: '',
            category: '',
            user: '',
            location: '',
            messages: [],
            categories: [],
            users: [],
            locations: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, index, value) {
        console.log(event)
        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {
        this.fetchCategories()
        this.fetchLocations()
        this.fetchUsers()
    }

    //hakee kategoriat
    async fetchCategories() {
        //this.setState({ devices: [] })

        try {
            let res = await fetch('/api/category', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            let result = await res.json();

            //tarkistetaan onko käyttäjä kirjautunut
            if (result[0].loggedin) {
                this.setState({ categories: result[1] })
            } else {
                this.props.history.push('/login')
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    //hakee käyttäjät
    async fetchUsers() {
        //this.setState({ devices: [] })

        try {
            let res = await fetch('/api/user', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            let result = await res.json();

            //tarkistetaan onko käyttäjä kirjautunut
            if (result[0].loggedin) {
                this.setState({ users: result[1] })
            } else {
                this.props.history.push('/login')
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    //hakee sijainnit
    async fetchLocations() {
        //this.setState({ devices: [] })

        try {
            let res = await fetch('/api/location', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            let result = await res.json();

            //tarkistetaan onko käyttäjä kirjautunut
            if (result[0].loggedin) {
                this.setState({ locations: result[1] })
            } else {
                this.props.history.push('/login')
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    setInputValue(property, val) {
        this.setState({
            [property]: val
        })
    }

    //Lähettää laitteen lisäyksen apiin
    async doAddDevice() {
        this.setState({ messages: [] })

        try {
            let res = await fetch('/api/device', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.devicename,
                    description: this.state.description,
                    categoryid: this.state.category,
                    userid: this.state.user,
                    locationid: this.state.location,
                    count: this.state.count
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
        const { classes } = this.props;

        return (
            <form className={classes.formi}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Controls.Input fullWidth
                            name="user"
                            label="Käyttäjä"
                            value={this.state.devicename ? this.state.devicename : ''}
                            onChange={(val) => this.setInputValue('user', val)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controls.Input fullWidth
                            name="device"
                            label="Laite"
                            value={this.state.description ? this.state.description : ''}
                            onChange={(val) => this.setInputValue('device', val)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controls.Input fullWidth
                            name="starttime"
                            label="Alkupäivä"
                            value={this.state.description ? this.state.description : ''}
                            onChange={(val) => this.setInputValue('starttime', val)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controls.Input fullWidth
                            name="endtime"
                            label="Palautuspäivä"
                            value={this.state.description ? this.state.description : ''}
                            onChange={(val) => this.setInputValue('endtime', val)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Controls.Button className={classes.nappi} fullWidth
                            type="submit"
                            text="Varaa"
                            onClick={() => this.doAddDevice()}
                        />
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default withStyles(useStyles)(DeviceForm);