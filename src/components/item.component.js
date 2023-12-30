import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GoiBaoHiemService from '../services/goiBaoHiem.service';
import { Button } from '@material-tailwind/react';

const GoiBaoHiem = () => {
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
    }, [danhSachDaLay]);

    const handleXemChiTietClick = (idGoiBaoHiem) => {
        // Chuyển hướng tới trang chi tiết với idGoiBaoHiem
        navigate(`/chi-tiet-goi-bao-hiem/${idGoiBaoHiem}`);
    };

    return (
        <header className="wrapper mt-8">
            <Button variant="contained" component={Link} to="/lien-he" className="mb-4">
                Liên hệ
            </Button>
            <div className="grid grid-cols-3 gap-4">
                {danhSachGoiSanPham.map((goiSanPham) => (
                    <div
                        key={goiSanPham.iD_GoiBaoHiem}
                        className="goiBaoHiemItem border border-solid border-teal-500 p-4"
                    >
                        <h3 className="text-lg font-semibold mb-2">{goiSanPham.tenBaoHiem}</h3>
                        <p className="text-gray-600 mb-4">{goiSanPham.moTa.substring(0, 20) + '...'}</p>
                        <Button
                            onClick={() => handleXemChiTietClick(goiSanPham.iD_GoiBaoHiem)}
                            className="bg-blue-500 text-white px-4 py-2"
                        >
                            Xem chi tiết
                        </Button>
                    </div>
                ))}
            </div>
        </header>
    );
};

export default GoiBaoHiem;
