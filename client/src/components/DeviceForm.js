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
            devicename: '',
            description: '',
            category: '',
            user: '',
            location: '',
            count: '',
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
        /*if (!this.state.name) {
            return;
        }
        if (!this.state.phone) {
            return;
        }
        if (!this.state.username) {
            return;
        }
        if (!this.state.password) {
            return;
        }*/

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
                            name="devicename"
                            label="Nimi"
                            value={this.state.devicename ? this.state.devicename : ''}
                            onChange={(val) => this.setInputValue('devicename', val)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controls.Input fullWidth
                            name="description"
                            label="Kuvaus"
                            value={this.state.description ? this.state.description : ''}
                            onChange={(val) => this.setInputValue('description', val)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Controls.Select fullWidth
                            name="category"
                            label="Kategoria"
                            value={this.state.category ? this.state.category : ''}
                            onChange={this.handleChange}
                            options={this.state.categories}
                        //error={errors.selectId}
                        />
                        {/*<Controls.Input fullWidth
                            name="category"
                            label="Kategoria"
                            value={this.state.category ? this.state.category : ''}
                            onChange={(val) => this.setInputValue('category', val)}
                        />*/}

                    </Grid>
                    <Grid item xs={4}>
                        <Controls.Select fullWidth
                            name="user"
                            label="Vastuuhenkilö"
                            value={this.state.user ? this.state.user : ''}
                            onChange={this.handleChange}
                            options={this.state.users}
                        //error={errors.selectId}
                        />
                        {/* <Controls.Input fullWidth
                            name="user"
                            label="Vastuuhenkilö"
                            value={this.state.user ? this.state.user : ''}
                            onChange={(val) => this.setInputValue('user', val)}
                        /> */}
                    </Grid>
                    <Grid item xs={4}>
                        <Controls.Select fullWidth
                            name="location"
                            label="Sijainti"
                            value={this.state.location ? this.state.location : ''}
                            onChange={this.handleChange}
                            options={this.state.locations}
                        //error={errors.selectId}
                        />
                        {/* <Controls.Input fullWidth
                            name="location"
                            label="Sijainti"
                            value={this.state.location ? this.state.location : ''}
                            onChange={(val) => this.setInputValue('location', val)}
                        /> */}
                    </Grid>
                    <Grid item xs={3}>
                        <Controls.Button className={classes.nappi} fullWidth
                            type="submit"
                            text="Lisää"
                            onClick={() => this.doAddDevice()}
                        />
                    </Grid>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={4}>
                        <Controls.Input fullWidth
                            name="count"
                            label="Määrä"
                            type="number"
                            InputProps={{
                                inputProps: {
                                    max: 100, min: 1
                                }
                            }}
                            value={this.state.count ? this.state.count : ''}
                            onChange={(val) => this.setInputValue('count', val)}
                        />
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default withStyles(useStyles)(DeviceForm);