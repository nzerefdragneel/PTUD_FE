import React, { Component, useEffect, useState, useCallback } from 'react';

import UserService from '../services/user.service';
import { Navigate, Link, useLocation } from 'react-router-dom';
import KhachHangService from '../services/khachHang.service';
import QuanLyBaoHiemService from '../services/quanLyBaoHiem.service';
import YeuCauChiTraService from '../services/yeuCauChiTra.service';
import GoiBaoHiemService from '../services/goiBaoHiem.service';
import authService from '../services/auth.service';
import { Button, Input } from '@material-tailwind/react';
import DialogDefault from './dialog';

const required = (value) => {
    if (!value) {
        return (
            <div className="text-error-color text-base" role="alert">
                Thông tin này không được bỏ trống !
            </div>
        );
    }
};
const YeuCauTuVan = () => {
    //lấy idtaikhoan từ bảng tài khoản
    // const user = this.props.dataFromParent.iD_TaiKhoan;
    const user = authService.getCurrentUser();
    const [khachHangData, setKhachHangData] = useState({});
    const [GoiBaoHiemData, setGoiBaoHiemData] = useState([]);
    const [QuanLyBaoHiem, setQuanLyBaoHiem] = useState([]);
    const [GoiBaoHiem, setSelectGoiBaoHiem] = useState([]);
    const [qlbhid, setqlbhid] = useState(null);
    const [nguoiYeuCau, setnguoiYeuCau] = useState(null);
    const [moiQuanHe, setmoiQuanHe] = useState(null);
    const [diaChi, setdiaChi] = useState(null);
    const [dienThoai, setdienThoai] = useState(null);
    const [soTienYeuCauChiTra, setsoTienYeuCauChiTra] = useState(null);
    const [truongHopChiTra, settruongHopChiTra] = useState(null);
    const [noiDieuTri, setnoiDieuTri] = useState(null);
    const [chanDoan, setchanDoan] = useState(null);
    const [hauQua, sethauQua] = useState(null);
    const [hinhThucDieuTri, sethinhThucDieuTri] = useState(null);
    const [ngayBatDau, setngayBatDau] = useState(null);
    const [ngayKetThuc, setngayKetThuc] = useState(null);
    const [email, setemail] = useState(null);
    const [tinhTrangDuyet, settinhTrangDuyet] = useState(null);
    const [danhSachGoiBaoHiem, setDanhSachGoiBaoHiem] = useState([]);
    const [danhSachDaLay, setDanhSachDaLay] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [noiDungMessage, setnoiDungMessage] = useState(null);
    //lấy dữ liệu idkhachhang tu bảng khách hàng
    // useEffect(() => {
    //     // Gọi API để lấy dữ liệu từ khachHangService
    //     // KhachHangService.getById(user.iD_TaiKhoan)
    //     //     .then((response) => {
    //     //         setKhachHangData(response.data);
    //     //     })
    //     //     .catch((error) => {
    //     //         console.error('Error fetching data:', error);
    //     //     });
    // }, []);
    const iD_TaiKhoan = user.id;
    //lấy id bảo hiểm từ bảng quản lý bảo hiểm

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dskh = [];
                try {
                    const { data: dsKhacHang } = await KhachHangService.getAll();
                    const khachHangData = dsKhacHang.find((kh) => kh.iD_TaiKhoan === 6);
                    //khachHangData.iD_KhachHang
                    const response = await QuanLyBaoHiemService.getByIDKH(khachHangData.iD_KhachHang);
                    const data = response.data;
                    setQuanLyBaoHiem(response.data);
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
                    settinhTrangDuyet('Chưa duyệt');
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

    const handleYeuCauChiTra = async () => {
        setqlbhid(QuanLyBaoHiem.find((qlbh) => qlbh.iD_GoiBaoHiem === GoiBaoHiem.iD_GoiBaoHiem));
        console.log(qlbhid);
        try {
            const response = await YeuCauChiTraService.EditYeuCauChiTra(
                qlbhid,
                soTienYeuCauChiTra,
                nguoiYeuCau,
                truongHopChiTra,
                moiQuanHe,
                noiDieuTri,
                diaChi,
                chanDoan,
                dienThoai,
                hauQua,
                email,
                hinhThucDieuTri,
                ngayBatDau,
                ngayKetThuc,
                tinhTrangDuyet,
            );

            console.log('YeuCauChiTra API Response:', response);
            setShowMessage(true);
            setnoiDungMessage('Gửi yêu cầu thành công!');
        } catch (error) {
            setShowMessage(true);
            setnoiDungMessage('Vui lòng kiểm tra lại thông tin!');
            console.error('Error sending YeuCauChiTra request:', error);
        }
    };
    const closeMessage = () => {
        setShowMessage(false);
    };

    return (
        <div>
            {showMessage && <DialogDefault handler={closeMessage} message={noiDungMessage} />}
            <div>
                <div className="form-group">
                    <label htmlFor="username" className="font-semibold mb-2">
                        Chọn gói bảo hiểm
                    </label>

                    <select
                        name="GoiBaoHiem"
                        value={GoiBaoHiem}
                        id="GoiBaoHiem"
                        form="healthDeclaration"
                        className="block w-10% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setSelectGoiBaoHiem(e.target.value)}
                    >
                        {GoiBaoHiemData.map((goiSanPham) => (
                            <option key={goiSanPham.iD_GoiBaoHiem} value={goiSanPham.tenBaoHiem}>
                                {goiSanPham.tenBaoHiem}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="font-semibold mb-2">
                        Họ tên người yêu cầu
                    </label>
                    <Input
                        type="text"
                        name="nguoiYeuCau"
                        value={nguoiYeuCau}
                        required="true"
                        onChange={(e) => setnguoiYeuCau(e.target.value)}
                        autocomplete="on"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="font-semibold mb-2">
                        Mối quan hệ với chủ sở hữu bảo hiểm
                    </label>
                    <Input
                        type="text"
                        name="moiQuanHe"
                        value={moiQuanHe}
                        required="true"
                        onChange={(e) => setmoiQuanHe(e.target.value)}
                        autocomplete="on"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="font-semibold mb-2">
                        Địa chỉ
                    </label>
                    <Input
                        type="text"
                        name="diaChi"
                        value={diaChi}
                        required="true"
                        onChange={(e) => setdiaChi(e.target.value)}
                        autocomplete="on"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="font-semibold mb-2">
                        Số điện thoại
                    </label>
                    <Input
                        type="text"
                        name="dienThoai"
                        value={dienThoai}
                        required="true"
                        onChange={(e) => setdienThoai(e.target.value)}
                        autocomplete="on"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="font-semibold mb-2">
                        Email
                    </label>
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        required="true"
                        onChange={(e) => setemail(e.target.value)}
                        autocomplete="on"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="username" className="font-semibold mb-2">
                        Số tiền yêu cầu chi trả `(VNĐ)`
                    </label>
                    <Input
                        type="text"
                        name="soTienYeuCauChiTra"
                        value={soTienYeuCauChiTra}
                        required="true"
                        onChange={(e) => setsoTienYeuCauChiTra(e.target.value)}
                        autocomplete="on"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="font-semibold mb-2">
                        Trường hợp chi trả
                    </label>
                    <Input
                        type="text"
                        name="truongHopChiTra"
                        value={truongHopChiTra}
                        required="true"
                        onChange={(e) => settruongHopChiTra(e.target.value)}
                        autocomplete="on"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="font-semibold mb-2">
                        Nơi điều trị
                    </label>
                    <Input
                        type="text"
                        name="noiDieuTri"
                        value={noiDieuTri}
                        required="true"
                        onChange={(e) => setnoiDieuTri(e.target.value)}
                        autocomplete="on"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="font-semibold mb-2">
                        Kết quả chẩn đoán
                    </label>
                    <Input
                        type="text"
                        name="chanDoan"
                        value={chanDoan}
                        required="true"
                        onChange={(e) => setchanDoan(e.target.value)}
                        autocomplete="on"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="font-semibold mb-2">
                        Hậu quả
                    </label>
                    <Input
                        type="text"
                        name="hauQua"
                        value={hauQua}
                        required="true"
                        onChange={(e) => sethauQua(e.target.value)}
                        autocomplete="on"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="font-semibold mb-2">
                        Hình thức điều trị
                    </label>
                    <Input
                        type="text"
                        name="hinhThucDieuTri"
                        value={hinhThucDieuTri}
                        required="true"
                        onChange={(e) => sethinhThucDieuTri(e.target.value)}
                        autocomplete="on"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="font-semibold mb-2">
                        Ngày bắt đầu điều trị
                    </label>
                    <input
                        id="ngayBatDau"
                        name="ngayBatDau"
                        type="date"
                        autoComplete="off"
                        validations={required}
                        onInput={(e) => setngayBatDau(e.target.value)}
                        className="block w-20% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="font-semibold mb-2">
                        Ngày kết thúc điều trị
                    </label>
                    <input
                        id="ngayKetThuc"
                        name="ngayKetThuc"
                        type="date"
                        autoComplete="off"
                        validations={required}
                        onInput={(e) => setngayKetThuc(e.target.value)}
                        className="block w-20% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <Button onClick={handleYeuCauChiTra} className="bg-blue-500 text-white px-4 py-2">
                GỬI YÊU CẦU
            </Button>
        </div>
    );
};

export default YeuCauTuVan;
