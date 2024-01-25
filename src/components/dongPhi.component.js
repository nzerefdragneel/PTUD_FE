import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import KhachHangService from "../services/khachHang.service";
import HopDongService from "../services/hopDong.service";
import GoiBaoHiemService from "../services/goiBaoHiem.service";
import ChiTietDongPhi from "./chiTietDongPhi.component";
import { Button } from "@material-tailwind/react";
import authService from "../services/auth.service";
import PhieuThanhToanBaoHiemService from "../services/phieuThanhToanBaoHiem.service";

const DongPhi = () => {
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  //hợp đồng sắp đến hạn thanh toán
  // const [hopDong_SDH, sethopDong_SDH] = useState([]);
  const [GBHdata_SDH, setGBHdata_SDH] = useState([]);
  //hợp đồng quá hạn thanh toán
  // const [hopDong_QH, sethopDong_QH] = useState([]);
  const [GBHdata_QH, setGBHdata_QH] = useState([]);

  //kiểm tra có hợp đồng chưa thanh toán sắp đến hạn
  const [kiemTra, setkiemTra] = useState(false);
  //kiểm tra có hợp đồng quá hạn thanh toán không
  const [kiemTra2, setkiemTra2] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const khachHangData = await KhachHangService.getByIdTaiKhoan(
          iD_TaiKhoan
        );

        try {
          const hopDongCuaKH = await HopDongService.getByIdKhachHang(
            khachHangData.data[0].iD_KhachHang
          );
          //   lấy ra hợp đồng còn trong thời hạn
          const hopDongConTrongThoiHan = hopDongCuaKH.data.filter((hd) => {
            const ngayHieuLuc = hd.hieuLuc.slice(0, 10);
            const namHieuLuc = ngayHieuLuc.slice(0, 4);
            const soNguyen = parseInt(namHieuLuc, 10);
            const namHetHan = hd.thoiHan / 12 + soNguyen;
            // console.log(namHetHan);
            const thoiHanString = namHetHan.toString();
            const ngayHetHan_string = thoiHanString + ngayHieuLuc.slice(-6);
            // So sánh ngày hết hạn với thời gian hiện tại
            const ngayHetHan = new Date(ngayHetHan_string);
            // console.log(ngayHetHan);
            return ngayHetHan > new Date();
          });
          console.log(hopDongConTrongThoiHan.length);
          //lấy ra hợp đồng cần đóng phí
          const hopDongConHieuLuc = hopDongConTrongThoiHan.filter(
            (hd) => hd.trangThai === "Hiệu Lực"
          );
          console.log(hopDongConHieuLuc.length);
          const ds_hopDongCanDongPhi = [];
          for (const hd of hopDongConHieuLuc) {
            try {
              const response =
                await PhieuThanhToanBaoHiemService.getByIdHopDong(
                  hd.iD_HopDong
                );
              if (response.data.length < hd.thoiHan / 12) {
                ds_hopDongCanDongPhi.push({
                  idHD: hd.iD_HopDong,
                  soLan: response.data.length,
                  hLuc: hd.hieuLuc,
                  th: hd.thoiHan,
                  idGBH: hd.iD_GoiBaoHiem,
                });
              }
            } catch (error) {
              console.error("Error fetching  data:", error);
            }
          }
          console.log(ds_hopDongCanDongPhi.length);

          const ketQua_SapDenHan = ds_hopDongCanDongPhi.filter((hd) => {
            const ngayDenHanTT = new Date(hd.hLuc.slice(0, 10));
            // console.log(hd.hLuc.slice(0, 10));
            // console.log(ngayDenHanTT);
            // Lấy ngày sau khi cộng số lần năm
            const ngaySauKhiCong = new Date(ngayDenHanTT);
            ngaySauKhiCong.setFullYear(ngaySauKhiCong.getFullYear() + hd.soLan);
            // console.log(ngaySauKhiCong);
            const ngayHienTai = new Date();
            const hieu = ngaySauKhiCong.getTime() - ngayHienTai.getTime();
            // console.log(hieu);
            // số milliseconds tương ứng với 30 ngày là 2592000000
            return hieu <= 2592000000;
          });
          //lấy ra hợp đồng chưa đóng phí
          const ketQua_ChuaDongPhi = [];
          for (const hd of ketQua_SapDenHan) {
            try {
              const rep = await PhieuThanhToanBaoHiemService.getByIdHopDong(
                hd.idHD
              );
              const hanTT = new Date(hd.hLuc.slice(0, 10));
              const ngaySauKhiCong = new Date(hanTT);
              ngaySauKhiCong.setFullYear(
                ngaySauKhiCong.getFullYear() + hd.soLan
              );

              const truocNgayDenHan30Ngay = new Date(ngaySauKhiCong);
              truocNgayDenHan30Ngay.setDate(
                truocNgayDenHan30Ngay.getDate() - 30
              );
              // console.log(hd.idHD);
              // console.log(ngaySauKhiCong);
              // console.log(truocNgayDenHan30Ngay);
              //lấy hợp đồng chưa thanh toán
              const hdCtt = rep.data.filter((h) => {
                // console.log(h.ngayThanhToan.slice(0, 10));
                const ntt = new Date(h.ngayThanhToan.slice(0, 10));
                return ntt >= truocNgayDenHan30Ngay && ntt <= ngaySauKhiCong;
              });

              if (hdCtt.length === 0) {
                ketQua_ChuaDongPhi.push({
                  idHopD: hd.idHD,
                  ngayDH: ngaySauKhiCong,
                  tHan: hd.th,
                  idGBH: hd.idGBH,
                });
              }
            } catch (error) {
              console.error("Error fetching  data:", error);
            }
          }
          // console.log(ketQua_ChuaDongPhi.length);

          if (ketQua_ChuaDongPhi.length !== 0) {
            setkiemTra(true);
          }
          // sethopDong_SDH(ketQua_ChuaDongPhi);
          //lấy thông tin của gói bảo hiểm

          const ds_goiBaoHiemCTT = [];
          for (const hd of ketQua_ChuaDongPhi) {
            try {
              const rep = await GoiBaoHiemService.getByID(hd.idGBH);
              const tienCanDong = rep.data.giaTien / (hd.tHan / 12);
              ds_goiBaoHiemCTT.push({
                idhd: hd.idHopD,
                idBH: rep.data.iD_GoiBaoHiem,
                tenBaoHiem: rep.data.tenBaoHiem,
                tenGoi: rep.data.tenGoi,
                hanCuoi: hd.ngayDH,
                soTien: tienCanDong,
              });
            } catch (error) {
              console.error("Error fetching  data:", error);
            }
          }
          setGBHdata_SDH(ds_goiBaoHiemCTT);
          //hợp đồng quá hạn chưa thanh toán
          const qh = hopDongConTrongThoiHan.filter(
            (hd) => hd.trangThai === "Hết Hiệu Lực"
          );
          if (qh.length !== 0) {
            setkiemTra2(true);
          }
          // sethopDong_QH(qh);
          const ds_goiBaoHiemQH = [];
          for (const hd of qh) {
            try {
              const rep = await GoiBaoHiemService.getByID(hd.iD_GoiBaoHiem);
              const gt = rep.data.giaTien;
              const tienCanDong = gt / (hd.thoiHan / 12);
              ds_goiBaoHiemQH.push({
                idhd: hd.iD_HopDong,
                idBH: rep.data.iD_GoiBaoHiem,
                tenBaoHiem: rep.data.tenBaoHiem,
                tenGoi: rep.data.tenGoi,
                soTien: tienCanDong,
              });
            } catch (error) {
              console.error("Error fetching  data:", error);
            }
          }
          setGBHdata_QH(ds_goiBaoHiemQH);
          //lấy thông tin gói bảo hiểm quá hạn
        } catch (error) {
          console.error("Error fetching goiBaoHiem data:", error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleXemChiTietClick = (bHiem) => {
    navigate(`/chiTietDongPhi/${bHiem.idhd}`, {
      state: { bHiem },
    });
  };

  return (
    <header className="wrapper mt-8 space-y-4 text-center">
      {kiemTra ? (
        <div>
          <h3 className="mb-8 mx-auto">
            Danh sách gói bảo hiểm đến hạn thanh toán
          </h3>
          <div className="grid gap-4">
            {GBHdata_SDH.map((bHiem) => (
              <div
                key={bHiem.idhd}
                className="goiBaoHiemItem grid grid-cols-3 gap-4 border border-blue-500 rounded items-center h-full"
              >
                <div>
                  <p className="text-bold text-lg text-gray-600 font-weight mb-4 !important">
                    {bHiem.tenBaoHiem}
                  </p>
                  <p className="text-gray-600 mb-4">Gói {bHiem.tenGoi}</p>
                </div>
                <div>
                  <p className="text-red-600 mb-4">
                    Hạn cuối: {bHiem.hanCuoi.toISOString().slice(0, 10)}
                  </p>
                  <p className="text-bold font-bold text-black-600 mb-4">
                    Số tiền: {Math.round(bHiem.soTien)} VNĐ
                  </p>
                </div>
                <Button
                  onClick={() => handleXemChiTietClick(bHiem)}
                  className="h-1/2  w-40 bg-green-500 text-white px-2 py-1 float-right w-auto ml-auto"
                >
                  Thanh toán
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3>Danh sách gói bảo hiểm đến hạn thanh toán</h3>
          <p>không có.</p>
        </div>
      )}
      {kiemTra2 ? (
        <div>
          <h3 className="mb-8 mx-auto">
            Danh sách gói bảo hiểm quá hạn thanh toán
          </h3>
          <p>Quý khách vui lòng liên hệ công ty bảo hiểm để giải quyết!</p>
          <div className="grid gap-4">
            {GBHdata_QH.map((bHiem) => (
              <div
                key={bHiem.idhd}
                className="goiBaoHiemItem grid grid-cols-3 gap-4 border border-blue-500 rounded "
              >
                <p className="text-bold text-lg text-gray-600 mb-4">
                  {bHiem.tenBaoHiem}
                </p>
                <p className="text-gray-600 mb-4">Gói {bHiem.tenGoi}</p>
                <p className="text-bold text-gray-600 mb-4">
                  Số tiền: {Math.round(bHiem.soTien)} VNĐ
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3>Danh sách gói bảo hiểm quá hạn thanh toán</h3>
          <p>không có.</p>
        </div>
      )}
    </header>
  );
};

export default DongPhi;
