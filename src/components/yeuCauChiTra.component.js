import React, { Component, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import KhachHangService from "../services/khachHang.service";
import HopDongService from "../services/hopDong.service";
import YeuCauChiTraService from "../services/yeuCauChiTra.service";
import GoiBaoHiemService from "../services/goiBaoHiem.service";
import QuanLyBaoHiemService from "../services/quanLyBaoHiem.service";
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
  const [kiemTra, setkiemTra] = useState(false);
  //lấy idtaikhoan từ bảng tài khoản
  // const user = this.props.dataFromParent.iD_TaiKhoan;
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);

  //cờ kiểm tra nếu user gởi lại cùng một nội dung
  const [daGuiYeuCau, setDaGuiYeuCau] = useState(false);
  const [GoiBaoHiemData, setGoiBaoHiemData] = useState([]);
  const [baoHiemDangDung, setbaoHiemDangDung] = useState([]);
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
          const response = await HopDongService.getByIdKhachHang(
            khachHangData.data.iD_KhachHang
          );

          const baoHiemConHieuLuc = response.data.filter(
            (hd) => hd.trangThai === "Hiệu Lực"
          );
          console.log(baoHiemConHieuLuc.length);
          if (baoHiemConHieuLuc.length !== 0) {
            setkiemTra(true);
          }
          setQuanLyBaoHiem(baoHiemConHieuLuc);

          // Lấy thông tin từng gói bảo hiểm
          const dsGoiBaoHiem = [];
          for (const goi of baoHiemConHieuLuc) {
            try {
              const duLieu = await GoiBaoHiemService.getByID(goi.iD_GoiBaoHiem);

              dsGoiBaoHiem.push(duLieu.data);
            } catch (error) {
              console.error("Error fetching goiBaoHiem data:", error);
            }
          }
          console.log(dsGoiBaoHiem);
          console.log(GoiBaoHiemData);

          setGoiBaoHiemData(dsGoiBaoHiem);
          try {
            const dl = await QuanLyBaoHiemService.getByIDKH(
              khachHangData.data.iD_KhachHang
            );
            const bHiem = dl.data.filter((bh) => {
              const ngayKT = new Date(bh.thoiGianKetThuc);
              const ngayHT = new Date();
              return ngayKT > ngayHT;
            });
            setbaoHiemDangDung(bHiem);
          } catch (error) {
            console.error("Error fetching  data:", error);
          }
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
    //kiểm tra hợp lệ

    const chiChuaKhoangTrang = (dc) => {
      const addressRegex = /^\s+$/;

      return addressRegex.test(dc);
    };
    //kiểm tra thông tin trường địa chỉ
    const diaChiHopLe = (dc) => {
      const addressRegex = /^[^a-zA-Z0-9]+$/; // Biểu thức chính quy cho địa chỉ

      return addressRegex.test(dc);
    };
    //kiểm tra chỉ chứa toàn số
    const ChiChuaSo = (address) => {
      const numberRegex = /^\d+$/; // Biểu thức chính quy cho chuỗi chỉ chứa số

      return numberRegex.test(address);
    };
    if (diaChiHopLe(nguoiYeuCau)) {
      setShowMessage(true);
      setnoiDungMessage("Tên người yêu cầu không hợp lệ!");
      return;
    }
    if (chiChuaKhoangTrang(nguoiYeuCau)) {
      setShowMessage(true);
      setnoiDungMessage("Tên người yêu cầu không hợp lệ!");
      return;
    }
    if (ChiChuaSo(nguoiYeuCau)) {
      setShowMessage(true);
      setnoiDungMessage("Tên người yêu cầu không hợp lệ!");
      return;
    }
    if (
      moiQuanHe !== "con" &&
      moiQuanHe !== "vợ" &&
      moiQuanHe !== "chồng" &&
      moiQuanHe !== "cha" &&
      moiQuanHe !== "mẹ" &&
      moiQuanHe !== "anh" &&
      moiQuanHe !== "chị" &&
      moiQuanHe !== "em" &&
      moiQuanHe !== "người thân" &&
      moiQuanHe !== "người giám hộ" &&
      moiQuanHe !== "người quen" &&
      moiQuanHe !== "ông" &&
      moiQuanHe !== "bà" &&
      moiQuanHe !== "cháu" &&
      moiQuanHe !== "khác"
    ) {
      setShowMessage(true);
      setnoiDungMessage("Vui lòng chỉ chọn mối quan hệ trong trường có sẵn!");
      return;
    }
    if (diaChiHopLe(diaChi)) {
      setShowMessage(true);
      setnoiDungMessage("Địa chỉ bạn nhập không hợp lệ!");
      return;
    }
    if (chiChuaKhoangTrang(diaChi)) {
      setShowMessage(true);
      setnoiDungMessage("Địa chỉ không hợp lệ!");
      return;
    }
    if (ChiChuaSo(diaChi)) {
      setShowMessage(true);
      setnoiDungMessage("Địa chỉ không hợp lệ!");
      return;
    }
    if (!ChiChuaSo(dienThoai)) {
      setShowMessage(true);
      setnoiDungMessage("Số điện thoại bạn nhập không hợp lệ!");
      return;
    }
    function emailHopLe(e) {
      // Biểu thức chính quy kiểm tra địa chỉ email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(e);
    }
    if (!emailHopLe(email)) {
      setShowMessage(true);
      setnoiDungMessage("Email bạn nhập không hợp lệ!");
      return;
    }
    function soTienHopLe(t) {
      // Biểu thức chính quy kiểm tra số tiền
      const amountRegex = /^\d+(\.\d{1,2})?$/;
      return amountRegex.test(t);
    }
    if (!soTienHopLe(soTienYeuCauChiTra)) {
      setShowMessage(true);
      setnoiDungMessage("Số tiền bạn nhập không hợp lệ!");
      return;
    }
    if (diaChiHopLe(truongHopChiTra)) {
      setShowMessage(true);
      setnoiDungMessage("Trường hợp chi trả không hợp lệ!");
      return;
    }
    if (chiChuaKhoangTrang(truongHopChiTra)) {
      setShowMessage(true);
      setnoiDungMessage("Trường hợp chi trả không hợp lệ!");
      return;
    }
    if (ChiChuaSo(truongHopChiTra)) {
      setShowMessage(true);
      setnoiDungMessage("Trường hợp chi trả không hợp lệ!");
      return;
    }
    if (diaChiHopLe(noiDieuTri)) {
      setShowMessage(true);
      setnoiDungMessage("Nơi điều trị không hợp lệ!");
      return;
    }
    if (chiChuaKhoangTrang(noiDieuTri)) {
      setShowMessage(true);
      setnoiDungMessage("Nơi điều trị không hợp lệ!");
      return;
    }
    if (ChiChuaSo(noiDieuTri)) {
      setShowMessage(true);
      setnoiDungMessage("Nơi điều trị không hợp lệ!");
      return;
    }
    if (diaChiHopLe(chanDoan)) {
      setShowMessage(true);
      setnoiDungMessage("Kết quả chẩn đoán không hợp lệ!");
      return;
    }
    if (chiChuaKhoangTrang(chanDoan)) {
      setShowMessage(true);
      setnoiDungMessage("Kết quả chẩn đoán không hợp lệ!");
      return;
    }
    if (ChiChuaSo(chanDoan)) {
      setShowMessage(true);
      setnoiDungMessage("Kết quả chẩn đoán không hợp lệ!");
      return;
    }
    if (diaChiHopLe(hauQua)) {
      setShowMessage(true);
      setnoiDungMessage("Hậu quả không hợp lệ!");
      return;
    }
    if (chiChuaKhoangTrang(hauQua)) {
      setShowMessage(true);
      setnoiDungMessage("Hậu quả không hợp lệ!");
      return;
    }
    if (ChiChuaSo(hauQua)) {
      setShowMessage(true);
      setnoiDungMessage("Hậu quả không hợp lệ!");
      return;
    }
    if (diaChiHopLe(hinhThucDieuTri)) {
      setShowMessage(true);
      setnoiDungMessage("Hình thức điều trị không hợp lệ!");
      return;
    }

    if (chiChuaKhoangTrang(hinhThucDieuTri)) {
      setShowMessage(true);
      setnoiDungMessage("Hình thức điều trị không hợp lệ!");
      return;
    }
    if (ChiChuaSo(hinhThucDieuTri)) {
      setShowMessage(true);
      setnoiDungMessage("Hình thức điều trị không hợp lệ!");
      return;
    }
    const qlbhid = baoHiemDangDung.find((qlbh) => qlbh.iD_GoiBaoHiem === +GBH);
    const ngayYeuCau = new Date();
    console.log(ngayYeuCau);
    console.log(qlbhid);
    try {
      const response = await YeuCauChiTraService.EditYeuCauChiTra(
        qlbhid?.id,
        soTienYeuCauChiTra,
        nguoiYeuCau,
        truongHopChiTra,
        moiQuanHe,
        ngayYeuCau,
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
                  {goiSanPham.tenBaoHiem} (Gói {goiSanPham.tenGoi})
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
              maxLength="30"
              value={nguoiYeuCau}
              required="true"
              onChange={(e) => setnguoiYeuCau(e.target.value)}
              autocomplete="on"
              placeholder="ví dụ: Nguyễn Văn A"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Mối quan hệ với chủ sở hữu bảo hiểm
            </label>
            <Input
              type="text"
              name="moiQuanHe"
              maxLength="20"
              value={moiQuanHe}
              required="true"
              onChange={(e) => setmoiQuanHe(e.target.value)}
              autocomplete="on"
              placeholder="ví dụ: con "
              list="moiQuanHeList"
            />
            <datalist id="moiQuanHeList">
              <option value="con" />
              <option value="vợ" />
              <option value="chồng" />
              <option value="cha" />
              <option value="mẹ" />
              <option value="anh" />
              <option value="chị" />
              <option value="em" />
              <option value="người thân" />
              <option value="người giám hộ" />
              <option value="người quen" />
              <option value="ông" />
              <option value="bà" />
              <option value="cháu" />
              <option value="khác" />
            </datalist>
          </div>
          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Địa chỉ
            </label>
            <Input
              type="text"
              name="diaChi"
              maxLength="100"
              value={diaChi}
              required="true"
              placeholder="ví dụ: 17 Âu Cơ, Cô Giang, quận 1, Hồ Chí Minh"
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
              maxLength="10"
              placeholder="ví dụ: 0123456789"
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
              maxLength="30"
              placeholder="ví dụ: nguyenvana@gmail.com"
              value={email}
              required="true"
              onChange={(e) => setemail(e.target.value)}
              autocomplete="on"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username" className="font-semibold mb-2">
              Số tiền yêu cầu chi trả (VNĐ)
            </label>
            <Input
              type="text"
              maxLength="21"
              name="soTienYeuCauChiTra"
              placeholder="ví dụ: 150000.567 ---(tối đa 2 số thập phân sau dấu chấm)"
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
              maxLength="50"
              name="truongHopChiTra"
              placeholder="ví dụ: nằm viện"
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
              placeholder="ví dụ: bệnh viện Tân Phú"
              maxLength="100"
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
              placeholder="nhập kết quả chẩn đoán"
              maxLength="50"
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
              placeholder="nhập hậu quả"
              maxLength="50"
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
              placeholder="nhập hình thức điều trị ví dụ: uống thuốc,..."
              maxLength="50"
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
              Hình hóa đơn
            </label>
            <Input
              type="text"
              name="hinhHoaDon"
              maxLength="100"
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
