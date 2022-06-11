import React, { useState } from 'react';
import { Grid, } from '@material-ui/core';
import Controls from './controls/Controls';

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const selectItems = [
    { id: '1', title: 'Testi 1' },
    { id: '2', title: 'Testi 2' },
    { id: '3', title: 'Testi 3' },
]

export default function Demo() {

    return (
        <>
            <Grid item xs={6}>
                <Controls.RadioGroup
                    name="gender"
                    label="Gender"
                    //value={values.gender}
                    //onChange={handleInputChange}
                    items={genderItems}
                /><br /><br />
                <Controls.Select
                    name="selectId"
                    label="Selecti"
                    //value={values.selectId}
                    //onChange={handleInputChange}
                    options={selectItems}
                //error={errors.selectId}
                /><br /><br />
                {/*Toimi huonosti
                <Controls.DatePicker
                    name="jokuDate"
                    label="Date"
                    value={new Date()}
                    //onChange={handleDateChange}
                /><br /><br />*/}
                <Controls.Checkbox
                    name="isPermanent"
                    label="Permanent"
                //value={values.isPermanent}
                //onChange={handleInputChange}
                />
            </Grid>
        </>
    )
}