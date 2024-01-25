import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhieuDangKiService from "../services/phieuDangKi.service";
import NhanVienService from "../services/nhanVien.service";
import KhachHangService from "../services/khachHang.service";
import SendEmail from "../services/sendEmail.service";
import { Button, alert } from "@material-tailwind/react";
import authService from "../services/auth.service";
import DialogDefault from "./dialog";
const NV_chonLichKiHopDong = () => {
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  const [nhanVienData, setnhanVienData] = useState([]);
  const [ds_phieuDangKi, setds_phieuDangKi] = useState([]);

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
          (lich) =>
            lich.tinhTrangDuyet === "Đã Duyệt" && lich.iD_NhanVien === null
        );
        const sapXep = ds_daDuyet.sort(
          (a, b) => new Date(a.thoiGian) - new Date(b.thoiGian)
        );

        console.log(sapXep);
        const ds_yc = [];
        for (const yc of sapXep) {
          const response = await KhachHangService.getById(yc.iD_KhachHang);
          console.log(response.data.hoTen);
          ds_yc.push({
            iD_KhachHang: yc.iD_KhachHang,
            hoTen: response.data.hoTen,
            gioiTinh: response.data.gioiTinh,
            ngaySinh: response.data.ngaySinh,
            soNhaTenDuong: response.data.soNhaTenDuong,
            phuongXa: response.data.phuongXa,
            quanHuyen: response.data.quanHuyen,
            thanhPho: response.data.thanhPho,
            email: response.data.email,
            soDienThoai: response.data.soDienThoai,
            iD_PhieuDangKi: yc.iD_PhieuDangKi,
            diaDiemKiKet: yc.diaDiemKiKet,
            thoiGianKiKet: yc.thoiGianKiKet,
            toKhaiSucKhoe: yc.toKhaiSucKhoe,
            iD_GoiBaoHiem: yc.iD_GoiBaoHiem,
          });
        }

        setds_phieuDangKi(ds_yc);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [ds_phieuDangKi]);
  // useEffect(() => {
  //   console.log(nhanVienData);
  // }, []);
  const handleNhanClick = async (phieuDangKi) => {
    const chuDe = "Lịch kí kết hợp đồng bảo hiểm Vietnam Health Insurance";
    const noiDung =
      "Lịch kí kết hợp đồng của quý khách đã được nhận, quý khách lưu ý đến đúng giờ và địa điểm. Cảm ơn quý khách!";

    try {
      const response = await PhieuDangKiService.UpdateNhanVien(
        phieuDangKi.iD_PhieuDangKi,
        nhanVienData[0].iD_NhanVien
      );
      console.log("PhieuDangKi API Response:", response);
      setShowMessage(true);
      setnoiDungMessage("Đăng kí thành công!");
      try {
        const response = await SendEmail.SendEmail(
          phieuDangKi.iD_KhachHang,
          chuDe,
          noiDung
        );
      } catch (error) {
        setShowMessage(true);
        setnoiDungMessage("Không gởi được email cho khách hàng!");
        console.error("Error sending YeuCauTuVan request:", error);
      }
    } catch (error) {
      setShowMessage(true);
      setnoiDungMessage("Vui lòng kiểm tra lại thông tin!");
      console.error("Error sending PhieuDangKi request:", error);
    }
    // alert('Chọn lịch tư vấn thành công');
  };
  const closeMessage = () => {
    setShowMessage(false);
  };
  return (
    <header className="wrapper mt-8 space-y-4 text-center">
      {showMessage && (
        <DialogDefault handler={closeMessage} message={noiDungMessage} />
      )}
      {nhanVienData.length === 0 && (
        <h5>Vui lòng thêm thông tin cá nhân trước!</h5>
      )}
      {nhanVienData.length !== 0 && (
        <div>
          <h3 className="mb-8 mx-auto">Lịch kí hợp đồng</h3>
          <div className="grid gap-4">
            {ds_phieuDangKi.map((phieuDangKi) => (
              <div
                key={phieuDangKi.iD_PhieuDangKi}
                className="bg-white rounded-lg shadow-md p-4 mb-4 text-sm text-left border border-gray-500"
              >
                <div>
                  <strong>iD_PhieuDangKi:</strong> {phieuDangKi.iD_PhieuDangKi}
                </div>
                <div>
                  <strong>Tình trạng duyệt:</strong>{" "}
                  {phieuDangKi.tinhTrangDuyet}
                </div>
                <div>
                  <strong className="text-red-500">Địa điểm cuộc hẹn:</strong>{" "}
                  {phieuDangKi.diaDiemKiKet}
                </div>
                <div>
                  <strong className="text-red-500">Thời gian hẹn:</strong>{" "}
                  {phieuDangKi.thoiGianKiKet.slice(0, 10)}{" "}
                  {phieuDangKi.thoiGianKiKet.slice(-8)}
                </div>

                <div>
                  <strong>iD_KhachHang:</strong>{" "}
                  {phieuDangKi.iD_KhachHang ? phieuDangKi.iD_KhachHang : "N/A"}
                </div>
                <div>
                  <strong>Họ tên:</strong>{" "}
                  {phieuDangKi.hoTen ? phieuDangKi.hoTen : "N/A"}
                </div>
                <div>
                  <strong>Giới tính:</strong>{" "}
                  {phieuDangKi.gioiTinh ? phieuDangKi.gioiTinh : "N/A"}
                </div>
                <div>
                  <strong>Ngày sinh:</strong>{" "}
                  {phieuDangKi.ngaySinh
                    ? phieuDangKi.ngaySinh.slice(0, 10)
                    : "N/A"}
                </div>

                <div>
                  <strong>Địa chỉ nơi ở:</strong> {phieuDangKi.soNhaTenDuong},{" "}
                  {phieuDangKi.phuongXa}, {phieuDangKi.quanHuyen},{" "}
                  {phieuDangKi.thanhPho}
                </div>
                <div>
                  <strong>email:</strong>{" "}
                  {phieuDangKi.email ? phieuDangKi.email : "N/A"}
                </div>
                <div>
                  <strong>Số điện thoại:</strong>{" "}
                  {phieuDangKi.soDienThoai ? phieuDangKi.soDienThoai : "N/A"}
                </div>
                <div>
                  <strong>Tờ khai sức khỏe:</strong>{" "}
                  <a
                    href={phieuDangKi.toKhaiSucKhoe}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {phieuDangKi.toKhaiSucKhoe
                      ? phieuDangKi.toKhaiSucKhoe
                      : "N/A"}
                  </a>
                </div>
                <div>
                  <strong>Tên bảo hiểm:</strong>{" "}
                  {phieuDangKi.tenBaoHiem ? phieuDangKi.tenBaoHiem : "N/A"}
                </div>
                <div>
                  <strong>Tên gói:</strong>{" "}
                  {phieuDangKi.tenGoi ? phieuDangKi.tenGoi : "N/A"}
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <button
                    className="bg-green-500 text-white p-2 rounded mr-2 font-bold text-lg"
                    onClick={() => handleNhanClick(phieuDangKi)}
                  >
                    Nhận
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default NV_chonLichKiHopDong;
