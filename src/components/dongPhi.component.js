import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import KhachHangService from '../services/khachHang.service';
import HopDongService from '../services/hopDong.service';
import GoiBaoHiemService from '../services/goiBaoHiem.service';
import ChiTietDongPhi from './chiTietDongPhi.component';
import { Button } from '@material-tailwind/react';
import authService from '../services/auth.service';
const DongPhi = () => {
    const user = authService.getCurrentUser();
    // const iD_TaiKhoan = user.id;
    const iD_TaiKhoan = 12;
    const navigate = useNavigate();
    const [hopDong, sethopDong] = useState([]);
    const [GoiBaoHiemData, setGoiBaoHiemData] = useState([]);
    const [danhSachDaLay, setDanhSachDaLay] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dskh = [];
                try {
                    const khachHangData = await KhachHangService.getByIdTaiKhoan(iD_TaiKhoan);
                    const response = await HopDongService.getByIdKhachHang(khachHangData.iD_KhachHang);
                    const data = response.data;
                    sethopDong(response.data);
                    const goiChuaLay = data.filter((goi) => !danhSachDaLay.includes(goi.iD_GoiBaoHiem));
                    // Lấy thông tin từng gói bảo hiểm
                    const dsGoiBaoHiem = [];
                    for (const goi of goiChuaLay) {
                        try {
                            const { data } = await GoiBaoHiemService.getByID(goi.iD_GoiBaoHiem);
                            dsGoiBaoHiem.push(data);
                        } catch (error) {
                            console.error('Error fetching goiBaoHiem data:', error);
                        }
                    }

                    setGoiBaoHiemData(dsGoiBaoHiem);
                    setDanhSachDaLay((prevDanhSachDaLay) => [
                        ...prevDanhSachDaLay,
                        ...goiChuaLay.map((goi) => goi.iD_GoiBaoHiem),
                    ]);
                } catch (error) {
                    console.error('Error fetching goiBaoHiem data:', error);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const handleXemChiTietClick = (goiSanPham) => {
        // Chuyển hướng tới trang chi tiết đóng phí
        navigate(`/chi-tiet-goi-bao-hiem/${goiSanPham.iD_GoiBaoHiem}`, { state: { goiSanPham } });
    };

    // return (

    // );
};

export default DongPhi;
