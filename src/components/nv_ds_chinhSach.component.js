import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GoiBaoHiemService from "../services/goiBaoHiem.service";
import { Button, Input } from "@material-tailwind/react";
import ChiTietChinhSachService from "../services/ChiTietChinhSach.service";
import ChinhSachService from "../services/ChinhSach.service";
import authService from "../services/auth.service";
const NV_ds_chinhSach = () => {
  const {
    state: { goiSanPham: goiBaohiem },
  } = useLocation();
  //chặn vô thẳng bằng link
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  console.log(goiBaohiem);
  //loading
  const [kiemTra, setkiemTra] = useState(false);
  const [soChinhSach, setsoChinhSach] = useState(null);
  const [danhSachChinhSach, setDanhSachChinhSach] = useState([]);
  //idChinhSach muốn thêm
  const [idCSach, setidCSach] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ChiTietChinhSachService.getByIdGoiBaoHiem(
          goiBaohiem.iD_GoiBaoHiem
        );
        console.log(response.data);
        setkiemTra(true);
        const data = response.data.filter(
          (cs) => cs.ngayKetThuc === "0001-01-01T00:00:00"
        );
        console.log(data);
        setDanhSachChinhSach(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [danhSachChinhSach]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ds_cs = await ChinhSachService.getAll();
        console.log(ds_cs.data.length);

        setsoChinhSach(ds_cs.data.length);
        setkiemTra(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleXemChiTietClick = (chinhSach) => {};
  const handleThemClick = async (idCSach) => {
    const ngayBatDau = new Date();
    const ChiChuaSo = (address) => {
      const numberRegex = /^\d+$/; // Biểu thức chính quy cho chuỗi chỉ chứa số

      return numberRegex.test(address);
    };
    if (!ChiChuaSo(idCSach)) {
      alert("idChinhSach không hợp lệ!");
      return;
    }
    if (idCSach < 1 || idCSach > soChinhSach) {
      alert("idChinhSach không tồn tại!");
      return;
    }
    try {
      const response = await ChiTietChinhSachService.ThemChinhSachChoGoiBaoHiem(
        goiBaohiem.iD_GoiBaoHiem,
        idCSach,
        ngayBatDau
      );
      alert("Thêm thành công");
      console.log("vo hieu hoa API Response:", response);
    } catch (error) {
      alert("Không thể vô hiệu hóa được");
      console.error("Error fetching data:", error);
    }
  };

  const handleHuyClick = async (chinhSach) => {
    const ngayKetThuc = new Date();
    try {
      const response = await ChiTietChinhSachService.voHieuHoaChinhSach(
        chinhSach.id,
        ngayKetThuc
      );
      alert("Vô hiệu hóa thành công");
      console.log("vo hieu hoa API Response:", response);
    } catch (error) {
      alert("Không thể vô hiệu hóa được");
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {kiemTra ? (
        <header className="wrapper mt-8 space-y-4 text-center">
          <div
            key={goiBaohiem.iD_GoiBaoHiem}
            className="goiBaoHiemItem custom-border grid grid-cols-3 gap-4  rounded cursor-pointer"
          >
            <p className="text-black-600 mb-2 mt-2">
              ID_GoiBaoHiem: {goiBaohiem.iD_GoiBaoHiem}
            </p>
            <p className="text-black-600 mb-2 mt-2">{goiBaohiem.tenBaoHiem}</p>
            <p className="text-black-600 mb-2 mt-2">Gói {goiBaohiem.tenGoi}</p>
          </div>
          <h3 className="mb-8 mx-auto">Danh sách chính sách</h3>
          <div className="col-span-3 flex items-center mb-2 mt-2">
            <p className="font-bold text-gray-600 mr-2 ml-2 mt-2">
              iD_ChinhSach:
            </p>
            <div className="flex space-x-2">
              <Input
                type="text"
                name="idCSach"
                maxLength="100"
                value={idCSach}
                onChange={(e) => setidCSach(e.target.value)}
                placeholder="ví dụ: 1"
                className="w-32"
              />
              <Button
                onClick={() => handleThemClick(idCSach)}
                className="bg-green-500 text-white px-4 py-2"
              >
                Thêm
              </Button>
            </div>
          </div>
          <div className="grid gap-4 border border-gray-300 rounded">
            {danhSachChinhSach.map((chinhSach) => (
              <div
                key={chinhSach.iD_ChinhSach}
                className="goiBaoHiemItem grid grid-cols-4 gap-4 border border-blue-500 rounded "
              >
                <p className="text-gray-600 mb-2 mt-2 flex justify-start space-x-2 ml-2">
                  iD_ChinhSach: {chinhSach.iD_ChinhSach}
                </p>
                <p className="text-gray-600 mb-2 mt-2">
                  Ngày bắt đầu: {chinhSach.ngayBatDau.slice(0, 10)}
                </p>
                <div className="col-span-2 flex justify-end space-x-2">
                  {/* <Button
                    onClick={() => handleXemChiTietClick(chinhSach)}
                    className="bg-blue-500 text-white px-4 py-2"
                  >
                    Xem
                  </Button> */}
                  <Button
                    onClick={() => handleHuyClick(chinhSach)}
                    className="bg-red-500 text-white px-4 py-2 mr-2"
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </header>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default NV_ds_chinhSach;
