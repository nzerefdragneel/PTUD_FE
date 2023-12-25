import React, { Component } from "react";
import classNames from 'classnames/bind';
import styles from '../css/component_css/header.module.scss';
import images from '../assets/images'
import { withRouter } from "../common/with-router";
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

class header_chung extends Component {
    render(){
        return (
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <a href="#" className={cx('a_logo')}>
                            <div className={cx('logo-content')}>
                                <img src={images.logo} alt="logoimage" />
                                <div className={cx('logo-text')}>
                                    <div className={cx('logo-text1')}>VIETNAM</div>
                                    <div className={cx('logo-text2')}>HEALTH</div>
                                    <div className={cx('logo-text3')}>INSURANCE</div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className={cx('task')}>
                        <Link to="/home" className={cx('trang_chu')}>
                            <div className={cx('task_trang_chu')}>Trang chủ</div>
                        </Link>
                        <Link to="/xemGoiBaoHiem" className={cx('san_pham')}>
                            <div className={cx('task_san_pham')}>Sản phẩm</div>
                        </Link>
                        <Link to="/dong_phi" className={cx('dong_phi')}>
                            <div className={cx('task_dong_phi')}>Đóng phí</div>
                        </Link>
                        <Link to="/yeu_cau_thanh_toan_chi_phi" className={cx('yeu_cau_thanh_toan_chi_phi')}>
                            <div className={cx('task_yeu_cau_thanh_toan_chi_phi')}>Yêu cầu thanh toán chi phí</div>
                        </Link>
                        <Link to="/lien_he" className={cx('lien_he')}>
                            <div className={cx('task_lien_he')}>Liên hệ</div>
                        </Link>
                    </div>
                    <Link to="/login" className={cx('login')}>
                        <div className={cx('login')}>Đăng nhập</div>
                    </Link>

                </div>
            </header>
)}}

export default withRouter(header_chung);