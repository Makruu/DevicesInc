import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, makeStyles, withStyles } from '@material-ui/core';
import { DataGrid, ColDef, CellParams, GridApi } from '@material-ui/data-grid';
import Controls from './controls/Controls';
import AddUserForm from './AddUserForm'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/DeleteForeverSharp';
import EditIcon from '@material-ui/icons/EditSharp';
import IconButton from '@material-ui/core/IconButton';

const useStyles = theme => ({
    searchInput: {
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
});

class Users extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            openPopup: false
        }
    }

    componentDidMount() {
        this.fetchUsers()
    }

    //lähettää laitehaun apiin
    async fetchUsers() {

        try {
            let res = await fetch('/api/user', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }/*,
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })*/
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
    render() {
        const { classes } = this.props;
        
        const columns: ColDef = [
            { field: 'name', headerName: 'Nimi', width: 200 },
            { field: 'user', headerName: 'Käyttäjänimi', sortable: false, width: 150 },
            { field: 'phone', headerName: 'Puhelinnumero', width: 150 },
            { field: 'typeText', headerName: 'Tyyppi', width: 150 },
            {
                field: "", headerName: "", sortable: false, width: 100, disableClickEventBubbling: true,
                renderCell: (params: CellParams) => {
                    //Muokkaa-napin toiminto
                    const onClickEdit = () => {
                        const api: GridApi = params.api;
                        const fields = api.getAllColumns().map((c) => c.field).filter((c) => c !== "__check__" && !!c);
                        const thisRow = {};

                        fields.forEach((f) => {
                            thisRow[f] = params.getValue(f);
                        });

                        return alert(JSON.stringify(thisRow, null, 4));
                    };
                    //Poista-napin toiminto
                    const onClickDelete = () => {
                        const delId = params.getValue("id");
                        const delUser = params.getValue('user')

                        var varma = window.confirm('Haluatko poistaa käyttäjän ' + delUser + '?');

                        if (varma) {
                            if (delId && delId != null) {
                                try {
                                    let result = fetch('/api/user', {
                                        method: 'delete',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            userid: delId
                                        })
                                    }).then(res => this.fetchUsers());
                                }
                                catch (e) {
                                    console.log(e);
                                }
                            }
                        }

                    };

                    return <><IconButton color="primary" onClick={onClickEdit}><EditIcon /></IconButton>
                        <IconButton color="secondary" onClick={onClickDelete}><DeleteIcon /></IconButton></>;
                }
            }
        ];

        return (
            <>
                <div style={{ height: "70vh", width: '100%' }}>
                    <h1>Käyttäjät</h1>
                    <Controls.Input
                        label="Etsi"
                        className={classes.searchInput}
                        InputProps={{
                            /*startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)*/
                        }}
                        onChange={() => console.log()}
                    />
                    <Controls.Button
                        text="Lisää uusi"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => this.setState({ openPopup: true })}
                    />
                    <br/>
                    <DataGrid
                        rows={this.state.users}
                        columns={columns}
                        pagination
                        pageSize={10}
                        rowsPerPageOptions={[10, 25, 100]} />
                </div>
                <Controls.Popup
                    title='Lisää käyttäjä'
                    openPopup={this.state.openPopup}
                    onClick={() => this.setState({ openPopup: false })}
                >
                    <AddUserForm />
                </Controls.Popup>
            </>
        );
    }

}

export default withStyles(useStyles)(Users);