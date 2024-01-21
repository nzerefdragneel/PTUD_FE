import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import KhachHangService from '../services/khachHang.service';
import HopDongService from '../services/hopDong.service';
import GoiBaoHiemService from '../services/goiBaoHiem.service';
import ChiTietDongPhi from './chiTietDongPhi.component';
import { Button } from '@material-tailwind/react';
import authService from '../services/auth.service';
import PhieuThanhToanBaoHiemService from '../services/phieuThanhToanBaoHiem.service';
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
                try {
                    const khachHangData = await KhachHangService.getByIdTaiKhoan(iD_TaiKhoan);
                    console.log(khachHangData);
                    const hopDongCuaKH = await HopDongService.getByIdKhachHang(khachHangData.data.iD_KhachHang);
                    console.log(hopDongCuaKH.status);
                    if (hopDongCuaKH.status === 200) {
                        // Xử lý khi thành công
                        for (const hd of hopDongCuaKH) {
                            try {
                                const response = await PhieuThanhToanBaoHiemService.getGoiBaoHiemChuaThanhToan(30);
                                const data = response.data;
                                sethopDong(data);
                            } catch (error) {
                                console.error('Error fetching goiBaoHiem data:', error);
                            }
                        }
                    } else {
                        alert('Không có hợp đồng nào');
                        console.error('Error sending email:', hopDongCuaKH.statusText);
                    }
                    // sethopDong(response.data);
                    // const goiChuaLay = data.filter((goi) => !danhSachDaLay.includes(goi.iD_GoiBaoHiem));
                    // Lấy thông tin từng gói bảo hiểm
                    // const dsGoiBaoHiem = [];
                } catch (error) {
                    // if (hopDongCuaKH.status === 404) {
                    //     // Xử lý khi thành công
                    //     return <h3>không có hợp đồng nào</h3>;
                    // }
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
