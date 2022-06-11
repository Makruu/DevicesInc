import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import { DataGrid, ColDef, CellParams, GridApi } from '@material-ui/data-grid';
import Controls from './controls/Controls';
import DeviceForm from "./DeviceForm";
import ReservationForm from './ReservationForm';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/SearchSharp';
import DeleteIcon from '@material-ui/icons/DeleteForeverSharp';
import EditIcon from '@material-ui/icons/EditSharp';
import EventNoteSharpIcon from '@material-ui/icons/EventNoteSharp';

const useStyles = theme => ({
    searchInput: {
    },
    newButton: {
        maxWidth: 150
        // position: 'absolute',
        // right: '10px'
    },
    searchButton: {
        maxWidth: 100
        // position: 'absolute',
        // right: '10px'
    }
});

class Devices extends Component {

    constructor() {
        super();
        this.state = {
            devices: [],
            searchstr: '',
            openPopup: false,
            openPopup2: false
        }
    }

    componentDidMount() {
        this.fetchDevices()
    }

    //lähettää laitehaun apiin
    async fetchDevices() {
        //this.setState({ devices: [] })

        try {
            let res = await fetch('/api/device', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: "get",
                    format: "grid",
                    search: this.state.searchstr
                })
            });

            let result = await res.json();

            //tarkistetaan onko käyttäjä kirjautunut
            if (result[0].loggedin) {
                this.setState({ devices: result[1] })
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

        //Määritellään sarakkeet datagridiin
        const columns: ColDef[] = [
            { field: 'id', headerName: 'ID', type: "number", width: 70 },
            { field: 'name', headerName: 'Nimi', width: 200 },
            { field: 'description', headerName: 'Kuvaus', sortable: false, width: 250 },
            { field: 'category', headerName: 'Kategoria', width: 120 },
            { field: 'user', headerName: 'Vastuuhenkilö', width: 150 },
            { field: 'site', headerName: 'Alue', width: 150 },
            { field: 'location', headerName: 'Hylly', width: 150 },
            {
                field: "", headerName: "Varaa", sortable: false, width: 70, disableClickEventBubbling: true,
                renderCell: (params: CellParams) => {
                    //Varaa-napin toiminto

                    return <><IconButton color="primary" onClick={() => this.setState({ openPopup2: true })}><EventNoteSharpIcon /></IconButton>
                        <Controls.Popup
                            title="Varaa laite"
                            openPopup={this.state.openPopup2}
                            onClick={() => this.setState({ openPopup2: false })}>
                            <ReservationForm />
                        </Controls.Popup></>;
                }
            },
            {
                field: "", headerName: "Muokkaa", sortable: false, width: 100, disableClickEventBubbling: true,
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

                        if (delId && delId != null) {
                            try {
                                let result = fetch('/api/device', {
                                    method: 'delete',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        deviceid: delId
                                    })
                                }).then(res => this.fetchDevices());
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    };

                    return <><IconButton color="primary" onClick={onClickEdit}><EditIcon /></IconButton>
                        <IconButton color="secondary" onClick={onClickDelete}><DeleteIcon /></IconButton></>;
                }
            }

            // Tämä muistiin
            // {
            //   field: "fullName",
            //   headerName: "Full name",
            //   description: "This column has a value getter and is not sortable.",
            //   sortable: false,
            //   width: 160,
            //   valueGetter: (params: ValueGetterParams) =>
            //     `${params.getValue("firstName") || ""} ${
            //       params.getValue("lastName") || ""
            //     }`
            // }
        ];

        return (
            <>
                <div style={{ height: 700, width: '100%' }}>
                    <Toolbar>
                        <Controls.Input fullWidth
                            label="Etsi"
                            className={classes.searchInput}
                            InputProps={{
                                /*startAdornment: (<InputAdornment position="start">
                                    <Search />
                                </InputAdornment>)*/
                            }}
                            onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    // ev.preventDefault();
                                    this.fetchDevices();
                                }
                            }}
                            onChange={(val) => this.setState({ searchstr: val })}
                        />
                        <Controls.Button fullWidth
                            text="Hae"
                            variant="outlined"
                            startIcon={<SearchIcon />}
                            className={classes.searchButton}
                            onClick={() => this.fetchDevices()}
                        />
                        <Controls.Button fullWidth
                            text="Lisää uusi"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                            onClick={() => this.setState({ openPopup: true })}
                        />
                    </Toolbar>
                    <DataGrid
                        rows={this.state.devices}
                        columns={columns}
                        pagination
                        pageSize={10}
                        rowsPerPageOptions={[10, 25, 100]}
                        checkboxSelection />
                </div>
                <Controls.Popup
                    title="Lisää laite"
                    openPopup={this.state.openPopup}
                    onClick={() => this.setState({ openPopup: false })}
                >
                    <DeviceForm
                    //recordForEdit={null}
                    //addOrEdit={addOrEdit} 
                    />
                </Controls.Popup>
            </>

            //<div>
            //<h2>Laitteet</h2>
            //<ul>
            //{this.state.devices.map(device =>
            //<li key={device.id}>{device.name} - {device.description}</li>
            //)}
            //</ul>
            //</div>
        );
    }

}

export default withStyles(useStyles)(Devices);