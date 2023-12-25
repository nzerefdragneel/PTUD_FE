import React, { Component , useEffect, useState } from "react";
import classNames from 'classnames/bind';
import styles from '../css/component_css/item.module.scss';
import { withRouter } from "../common/with-router";
import { Link } from 'react-router-dom';

import GoiBaoHiemService from "../services/goiBaoHiem.service";

const cx = classNames.bind(styles);

class GoiBaoHiem extends Component {
    render(){
        const [danhSachGoiSanPham, setDanhSachGoiSanPham] = useState([]);
        const [danhSachDaLay, setDanhSachDaLay] = useState([]);
        useEffect(() => {
            const fetchData = async () => {
              try {
                const data = await ProductService.getAllProducts();
                // Lọc những gói sản phẩm chưa được lấy
                const goiChuaLay = data.filter(goi => !danhSachDaLay.includes(goi.id));
        
                // Cập nhật danh sách gói sản phẩm và danh sách đã lấy
                setDanhSachGoiSanPham(prevGoiSanPham => [...prevGoiSanPham, ...goiChuaLay]);
                setDanhSachDaLay(prevDanhSachDaLay => [...prevDanhSachDaLay, ...goiChuaLay.map(goi => goi.id)]);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };
            fetchData();
        }, [danhSachDaLay]); // Chạy useEffect khi danhSachDaLay thay đổi
        return (
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    {danhSachGoiSanPham.map(goiSanPham => (
                        <div key={goiSanPham.id} className={cx('goiBaoHiemItem')}>
                        <img src={goiSanPham.imageUrl} alt={goiSanPham.tenSanPham} />
                        <h3>{goiSanPham.tenSanPham}</h3>
                        <p>{goiSanPham.moTa.substring(0, 50) + '...'}</p>
                        <Link to={`/product/${goiSanPham.id}`}>
                            <button>Xem chi tiết</button>
                        </Link>
                        </div>
                    ))}
                </div>
            </header>
)}}

export default withRouter(GoiBaoHiem);

