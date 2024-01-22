import React, { useEffect, useState } from "react";
import DuyetYeuCauChiTraService from "../services/DuyetYeuCauChiTra.service";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

const Nv_duyetYeuCauChiTra = () => {
  const [danhSachYeuCau, setDanhSachYeuCau] = useState([]);

  const fetchData = async () => {
    try {
      const response = await DuyetYeuCauChiTraService.getAll();
      setDanhSachYeuCau(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleDuyet = async (iD_YeuCauChiTra) => {
    await DuyetYeuCauChiTraService.duyetYeuCauChiTra(
      iD_YeuCauChiTra,
      "Đã Duyệt"
    );
    fetchData(); // Refresh the list after updating
  };

  const handleTuChoi = async (iD_YeuCauChiTra) => {
    await DuyetYeuCauChiTraService.duyetYeuCauChiTra(
      iD_YeuCauChiTra,
      "Từ Chối"
    );
    fetchData(); // Refresh the list after updating
  };

  return (
    <div className="wrapper mt-8 px-4">
      <Typography variant="h3">Danh Sách Yêu Cầu Chi Trả</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {danhSachYeuCau.map((yeuCau) => (
          <Card
            key={yeuCau.iD_YeuCauChiTra}
            className="hover:shadow-md bg-gray-100"
          >
            <CardBody className="flex flex-col items-start p-4">
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Yêu cầu chi trả
              </Typography>
              <Typography color="blue-gray">
                Người yêu cầu: {yeuCau.nguoiYeuCau}
              </Typography>
              <Typography color="blue-gray">
                Địa chỉ: {yeuCau.diaChi}
              </Typography>
              <Typography color="blue-gray">SĐT: {yeuCau.dienThoai}</Typography>
              <Typography color="blue-gray">Email: {yeuCau.email}</Typography>
              <Typography color="blue-gray">
                Mối quan hệ: {yeuCau.moiQuanHe}
              </Typography>
              <Typography color="blue-gray">
                Số tiền: {formatCurrency(yeuCau.soTienYeuCauChiTra)}
              </Typography>
              <Typography color="blue-gray">
                Ngày yêu cầu: {formatDate(yeuCau.ngayYeuCau)}
              </Typography>
              <Typography color="blue-gray">
                {" "}
                Tình trạng duyệt: {yeuCau.tinhTrangDuyet}
              </Typography>

              <div className="flex justify-between w-full mt-4">
                <Button
                  color="green"
                  onClick={() => handleDuyet(yeuCau.iD_YeuCauChiTra)}
                >
                  Duyệt
                </Button>
                <Button
                  color="red"
                  onClick={() => handleTuChoi(yeuCau.iD_YeuCauChiTra)}
                >
                  Từ Chối
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Nv_duyetYeuCauChiTra;
