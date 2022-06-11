import { Component } from 'react';

class Logout extends Component {
    render() {
        fetch('/api/logout').then(this.props.history.push('/'));
        return null;
    }
}

export default Logout;