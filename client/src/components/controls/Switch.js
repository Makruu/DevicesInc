import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


export default function SwitchLabels() {
    const [state, setState] = React.useState({
      checkedA: true,
    });
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };

  
    return (
        

        <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            color="primary"
          />
        }
        label = "Pääkäyttäjä"
      />
    );
  }