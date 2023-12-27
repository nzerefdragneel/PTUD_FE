import React, { Component } from 'react';

import GoiBaoHiem from '../components/item.component';
import { withRouter } from '../common/with-router';
import { Link } from 'react-router-dom';

import { Button } from '@material-tailwind/react';

class XemGoiBaoHiem extends Component {
    render() {
        return (
            <div>
                <Button variant="contained" component={Link} to="/lien-he">
                    Liên hệ
                </Button>

                <GoiBaoHiem />
            </div>
        );
    }
}

export default withRouter(XemGoiBaoHiem);
