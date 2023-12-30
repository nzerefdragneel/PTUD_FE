import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import KhachHangService from '../services/khachHang.service';
import HopDongService from '../services/hopDong.service';
import ChiTietDongPhi from './chiTietDongPhi.component';
import { Button } from '@material-tailwind/react';

// const DongPhi = ({ idUser }) => {
//     // const [khachHang, setkhachHang] = useState([]);
//     const [danhSachGoiSanPham, setDanhSachGoiSanPham] = useState([]);
//     const [danhSachDaLay, setDanhSachDaLay] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const khachHangResponse = await KhachHangService.getById(idUser);
//                 const idKhachHang = khachHangResponse.data.ID_KhachHang;

//                 const hopDongResponse = await HopDongService.getById(idKhachHang);
//                 console.log(hopDongResponse);
//                 const data = hopDongResponse.data.HopDong; // Truy cập đến mảng HopDong trong đối tượng
//                 if (Array.isArray(data)) {
//                     const goiChuaLay = data.filter((goi) => !danhSachDaLay.includes(goi.ID_HopDong));

//                     setDanhSachGoiSanPham((prevGoiSanPham) => [...prevGoiSanPham, ...goiChuaLay]);
//                     setDanhSachDaLay((prevDanhSachDaLay) => [
//                         ...prevDanhSachDaLay,
//                         ...goiChuaLay.map((goi) => goi.ID_HopDong),
//                     ]);
//                 } else {
//                     console.error('Error: Data from API is not an array');
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//         fetchData();
//     }, [idUser, danhSachDaLay]);

//     return (
//         <header className="wrapper mt-8">
//             <div className="grid grid-cols-3 gap-4">
//                 {danhSachGoiSanPham.map((goiSanPham) => (
//                     <div
//                         key={goiSanPham.ID_HopDong}
//                         className="goiBaoHiemItem border border-solid border-teal-500 p-4 bg-blue-100 rounded-md"
//                     >
//                         <h3 className="text-lg font-semibold mb-2">{goiSanPham.NgayKyKet}</h3>
//                         <p className="text-gray-600 mb-4">{goiSanPham.ID_GoiBaoHiem}</p>
//                         <Button
//                             component={Link}
//                             to={`/product/${goiSanPham.iD_GoiBaoHiem}`}
//                             className="bg-blue-500 text-white px-4 py-2"
//                         >
//                             Xem chi tiết
//                         </Button>
//                     </div>
//                 ))}
//             </div>
//         </header>
//     );
// };

// export default DongPhi;

const DongPhi = ({ idUser }) => {
    return (
        <div>
            <div className="border border-black border-opacity-100 p-4 mb-4 flex items-center justify-between">
                <div className="text-center">
                    <h3 className="font-bold text-lg">Tên bảo hiểm</h3>
                    <h3 className="text-sm">Bảo hiểm sức khỏe</h3>
                </div>

                <div className="text-center">
                    <h3 className="font-bold text-lg">Tên gói</h3>
                    <h3 className="text-sm">Gói vàng</h3>
                </div>

                <div className="text-center">
                    <h3 className="font-bold text-lg ">Tình trạng thanh toán</h3>
                    <h3 className="text-sm text-red-500">chưa thanh toán</h3>
                </div>

                <Button
                    variant="filled"
                    component={Link}
                    to="/chiTietDongPhi/1"
                    // to={`/chiTietDongPhi/${goiSanPham.iD_GoiBaoHiem}`}
                    className="bg-blue-500 text-white px-4 py-2 text-lg"
                >
                    Thanh toán
                </Button>
            </div>

            <div className="border border-black border-opacity-100 p-4 mb-4 flex items-center justify-between">
                <div className="text-center">
                    <h3 className="font-bold text-lg">Tên bảo hiểm</h3>
                    <h3 className="text-sm">Bảo hiểm sức khỏe</h3>
                </div>

                <div className="text-center">
                    <h3 className="font-bold text-lg">Tên gói</h3>
                    <h3 className="text-sm">Gói bạc</h3>
                </div>

                <div className="text-center">
                    <h3 className="font-bold text-lg ">Tình trạng thanh toán</h3>
                    <h3 className="text-sm text-red-500">chưa thanh toán</h3>
                </div>

                <Button
                    variant="contained"
                    component={Link}
                    to="/chiTietDongPhi"
                    className="bg-blue-500 text-white px-4 py-2 text-lg"
                >
                    Thanh toán
                </Button>
            </div>
        </div>
    );
};

export default DongPhi;
