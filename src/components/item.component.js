import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoiBaoHiemService from "../services/goiBaoHiem.service";
import { Button } from "@material-tailwind/react";

const GoiBaoHiem = () => {
  const [danhSachGoiSanPham, setDanhSachGoiSanPham] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GoiBaoHiemService.getAll();
        const data = response.data.filter(
          (gbh) => gbh.tinhTrang === "Đang Phát Hành"
        );
        setDanhSachGoiSanPham(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleXemChiTietClick = (goiSanPham) => {
    // Chuyển hướng tới trang chi tiết và truyền dữ liệu gói bảo hiểm qua đường dẫn
    navigate(`/chi-tiet-goi-bao-hiem/${goiSanPham.iD_GoiBaoHiem}`, {
      state: { goiSanPham },
    });
  };

  return (
    <header className="wrapper mt-8">
      <div className="grid grid-cols-3 gap-4">
        {danhSachGoiSanPham.map((goiSanPham) => (
          <div
            key={goiSanPham.iD_GoiBaoHiem}
            className="goiBaoHiemItem border border-solid border-teal-500 p-4"
          >
            <img
              src={goiSanPham.hinhAnh}
              alt="Bao Hiem Image"
              className="anhbaohiem"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <h3 className="text-lg font-semibold mb-2">
              {goiSanPham.tenBaoHiem}
            </h3>
            <p className="text-gray-600 mb-4"> Gói {goiSanPham.tenGoi}</p>
            <p className="text-gray-600 mb-4">
              {goiSanPham.moTa.substring(0, 20) + "..."}
            </p>

            <div>
              <Button
                onClick={() => handleXemChiTietClick(goiSanPham)}
                className="bg-blue-500 text-white px-4 py-2"
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

export default GoiBaoHiem;
