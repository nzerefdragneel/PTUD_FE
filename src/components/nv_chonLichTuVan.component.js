import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YeuCauTuVanService from "../services/yeuCauTuVan.service";
import NhanVienService from "../services/nhanVien.service";
import { Button, alert } from "@material-tailwind/react";
import KhachHangService from "../services/khachHang.service";
import SendEmail from "../services/sendEmail.service";
import authService from "../services/auth.service";
import DialogDefault from "./dialog";
const NV_chonLichTuVan = () => {
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  console.log(iD_TaiKhoan);
  const [nhanVienData, setnhanVienData] = useState([]);
  const [ds_yeucautuvan, setds_yeucautuvan] = useState([]);
  const [kiemTraCoTrongBangNV, setkiemTraCoTrongBangNV] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [noiDungMessage, setnoiDungMessage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_nv = await NhanVienService.getAllNhanVien();
        const data_nv = response_nv.data;
        console.log(response_nv.data);
        const nv = data_nv.filter((nvien) => nvien.iD_TaiKhoan === iD_TaiKhoan);
        console.log(nv);
        setnhanVienData(nv);
        console.log(nhanVienData);
        const response = await YeuCauTuVanService.getAll();
        const data = response.data;
        const ds_daDuyet = data.filter(
          (lich) =>
            lich.tinhTrangDuyet === "Đã Duyệt" &&
            (lich.iD_NhanVien1 === null || lich.iD_NhanVien2 === null)
        );
        console.log(nv[0].iD_NhanVien);

        const ds_khongCoNVHienTai = ds_daDuyet.filter(
          (lich) =>
            lich.iD_NhanVien1 !== (nv.length > 0 ? nv[0].iD_NhanVien : null)
        );

        ds_khongCoNVHienTai.sort(
          (a, b) => new Date(a.thoiGian) - new Date(b.thoiGian)
        );

        console.log(ds_khongCoNVHienTai);
        const ds_yc = [];
        for (const yc of ds_khongCoNVHienTai) {
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
            iD_YeuCauTuVan: yc.iD_YeuCauTuVan,
            tinhTrangDuyet: yc.tinhTrangDuyet,
            diaDiem: yc.diaDiem,
            thoiGian: yc.thoiGian,
          });
        }
        setds_yeucautuvan(ds_yc);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [ds_yeucautuvan]);
  //ds_yeucautuvan
  useEffect(() => {
    console.log(nhanVienData);
  }, []);

  /*  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };*/

  const handleNhanClick = async (phieuTuVan) => {
    if (nhanVienData.length === 0) {
      alert("Vui lòng bổ sung thông tin cá nhân trước khi chọn lịch!");
      navigate(`/addNhanVien`);
      return;
    }
    console.log(phieuTuVan.iD_YeuCauTuVan);
    console.log(nhanVienData[0].iD_NhanVien);
    // phieuTuVan.iD_KhachHang
    const chuDe = "Lịch tư vấn bảo hiểm Vietnam Health Insurance";
    const noiDung =
      "Lịch đặt tư vấn của quý khách đã được nhận, quý khách lưu ý đến đúng giờ và địa điểm. Cảm ơn quý khách!";
    try {
      const response = await YeuCauTuVanService.UpdateNhanVien(
        phieuTuVan.iD_YeuCauTuVan,
        nhanVienData[0].iD_NhanVien
      );
      console.log("YeuCauTuVan API Response:", response);
      setShowMessage(true);
      setnoiDungMessage("Đăng kí thành công!");
      try {
        const response = await SendEmail.SendEmail(
          phieuTuVan.iD_KhachHang,
          chuDe,
          noiDung
        );
      } catch (error) {
        setShowMessage(true);
        setnoiDungMessage("Không gởi được email cho khách hàng!");
        console.error("Error sending YeuCauTuVan request:", error);
      }
      navigate(`/nhanvien/NV_chonLichTuVan`);
    } catch (error) {
      setShowMessage(true);
      setnoiDungMessage("Vui lòng kiểm tra lại thông tin!");
      console.error("Error sending YeuCauTuVan request:", error);
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
          <h3 className="mb-8 mx-auto">Lịch tư vấn</h3>
          <div className="grid gap-4">
            {ds_yeucautuvan.map((phieuYCTV) => (
              <div
                key={phieuYCTV.iD_YeuCauTuVan}
                className="bg-white rounded-lg shadow-md p-4 mb-4 text-sm text-left border border-gray-500"
                style={{ paddingLeft: "20px" }}
              >
                <div style={{ marginLeft: "20px" }}>
                  <strong>iD_YeuCauTuVan:</strong> {phieuYCTV.iD_YeuCauTuVan}
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <strong>Tình trạng duyệt:</strong> {phieuYCTV.tinhTrangDuyet}
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <strong className="text-red-500">Địa điểm cuộc hẹn:</strong>{" "}
                  {phieuYCTV.diaDiem}
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <strong className="text-red-500">Thời gian hẹn gặp:</strong>{" "}
                  {phieuYCTV.thoiGian.slice(0, 10)}{" "}
                  {phieuYCTV.thoiGian.slice(-8)}
                </div>

                <div style={{ marginLeft: "20px" }}>
                  <strong>Tên khách hàng:</strong>{" "}
                  {phieuYCTV.hoTen ? phieuYCTV.hoTen : "N/A"}
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <strong>Giới tính:</strong>{" "}
                  {phieuYCTV.gioiTinh ? phieuYCTV.gioiTinh : "N/A"}
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <strong>Ngày sinh:</strong>{" "}
                  {phieuYCTV.ngaySinh ? phieuYCTV.ngaySinh.slice(0, 10) : "N/A"}
                </div>

                <div style={{ marginLeft: "20px" }}>
                  <strong>Địa chỉ nơi ở:</strong> {phieuYCTV.soNhaTenDuong},{" "}
                  {phieuYCTV.phuongXa}, {phieuYCTV.quanHuyen},{" "}
                  {phieuYCTV.thanhPho}
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <strong>email:</strong>{" "}
                  {phieuYCTV.email ? phieuYCTV.email : "N/A"}
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <strong>Số điện thoại:</strong>{" "}
                  {phieuYCTV.soDienThoai ? phieuYCTV.soDienThoai : "N/A"}
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <button
                    className="bg-green-500 text-white p-2 rounded mr-2 font-bold text-lg"
                    onClick={() => handleNhanClick(phieuYCTV)}
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

export default NV_chonLichTuVan;
