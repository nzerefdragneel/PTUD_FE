import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoiBaoHiemService from '../services/goiBaoHiem.service';
import { Button } from '@material-tailwind/react';

const NV_ds_GoiBaoHiem = () => {
    const [danhSachGoiSanPham, setDanhSachGoiSanPham] = useState([]);
    const [danhSachDaLay, setDanhSachDaLay] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GoiBaoHiemService.getAll();
                const data = response.data;
                const goiChuaLay = data.filter((goi) => !danhSachDaLay.includes(goi.iD_GoiBaoHiem));

                setDanhSachGoiSanPham((prevGoiSanPham) => [...prevGoiSanPham, ...goiChuaLay]);
                setDanhSachDaLay((prevDanhSachDaLay) => [
                    ...prevDanhSachDaLay,
                    ...goiChuaLay.map((goi) => goi.iD_GoiBaoHiem),
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleTaoMoiClick = () => {
        navigate(`/nhanVien/phatHanhGoiBaoHiem`);
    };

    const handleXemChiTietClick = (goiSanPham) => {
        navigate(`/nhanVien/chinhSuaGoiBaoHiem/${goiSanPham.iD_GoiBaoHiem}`);
    };
    return (
        <header className="wrapper mt-8 space-y-4 text-center">
            <Button onClick={() => handleTaoMoiClick()} className="bg-green-500 text-white px-4 py-2 float-left">
                Tạo mới
            </Button>
            <h3 className="mb-8 mx-auto">Danh sách gói bảo hiểm</h3>
            <div className="grid gap-4">
                {danhSachGoiSanPham.map((goiSanPham) => (
                    <div
                        key={goiSanPham.iD_GoiBaoHiem}
                        onClick={() => handleXemChiTietClick(goiSanPham)}
                        className="goiBaoHiemItem grid grid-cols-3 gap-4 border border-blue-500 rounded cursor-pointer"
                    >
                        <p className="text-gray-600 mb-4">ID_GoiBaoHiem: {goiSanPham.iD_GoiBaoHiem}</p>
                        <p className="text-gray-600 mb-4">{goiSanPham.tenBaoHiem}</p>
                        <p className="text-gray-600 mb-4">Gói {goiSanPham.tenGoi}</p>
                    </div>
                ))}
            </div>
        </header>
    );
};

export default NV_ds_GoiBaoHiem;
