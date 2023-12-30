import React, { Component, useEffect, useState } from 'react';
import { withRouter } from '../common/with-router';
import { Link } from 'react-router-dom';
import images from '../assets/images';
import { Button } from '@material-tailwind/react';
import DongPhi from '../components/dongPhi.component';

class DongPhiScreen extends Component {
    render() {
        const { idUser } = this.props;
        return (
            <div>
                <DongPhi idUser={idUser} />
            </div>
        );
    }
}

export default withRouter(DongPhiScreen);
