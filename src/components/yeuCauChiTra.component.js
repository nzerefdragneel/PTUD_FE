import React, { Component, useEffect, useState, useCallback } from "react";
import KhachHangService from "../services/khachHang.service";
import QuanLyBaoHiemService from "../services/quanLyBaoHiem.service";
import YeuCauChiTraService from "../services/yeuCauChiTra.service";
import GoiBaoHiemService from "../services/goiBaoHiem.service";
import authService from "../services/auth.service";
import { Button, Input } from "@material-tailwind/react";
import DialogDefault from "./dialog";
const required = (value) => {
  if (!value) {
    return (
      <div className="text-error-color text-base" role="alert">
        Thông tin này không được bỏ trống !
      </div>
    );
  }
};
const YeuCauChiTra = () => {
  //lấy idtaikhoan từ bảng tài khoản
  // const user = this.props.dataFromParent.iD_TaiKhoan;
  const user = authService.getCurrentUser();
  const iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  //cờ kiểm tra nếu user gởi lại cùng một nội dung
  const [daGuiYeuCau, setDaGuiYeuCau] = useState(false);
  const [GoiBaoHiemData, setGoiBaoHiemData] = useState([]);
  const [QuanLyBaoHiem, setQuanLyBaoHiem] = useState([]);
  const [GBH, setSelectGoiBaoHiem] = useState(null);
  const [nguoiYeuCau, setnguoiYeuCau] = useState(null);
  const [moiQuanHe, setmoiQuanHe] = useState(null);
  const [diaChi, setdiaChi] = useState(null);
  const [dienThoai, setdienThoai] = useState(null);
  const [soTienYeuCauChiTra, setsoTienYeuCauChiTra] = useState(null);
  const [truongHopChiTra, settruongHopChiTra] = useState(null);
  const [noiDieuTri, setnoiDieuTri] = useState(null);
  const [chanDoan, setchanDoan] = useState(null);
  const [hauQua, sethauQua] = useState(null);
  const [hinhThucDieuTri, sethinhThucDieuTri] = useState(null);
  const [ngayBatDau, setngayBatDau] = useState(null);
  const [ngayKetThuc, setngayKetThuc] = useState(null);
  const [email, setemail] = useState(null);
  const [hinhHoaDon, sethinhHoaDon] = useState(null);
  const [danhSachDaLay, setDanhSachDaLay] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [kiemTra, setkiemTra] = useState(false);
  const [noiDungMessage, setnoiDungMessage] = useState(null);

  console.log(user.taiKhoan.iD_TaiKhoan);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const khachHangData = await KhachHangService.getByIdTaiKhoan(
          iD_TaiKhoan
        );
        console.log(khachHangData);
        try {
          const response = await QuanLyBaoHiemService.getByIDKH(
            khachHangData.data[0].iD_KhachHang
          );
          console.log(response.data);
          setkiemTra(true);
          const baoHiemConHieuLuc = response.data.filter(
            (goi) => new Date(goi.thoiGianKetThuc) > new Date()
          );
          console.log(baoHiemConHieuLuc.length);
          if (baoHiemConHieuLuc.length === 0) {
            setkiemTra(false);
            return;
          }
          setQuanLyBaoHiem(baoHiemConHieuLuc);
          const goiChuaLay = baoHiemConHieuLuc.filter(
            (goi) => !danhSachDaLay.includes(goi.iD_GoiBaoHiem)
          );
          // Lấy thông tin từng gói bảo hiểm
          const dsGoiBaoHiem = [];
          for (const goi of goiChuaLay) {
            try {
              console.log(goi.iD_GoiBaoHiem);
              console.log(goi);
              const duLieu = await GoiBaoHiemService.getByID(goi.iD_GoiBaoHiem);
              console.log(duLieu);
              dsGoiBaoHiem.push(duLieu.data);
            } catch (error) {
              console.error("Error fetching goiBaoHiem data:", error);
            }
          }
          console.log(dsGoiBaoHiem);
          console.log(GoiBaoHiemData);

          setGoiBaoHiemData(dsGoiBaoHiem);
          console.log(GoiBaoHiemData);
          setDanhSachDaLay((prevDanhSachDaLay) => [
            ...prevDanhSachDaLay,
            ...goiChuaLay.map((goi) => goi.iD_GoiBaoHiem),
          ]);
          // {GoiBaoHiemData?()}
        } catch (error) {
          console.error("Error fetching goiBaoHiem data:", error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleYeuCauChiTra = async () => {
    console.log(GBH);
    // Kiểm tra xem có trường thông tin nào trống không
    if (!GBH) {
      setShowMessage(true);
      setnoiDungMessage("Bạn chưa chọn gói bảo hiểm!");
      return;
    }
    console.log(GBH);
    if (!soTienYeuCauChiTra) {
      setShowMessage(true);
      setnoiDungMessage("Bạn chưa nhập số tiền!");
      return;
    }
    if (!nguoiYeuCau) {
      setShowMessage(true);
      setnoiDungMessage("Bạn chưa nhập người yêu cầu!");
      return;
    }
    if (!truongHopChiTra) {
      setShowMessage(true);
      setnoiDungMessage("Bạn chưa nhập trường hợp chi trả!");
      return;
    }
    if (!moiQuanHe) {
      setShowMessage(true);
      setnoiDungMessage("Bạn chưa nhập mối quan hệ!");
      return;
    }
    if (!noiDieuTri) {
      setShowMessage(true);
      setnoiDungMessage("Bạn chưa nhập nơi điều trị!");
      return;
    }
    if (!diaChi) {
      setShowMessage(true);
      setnoiDungMessage("Bạn chưa nhập địa chỉ!");
      return;
    }
    if (!chanDoan) {
      setShowMessage(true);
      setnoiDungMessage("Bạn chưa nhập chẩn đoán!");
      return;
    }
    if (!dienThoai) {
      setShowMessage(true);
      setnoiDungMessage("Bạn chưa nhập số điện thoại!");
      return;
    }
    if (!hauQua) {
      setShowMessage(true);
      setnoiDungMessage("Bạn chưa nhập hậu quả!");
      return;
    }
    if (!email) {
      setShowMessage(true);
      setnoiDungMessage("Bạn chưa nhập email!");
      return;
    }
    if (!hinhThucDieuTri) {
      setShowMessage(true);
      setnoiDungMessage("Bạn chưa nhập hình thức điều trị!");
      return;
    }
    if (!ngayBatDau) {
      setShowMessage(true);
      setnoiDungMessage("Bạn chưa chọn ngày bắt đầu!");
      return;
    }
    if (!ngayKetThuc) {
      setShowMessage(true);
      setnoiDungMessage("Bạn chưa chọn ngày kết thúc!");
      return;
    }

    if (!hinhHoaDon) {
      setShowMessage(true);
      setnoiDungMessage("Bạn chưa chọn hình hóa đơn!");
      return;
    }
    const qlbhid = QuanLyBaoHiem.find((qlbh) => qlbh.iD_GoiBaoHiem === +GBH);
    // const qlbhid = QuanLyBaoHiem.find(
    //   (qlbh) => qlbh.iD_GoiBaoHiem === GoiBaoHiem.iD_GoiBaoHiem
    // );
    console.log(qlbhid);
    try {
      const response = await YeuCauChiTraService.EditYeuCauChiTra(
        qlbhid?.id,
        soTienYeuCauChiTra,
        nguoiYeuCau,
        truongHopChiTra,
        moiQuanHe,
        noiDieuTri,
        diaChi,
        chanDoan,
        dienThoai,
        hauQua,
        email,
        hinhThucDieuTri,
        ngayBatDau,
        ngayKetThuc,
        hinhHoaDon
      );

      console.log("YeuCauChiTra API Response:", response);
      setShowMessage(true);
      setnoiDungMessage("Gửi yêu cầu thành công!");
    } catch (error) {
      setShowMessage(true);
      setnoiDungMessage("Vui lòng kiểm tra lại thông tin!");
      console.error("Error sending YeuCauChiTra request:", error);
    }
  };
  const closeMessage = () => {
    setShowMessage(false);
  };
  return (
    <div>
      {showMessage && (
        <DialogDefault handler={closeMessage} message={noiDungMessage} />
      )}
      {kiemTra ? (
        <div>
          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Chọn gói bảo hiểm
            </label>

            <select
              name="GoiBaoHiem"
              value={GBH}
              id="GoiBaoHiem"
              form="healthDeclaration"
              className="block w-10% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setSelectGoiBaoHiem(e.target.value)}
            >
              <option value=""> -- Chọn -- </option>
              {GoiBaoHiemData.map((goiSanPham) => (
                <option
                  key={goiSanPham.iD_GoiBaoHiem}
                  value={goiSanPham.iD_GoiBaoHiem}
                >
                  {goiSanPham.tenBaoHiem}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Họ tên người yêu cầu
            </label>
            <Input
              type="text"
              name="nguoiYeuCau"
              value={nguoiYeuCau}
              required="true"
              onChange={(e) => setnguoiYeuCau(e.target.value)}
              autocomplete="on"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Mối quan hệ với chủ sở hữu bảo hiểm
            </label>
            <Input
              type="text"
              name="moiQuanHe"
              value={moiQuanHe}
              required="true"
              onChange={(e) => setmoiQuanHe(e.target.value)}
              autocomplete="on"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Địa chỉ
            </label>
            <Input
              type="text"
              name="diaChi"
              value={diaChi}
              required="true"
              onChange={(e) => setdiaChi(e.target.value)}
              autocomplete="on"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Số điện thoại
            </label>
            <Input
              type="text"
              name="dienThoai"
              value={dienThoai}
              required="true"
              onChange={(e) => setdienThoai(e.target.value)}
              autocomplete="on"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={email}
              required="true"
              onChange={(e) => setemail(e.target.value)}
              autocomplete="on"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Số tiền yêu cầu chi trả `(VNĐ)`
            </label>
            <Input
              type="text"
              name="soTienYeuCauChiTra"
              value={soTienYeuCauChiTra}
              required="true"
              onChange={(e) => setsoTienYeuCauChiTra(e.target.value)}
              autocomplete="on"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Trường hợp chi trả
            </label>
            <Input
              type="text"
              name="truongHopChiTra"
              value={truongHopChiTra}
              required="true"
              onChange={(e) => settruongHopChiTra(e.target.value)}
              autocomplete="on"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Nơi điều trị
            </label>
            <Input
              type="text"
              name="noiDieuTri"
              value={noiDieuTri}
              required="true"
              onChange={(e) => setnoiDieuTri(e.target.value)}
              autocomplete="on"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Kết quả chẩn đoán
            </label>
            <Input
              type="text"
              name="chanDoan"
              value={chanDoan}
              required="true"
              onChange={(e) => setchanDoan(e.target.value)}
              autocomplete="on"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Hậu quả
            </label>
            <Input
              type="text"
              name="hauQua"
              value={hauQua}
              required="true"
              onChange={(e) => sethauQua(e.target.value)}
              autocomplete="on"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Hình thức điều trị
            </label>
            <Input
              type="text"
              name="hinhThucDieuTri"
              value={hinhThucDieuTri}
              required="true"
              onChange={(e) => sethinhThucDieuTri(e.target.value)}
              autocomplete="on"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Ngày bắt đầu điều trị
            </label>
            <input
              id="ngayBatDau"
              name="ngayBatDau"
              type="date"
              autoComplete="off"
              validations={required}
              onInput={(e) => setngayBatDau(e.target.value)}
              className="block w-20% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Ngày kết thúc điều trị
            </label>
            <input
              id="ngayKetThuc"
              name="ngayKetThuc"
              type="date"
              autoComplete="off"
              validations={required}
              onInput={(e) => setngayKetThuc(e.target.value)}
              className="block w-20% rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Link Hình hóa đơn
            </label>
            <Input
              type="text"
              name="hinhHoaDon"
              value={hinhHoaDon}
              required="true"
              onChange={(e) => sethinhHoaDon(e.target.value)}
              autocomplete="on"
            />
          </div>
          <Button
            onClick={handleYeuCauChiTra}
            className="bg-blue-500 text-white px-4 py-2"
          >
            GỬI YÊU CẦU
          </Button>
        </div>
      ) : (
        <div>
          <h3>Không có gói bảo hiểm nào!</h3>
        </div>
      )}
    </div>
  );
};

export default YeuCauChiTra;
