import React, { Component } from 'react';
import images from '../assets/images';
import CongTy from '../components/congTy.component';
import { withRouter } from '../common/with-router';
import { Button } from '@material-tailwind/react';

class CongTyScreen extends Component {
    render() {
        return (
            <div>
                <CongTy />
            </div>
        );
    }
}

export default withRouter(CongTyScreen);
