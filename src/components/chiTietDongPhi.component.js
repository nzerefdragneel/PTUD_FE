import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import KhachHangService from '../services/khachHang.service';
import HopDongService from '../services/hopDong.service';
import { Button } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';
const ChiTietDongPhi = () => {
    const { id } = useParams();
    return (
        <div className="border border-black p-4">
            <h3 className="text-black font-bold mb-4">THANH TOÁN PHÍ BẢO HIỂM ĐỊNH KÌ</h3>
            <div className="flex mb-2">
                <h3 className="text-black">Tên bảo hiểm</h3>
                <h3 className="ml-4">Bảo hiểm sức khỏe</h3>
            </div>
            <div className="flex mb-2">
                <h3 className="text-black">Tên gói</h3>
                <h3 className="ml-4">Gói vàng</h3>
            </div>
            <div className="flex mb-2">
                <h3 className="text-black">Ngày hết hạn</h3>
                <h3 className="ml-4">12/01/2024</h3>
            </div>
            <div className="flex mb-2">
                <h3 className="text-black">Số tiền cần đóng</h3>
                <h3 className="ml-4">500000</h3>
            </div>
            <div className="flex">
                <h3 className="text-black">Tình trạng thanh toán</h3>
                <h3 className="ml-4">chưa thanh toán</h3>
            </div>
        </div>
    );
};

export default ChiTietDongPhi;
