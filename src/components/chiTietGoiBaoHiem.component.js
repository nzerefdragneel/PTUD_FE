import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GoiBaoHiemService from '../services/goiBaoHiem.service';
import { Button } from '@material-tailwind/react';

const GoiBaoHiem = () => {
    const [danhSachGoiSanPham, setDanhSachGoiSanPham] = useState([]);
    const [danhSachDaLay, setDanhSachDaLay] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await GoiBaoHiemService.getAll()
                    .then((response) => {
                        console.log(response);
                        const data = response.data;
                        console.log(data);
                        const goiChuaLay = data.filter((goi) => !danhSachDaLay.includes(goi.iD_GoiBaoHiem));

                        setDanhSachGoiSanPham((prevGoiSanPham) => [...prevGoiSanPham, ...goiChuaLay]);
                        setDanhSachDaLay((prevDanhSachDaLay) => [
                            ...prevDanhSachDaLay,
                            ...goiChuaLay.map((goi) => goi.iD_GoiBaoHiem),
                        ]);
                    })
                    .catch((error) => {
                        console.error('Error fetching products:', error);
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

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
                        {/* <img src={goiSanPham.imageUrl} alt={goiSanPham.tenSanPham} className="mb-2" /> */}
                        <h3 className="text-lg font-semibold mb-2">{goiSanPham.tenBaoHiem}</h3>
                        <p className="text-gray-600 mb-4">{goiSanPham.moTa.substring(0, 20) + '...'}</p>
                        <Button
                            component={Link}
                            to={`/product/${goiSanPham.iD_GoiBaoHiem}`}
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
