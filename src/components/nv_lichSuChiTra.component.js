import React, { useEffect, useState } from "react";
import LichSuChiTraService from "../services/lichSuChiTra.service";
import DuyetYeuCauChiTraService from "../services/DuyetYeuCauChiTra.service";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
} from "@material-tailwind/react";

const Nv_lichSuChiTra = () => {
  const [danhSachLichSuChiTra, setDanhSachLichSuChiTra] = useState([]);
  const [selectedYCTra, setSelectedYCTra] = useState(null);
  const [isYCTraDialogOpen, setIsYCTraDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const fetchData = async () => {
    try {
      const response = await LichSuChiTraService.getAllLichSuChiTra();
      setDanhSachLichSuChiTra(response.data);
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

  const openYCTraDialog = async (idYeuCauChiTra) => {
    try {
      const response = await DuyetYeuCauChiTraService.getYeuCauChiTraById(
        idYeuCauChiTra
      );
      setSelectedYCTra(response.data);
      setIsYCTraDialogOpen(true);
    } catch (error) {
      console.error("Error fetching YeuCauChiTra details:", error);
      // Handle error, e.g., show a toast notification
    }
  };

  const closeYCTraDialog = () => {
    setIsYCTraDialogOpen(false);
  };

  const openImageDialog = (imageUrl) => {
    setCurrentImage(imageUrl);
    setImageDialogOpen(true);
  };

  // Hàm đóng dialog hình ảnh
  const closeImageDialog = () => {
    setImageDialogOpen(false);
  };
  return (
    <div className="wrapper mt-8 px-4">
      <Typography variant="h3" className="mb-8">
        Lịch Sử Chi Trả
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {danhSachLichSuChiTra.map((lsct) => (
          <Card key={lsct.id} className="hover:shadow-md bg-gray-100">
            <CardBody className="flex flex-col items-start p-4">
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {lsct.tenBenhVien}
              </Typography>
              <Typography variant="paragraph" color="blue-gray">
                Yêu cầu chi trả: {lsct.iD_YeuCauChiTra}
              </Typography>
              <Typography variant="paragraph" color="blue-gray">
                Thời gian chi trả: {formatDate(lsct.thoiGianChiTra)}
              </Typography>
              <Typography variant="paragraph" color="blue-gray">
                Số tiền chi trả: {formatCurrency(lsct.soTienChiTra)}
              </Typography>
              <Button
                color="blue"
                onClick={() => openYCTraDialog(lsct.iD_YeuCauChiTra)}
              >
                Xem yêu cầu chi trả
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
      {selectedYCTra && (
        <Dialog
          open={isYCTraDialogOpen}
          toggler={closeYCTraDialog}
          className="rounded-lg"
          style={{
            maxWidth: "80vw",
            maxHeight: "80vh",
            width: "1200",
            height: "630",
            backgroundColor: "rgba(0, 0, 0, 0)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Phần nội dung chi tiết của yêu cầu chi trả */}
          {/* Ví dụ: */}
          <div className="p-4 relative" style={{ overflowY: "auto" }}>
            <button
              onClick={closeYCTraDialog}
              className="absolute top-0 right-0 text-2xl text-gray-600 p-2"
            >
              <span className="material-icons">close</span>
            </button>
            <Typography
              variant="h5"
              color="blue-gray"
              className="font-bold mb-2"
            >
              Chi tiết yêu cầu
            </Typography>
            <div className="flex flex-wrap justify-between">
              <div className="flex-1 min-w-0 px-2 mb-4">
                <Typography color="blue-gray">
                  Người yêu cầu: {selectedYCTra.nguoiYeuCau}
                </Typography>

                <Typography color="blue-gray">
                  Ngày yêu cầu: {formatDate(selectedYCTra.ngayYeuCau)}
                </Typography>
                <Typography color="blue-gray">
                  Địa chỉ: {selectedYCTra.diaChi}
                </Typography>
                <Typography color="blue-gray">
                  SĐT: {selectedYCTra.dienThoai}
                </Typography>
                <Typography color="blue-gray">
                  Email: {selectedYCTra.email}
                </Typography>
                <Typography color="blue-gray">
                  Mối quan hệ: {selectedYCTra.moiQuanHe}
                </Typography>
              </div>
              <div className="flex-1 min-w-0 px-2 mb-4">
                <Typography color="blue-gray">
                  Trường hợp chi trả: {selectedYCTra.truongHopChiTra}
                </Typography>
                <Typography color="blue-gray">
                  Nơi điều trị: {selectedYCTra.noiDieuTri}
                </Typography>
                <Typography color="blue-gray">
                  Chẩn đoán: {selectedYCTra.chanDoan}
                </Typography>
                <Typography color="blue-gray">
                  Hậu quả: {selectedYCTra.hauQua}
                </Typography>
                <Typography color="blue-gray">
                  Hình thức điều trị: {selectedYCTra.hinhThucDieuTri}
                </Typography>
                <Typography color="blue-gray">
                  Ngày bắt đầu:{" "}
                  {selectedYCTra.ngayBatDau
                    ? formatDate(selectedYCTra.ngayBatDau)
                    : ""}
                </Typography>
                <Typography color="blue-gray">
                  Ngày kết thúc:{" "}
                  {selectedYCTra.ngayKetThuc
                    ? formatDate(selectedYCTra.ngayKetThuc)
                    : ""}
                </Typography>
                <Typography color="blue-gray">
                  Hình hóa đơn:
                  {selectedYCTra.hinhHoaDon ? (
                    <span
                      onClick={() => openImageDialog(selectedYCTra.hinhHoaDon)}
                      style={{
                        textDecoration: "underline",
                        color: "blue",
                        cursor: "pointer",
                        marginLeft: "1rem", // Thêm khoảng cách bên trái cho "Xem hình"
                      }}
                    >
                      Xem hình
                    </span>
                  ) : (
                    "Không có"
                  )}
                </Typography>

                <Typography color="blue-gray">
                  Tổng tiền: {formatCurrency(selectedYCTra.soTienYeuCauChiTra)}
                </Typography>
              </div>
            </div>
            {imageDialogOpen && (
              <Dialog
                style={{
                  maxWidth: "80vw", // Chiều rộng tối đa là 80% của viewport width
                  maxHeight: "80vh", // Chiều cao tối đa là 80% của viewport height
                  width: "1200", // Chiều rộng tự động dựa vào nội dung
                  height: "630", // Chiều cao tự động dựa vào nội dung
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  justifyContent: "space-between",
                }}
                open={imageDialogOpen}
                toggler={closeImageDialog}
                /*style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Nền đen mờ
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative", // Đặt Dialog ở vị trí tương đối để định vị nút đóng
            padding: "20px", // Thêm padding để không gian xung quanh hình ảnh
            borderRadius: "4px", // Bo tròn góc Dialog nếu cần
          }} */
              >
                {/* Nút đóng Dialog */}
                <button
                  onClick={closeImageDialog}
                  style={{
                    position: "absolute", // Định vị nút đóng ở vị trí tuyệt đối
                    top: "10px", // Khoảng cách từ đỉnh
                    right: "10px", // Khoảng cách từ bên phải
                    background: "transparent", // Nền trong suốt
                    border: "no", // Không viền
                    cursor: "pointer", // Con trỏ chuột khi di chuyển vào nút
                    fontSize: "1.5rem", // Kích thước font của biểu tượng
                    color: "black", // Màu của biểu tượng
                  }}
                >
                  <span className="material-icons">close</span>
                </button>
                <img
                  src={currentImage}
                  alt="Hóa đơn"
                  style={{
                    maxWidth: "100%", // Sử dụng 100% để chiếm đầy chiều rộng của Dialog, hoặc giá trị cụ thể nếu cần
                    maxHeight: "630px", // Đặt chiều cao tối đa để không vượt quá kích thước Dialog
                    objectFit: "contain", // Đảm bảo toàn bộ hình ảnh hiển thị và không bị méo
                    backgroundColor: "white", // Nền trắng cho hình ảnh
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Bóng đổ cho hình ảnh
                    borderRadius: "4px", // Bo tròn góc của hình ảnh
                    display: "block", // Loại bỏ khoảng trống dưới cùng
                    margin: "auto", // Căn giữa hình ảnh trong Dialog
                    border: "1px solid #ccc", // Thêm viền nếu cần để tách biệt hình ảnh với nền Dialog
                  }}
                />
              </Dialog>
            )}
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Nv_lichSuChiTra;
