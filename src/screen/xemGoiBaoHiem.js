import React, { Component } from "react";
import { Card, Typography } from "@material-tailwind/react";

import { withRouter } from "../common/with-router";
import styles from '../css/screen_css/xemGoiBaoHiem.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const xemGoiBaoHiem = () => {
  return (
    <header className={cx('wrapper')}>
        <header_chung/>
        <div className={cx('inner')}>
          <Link to="/lien-he" className={cx('lien-he')}>
            <div className={cx('login')}>Đăng nhập</div>
          </Link>
          <div>
            
          </div>
        </div>

    </header>


  );
};

export default xemGoiBaoHiem;

