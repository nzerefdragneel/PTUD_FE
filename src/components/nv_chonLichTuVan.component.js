import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YeuCauTuVanService from "../services/yeuCauTuVan.service";
import NhanVienService from "../services/nhanVien.service";
import { Button } from "@material-tailwind/react";
import SendEmail from "../services/sendEmail.service";
import authService from "../services/auth.service";
import DialogDefault from "./dialog";
const NV_chonLichTuVan = () => {
  const user = authService.getCurrentUser();
  // const iD_TaiKhoan = user.id;
  const iD_TaiKhoan = 1;
  const [nhanVienData, setnhanVienData] = useState([]);
  const [ds_yeucautuvan, setds_yeucautuvan] = useState([]);
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
        setds_yeucautuvan(ds_khongCoNVHienTai);
        console.log(ds_khongCoNVHienTai);
        ds_yeucautuvan.sort(
          (a, b) => new Date(a.thoiGian) - new Date(b.thoiGian)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [ds_yeucautuvan]);
  useEffect(() => {
    console.log(nhanVienData);
  }, []);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleNhanClick = async (phieuTuVan) => {
    console.log(ds_yeucautuvan);
    console.log(nhanVienData[0].iD_NhanVien);
    const chuDe = "Lịch tư vấn bảo hiểm Vietnam Health Insurance";
    const noiDung =
      "Lịch đặt tư vấn của quý khách đã được nhận, quý khách lưu ý đến đúng giờ và địa điểm. Cảm ơn quý khách!";
    try {
      const response = await YeuCauTuVanService.UpdateNhanVien(
        phieuTuVan.iD_KhachHang,
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
      <h3 className="mb-8 mx-auto text-2xl font-bold">Lịch tư vấn</h3>
      <div className="grid gap-4">
        {ds_yeucautuvan.map((phieuTuVan) => (
          <div
            key={phieuTuVan.iD_YeuCauTuVan}
            className="goiBaoHiemItem flex flex-col md:flex-row justify-between items-center p-4 border border-blue-500 rounded shadow-lg transition-all hover:shadow-xl my-2"
          >
            <div className="flex flex-col text-left mb-4 md:mb-0">
              <p className="font-semibold">ID: {phieuTuVan.iD_YeuCauTuVan}</p>
              <p className="text-gray-800">
                Ngày: {formatDate(phieuTuVan.thoiGian)}
              </p>
              <p className="text-gray-800">
                Thời gian: {phieuTuVan.thoiGian.slice(-8)}
              </p>
              <p className="text-gray-800">Địa điểm: {phieuTuVan.diaDiem}</p>
            </div>
            <Button
              onClick={() => handleNhanClick(phieuTuVan)}
              className="bg-green-500 text-white px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-green-600 self-start md:self-center"
            >
              Nhận
            </Button>
          </div>
        ))}
      </div>
    </header>
  );
};

export default NV_chonLichTuVan;
