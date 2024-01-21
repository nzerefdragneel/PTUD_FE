import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhieuDangKiService from '../services/phieuDangKi.service';
import NhanVienService from '../services/nhanVien.service';
import SendEmail from '../services/sendEmail.service';
import { Button, alert } from '@material-tailwind/react';
import authService from '../services/auth.service';
import DialogDefault from './dialog';
const NV_chonLichKiHopDong = () => {
    const user = authService.getCurrentUser();
    // const iD_TaiKhoan = user.id;
    const iD_TaiKhoan = 1;
    const [nhanVienData, setnhanVienData] = useState([]);
    const [ds_phieuDangKi, setds_phieuDangKi] = useState([]);
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);
    const [noiDungMessage, setnoiDungMessage] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response_nv = await NhanVienService.getAllNhanVien();
                const data_nv = response_nv.data;
                const nv = data_nv.filter((nvien) => nvien.iD_TaiKhoan === iD_TaiKhoan);
                console.log(nv);
                setnhanVienData(nv);
                console.log(nhanVienData);
                const response = await PhieuDangKiService.getAll();
                const data = response.data;
                console.log(data);
                const ds_daDuyet = data.filter(
                    (lich) => lich.tinhTrangDuyet === 'Đã Duyệt' && lich.iD_NhanVien === null,
                );

                setds_phieuDangKi(ds_daDuyet);

                ds_phieuDangKi.sort((a, b) => new Date(a.thoiGian) - new Date(b.thoiGian));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [ds_phieuDangKi]);
    useEffect(() => {
        console.log(nhanVienData);
    }, []);
    const handleNhanClick = async (phieuDangKi) => {
        const chuDe = 'Lịch kí kết hợp đồng bảo hiểm Vietnam Health Insurance';
        const noiDung =
            'Lịch kí kết hợp đồng của quý khách đã được nhận, quý khách lưu ý đến đúng giờ và địa điểm. Cảm ơn quý khách!';

        try {
            const response = await PhieuDangKiService.UpdateNhanVien(
                phieuDangKi.iD_PhieuDangKi,
                nhanVienData[0].iD_NhanVien,
            );
            console.log('PhieuDangKi API Response:', response);
            setShowMessage(true);
            setnoiDungMessage('Đăng kí thành công!');
            try {
                const response = await SendEmail.SendEmail(phieuDangKi.iD_KhachHang, chuDe, noiDung);
            } catch (error) {
                setShowMessage(true);
                setnoiDungMessage('Không gởi được email cho khách hàng!');
                console.error('Error sending YeuCauTuVan request:', error);
            }
        } catch (error) {
            setShowMessage(true);
            setnoiDungMessage('Vui lòng kiểm tra lại thông tin!');
            console.error('Error sending PhieuDangKi request:', error);
        }
        // alert('Chọn lịch tư vấn thành công');
    };
    const closeMessage = () => {
        setShowMessage(false);
    };
    return (
        <header className="wrapper mt-8 space-y-4 text-center">
            {showMessage && <DialogDefault handler={closeMessage} message={noiDungMessage} />}
            <h3 className="mb-8 mx-auto">Lịch kí hợp đồng</h3>
            <div className="grid gap-4">
                {ds_phieuDangKi.map((phieuDangKi) => (
                    <div
                        key={phieuDangKi.iD_PhieuDangKi}
                        className="goiBaoHiemItem grid grid-cols-3 gap-4 border border-blue-500 rounded cursor-pointer"
                    >
                        <p className="text-gray-600 mb-4">iD_PhieuDangKi: {phieuDangKi.iD_PhieuDangKi}</p>
                        <p className="text-gray-600 mb-4">{phieuDangKi.diaDiemKiKet}</p>
                        <p className="text-gray-600 mb-4">{phieuDangKi.thoiGianKiKet.slice(0, 10)}</p>
                        <p className="text-gray-600 mb-4">{phieuDangKi.thoiGianKiKet.slice(-8)}</p>
                        <Button
                            onClick={() => handleNhanClick(phieuDangKi)}
                            className="bg-green-500 text-white px-4 py-2 mb-4"
                        >
                            Nhận
                        </Button>
                    </div>
                ))}
            </div>
        </header>
    );
};

export default NV_chonLichKiHopDong;
