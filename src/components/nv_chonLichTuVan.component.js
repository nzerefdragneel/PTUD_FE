import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YeuCauTuVanService from "../services/yeuCauTuVan.service";
import NhanVienService from "../services/nhanVien.service";
import { Button, alert } from "@material-tailwind/react";
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
        setds_yeucautuvan(ds_khongCoNVHienTai);
        console.log(ds_khongCoNVHienTai);
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
            {ds_yeucautuvan.map((phieuTuVan) => (
              <div
                key={phieuTuVan.iD_YeuCauTuVan}
                className="goiBaoHiemItem grid grid-cols-3 gap-4 border border-blue-500 rounded cursor-pointer"
              >
                <p className="text-gray-600 mb-4">
                  iD_YeuCauTuVan: {phieuTuVan.iD_YeuCauTuVan}
                </p>
                <p className="text-gray-600 mb-4">{phieuTuVan.diaDiem}</p>
                <p className="text-gray-600 mb-4">
                  {phieuTuVan.thoiGian.slice(0, 10)}
                </p>
                <p className="text-gray-600 mb-4">
                  {phieuTuVan.thoiGian.slice(-8)}
                </p>
                <Button
                  onClick={() => handleNhanClick(phieuTuVan)}
                  className="bg-green-500 text-white px-4 py-2 mb-4"
                >
                  Nhận
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default NV_chonLichTuVan;
