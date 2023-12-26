import React, { Component } from 'react';
import { Card, Typography } from '@material-tailwind/react';
import GoiBaoHiem from '../components/item.component';
import { withRouter } from '../common/with-router';
//import styles from '../css/screen_css/xemGoiBaoHiem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from '../css/component_css/item.module.scss';
const cx = classNames.bind(styles);

const xemGoiBaoHiem = () => {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/lien-he" className={cx('lien-he')}>
                    <div>Liên hệ</div>
                </Link>
                <div className={cx('cac-goi-bao-hiem')}>
                    <GoiBaoHiem />
                </div>
            </div>
        </header>
    );
};

export default xemGoiBaoHiem;
