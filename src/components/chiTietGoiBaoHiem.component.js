import React, { useEffect, useState, Component } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import ChiTietChinhSachService from '../services/ChiTietChinhSach.service';
import ChinhSachService from '../services/ChinhSach.service';
import KhachHangService from '../services/khachHang.service';
import authService from '../services/auth.service';
const ChiTietGoiBaoHiem = () => {
    const user = authService.getCurrentUser();
    // const iD_TaiKhoan = user.id;
    const iD_TaiKhoan = 12;
    const {
        state: { goiSanPham: goiBaohiem },
    } = useLocation();
    const navigate = useNavigate();
    console.log(goiBaohiem);
    const [khachHang, setkhachHang] = useState([]);
    const [danhSachChinhSach, setDanhSachChinhSach] = useState([]);
    const [danhSachDaLay, setDanhSachDaLay] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response_kh = await KhachHangService.getByIdTaiKhoan(iD_TaiKhoan);
                setkhachHang(response_kh.data);
                const response = await ChiTietChinhSachService.getChiTietChinhSach(goiBaohiem.iD_GoiBaoHiem);
                const [result1, result2] = await Promise.all([
                    ChiTietChinhSachService.getChiTietChinhSach(goiBaohiem.iD_GoiBaoHiem),
                    ChiTietChinhSachService.getChiTietChinhSach(goiBaohiem.iD_GoiBaoHiem),
                ]);
                const data = response.data;
                const goiChuaLay = data.filter((goi) => !danhSachDaLay.includes(goi.iD_ChinhSach));

                setDanhSachChinhSach((prevGoiSanPham) => [...prevGoiSanPham, ...goiChuaLay]);
                setDanhSachDaLay((prevDanhSachDaLay) => [
                    ...prevDanhSachDaLay,
                    ...goiChuaLay.map((goi) => goi.iD_ChinhSach),
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleDangKiBaoHiemClick = (goiBaohiem) => {
        if (user == null) {
            navigate(`/login`);
        }
        //kiểm tra xác thực
        if (khachHang.xacThuc === 'Chưa Xác Thực') {
            alert('Hello, this is an alert!');
            return;
        }
        navigate(`/register/${goiBaohiem.iD_GoiBaoHiem}`);
    };
    return (
        <header className="wrapper mt-8">
            <div className="baoHiem border border-black p-4 mb-4">
                <div className="TieuDe flex items-center">
                    <h2 className="mr-2">{goiBaohiem.tenBaoHiem}</h2>
                    <div className="vertical-line bg-black h-6 mx-2"></div>
                    <p>{goiBaohiem.moTa}</p>
                </div>

                <img
                    src={goiBaohiem.hinhAnh}
                    alt="Bao Hiem Image"
                    className="anhbaohiem"
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
                <div className="thongtinbaohiem">
                    <p>Tên gói: {goiBaohiem.tenGoi}</p>
                    <p>Giá tiền: {goiBaohiem.giaTien}</p>
                    <p>Thời hạn:{goiBaohiem.thoiHan}</p>
                    <p>Ngày phát hành: {goiBaohiem.ngayPhatHanh}</p>
                </div>
            </div>
            <div className="danhsachchinhsach flex flex-col gap-4">
                {danhSachChinhSach.map((chinhSach) => (
                    <div
                        key={chinhSach.iD_ChinhSach}
                        className="ChinhSachItem border border-solid border-teal-500 p-4 mb-4"
                    >
                        <div className="IDChinhSach mb-4">
                            <h3>Chính sách {chinhSach.iD_ChinhSach}</h3>

                            {/* tên chính sách */}
                        </div>
                        <p className="text-gray-600 mb-4">Hạn mức chi trả: {chinhSach.hanMucChiTra}</p>
                        <p className="text-gray-600 mb-4">Điều kiện áp dụng: {chinhSach.dieuKienApDung}</p>
                        <p className="text-gray-600 mb-4">Mô tả: {chinhSach.moTa}</p>
                    </div>
                ))}
            </div>

            <Button
                onClick={() => handleDangKiBaoHiemClick(goiBaohiem.iD_GoiBaoHiem)}
                className="bg-blue-500 text-white px-4 py-2"
            >
                Đăng ký ngay
            </Button>
        </header>
    );
};

export default ChiTietGoiBaoHiem;
