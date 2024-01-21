import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GoiBaoHiemService from '../services/goiBaoHiem.service';
import { Button } from '@material-tailwind/react';
import ChiTietChinhSachService from '../services/ChiTietChinhSach.service';
const NV_ds_chinhSach = () => {
    const {
        state: { goiSanPham: goiBaohiem },
    } = useLocation();
    console.log(goiBaohiem);
    const [danhSachChinhSach, setDanhSachChinhSach] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GoiBaoHiemService.getAll();
                const data = response.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleXemChiTietClick = (goiSanPham) => {};
    return (
        <header className="wrapper mt-8 space-y-4 text-center">
            <div
                key={goiBaohiem.iD_GoiBaoHiem}
                className="goiBaoHiemItem grid grid-cols-3 gap-4 border border-blue-500 rounded cursor-pointer"
            >
                <p className="text-gray-600 mb-4">ID_GoiBaoHiem: {goiBaohiem.iD_GoiBaoHiem}</p>
                <p className="text-gray-600 mb-4">{goiBaohiem.tenBaoHiem}</p>
                <p className="text-gray-600 mb-4">Gói {goiBaohiem.tenGoi}</p>
            </div>
            <h3 className="mb-8 mx-auto">Danh sách chính sách</h3>
            <div className="grid gap-4">
                {danhSachChinhSach.map((goiBaohiem) => (
                    <div
                        key={goiBaohiem.iD_GoiBaoHiem}
                        onClick={() => handleXemChiTietClick(goiBaohiem)}
                        className="goiBaoHiemItem grid grid-cols-3 gap-4 border border-blue-500 rounded cursor-pointer"
                    >
                        <p className="text-gray-600 mb-4">ID_GoiBaoHiem: {goiBaohiem.iD_GoiBaoHiem}</p>
                        <p className="text-gray-600 mb-4">{goiBaohiem.tenBaoHiem}</p>
                        <p className="text-gray-600 mb-4">Gói {goiBaohiem.tenGoi}</p>
                    </div>
                ))}
            </div>
        </header>
    );
};

export default NV_ds_chinhSach;
