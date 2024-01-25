import React, { useEffect, useState } from "react";
import DuyetYeuCauChiTraService from "../services/DuyetYeuCauChiTra.service";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import QuanLyBaoHiemService from "../services/quanLyBaoHiem.service";
import LichSuChiTraService from "../services/lichSuChiTra.service";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
} from "@material-tailwind/react";
import { toast } from "react-hot-toast";

const Nv_duyetYeuCauChiTra = () => {
  const user = authService.getCurrentUser();
  let iD_TaiKhoan = null;
  const navigate = useNavigate();
  if (user !== null) {
    iD_TaiKhoan = user.taiKhoan.iD_TaiKhoan;
  } else navigate(`/home`);
  const [danhSachYeuCau, setDanhSachYeuCau] = useState([]);
  const [selectedYeuCau, setSelectedYeuCau] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

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

  const updateDanhSachYeuCau = (iD_YeuCauChiTra) => {
    setDanhSachYeuCau(
      danhSachYeuCau.filter(
        (yeuCau) => yeuCau.iD_YeuCauChiTra !== iD_YeuCauChiTra
      )
    );
  };

  const handleDuyet = async () => {
    if (selectedYeuCau) {
      try {
        // Duyệt yêu cầu chi trả
        await DuyetYeuCauChiTraService.duyetYeuCauChiTra(
          selectedYeuCau.iD_YeuCauChiTra,
          "Đã Duyệt"
        );

        // Kiểm tra trạng thái duyệt sau khi gọi API
        const duyetResponse =
          await DuyetYeuCauChiTraService.getYeuCauChiTraById(
            selectedYeuCau.iD_YeuCauChiTra
          );
        if (duyetResponse.data.tinhTrangDuyet !== "Đã Duyệt") {
          toast.error("Lỗi: Không thể duyệt yêu cầu chi trả!");
          return;
        }

        // Cập nhật hạn mức sử dụng
        await QuanLyBaoHiemService.capNhatHanMucSuDung(
          selectedYeuCau.qlbhid,
          selectedYeuCau.soTienYeuCauChiTra
        );

        // Chuẩn bị dữ liệu cho LichSuChiTra
        const addLichSuChiTraDTO = {
          iD_YeuCauChiTra: selectedYeuCau.iD_YeuCauChiTra,
          thoiGianChiTra: new Date().toISOString(),
          soTienChiTra: selectedYeuCau.soTienYeuCauChiTra,
        };

        // Gọi API themLichSuChiTra
        await LichSuChiTraService.themLichSuChiTra(addLichSuChiTraDTO);

        // Cập nhật danh sách yêu cầu
        updateDanhSachYeuCau(selectedYeuCau.iD_YeuCauChiTra);
        closeDialog();
        toast.success(
          "Yêu cầu chi trả đã được duyệt và lưu vào lịch sử thành công!"
        );
      } catch (error) {
        console.error("Error during validation or request approval:", error);
        toast.error("Có lỗi xảy ra khi kiểm tra hoặc duyệt yêu cầu.");
      }
    }
  };

  const handleTuChoi = async (iD_YeuCauChiTra) => {
    await DuyetYeuCauChiTraService.duyetYeuCauChiTra(
      iD_YeuCauChiTra,
      "Từ Chối"
    );

    updateDanhSachYeuCau(iD_YeuCauChiTra);
    closeDialog();
    toast.success("Yêu cầu đã bị từ chối.");
  };
  const openImageDialog = (imageUrl) => {
    setCurrentImage(imageUrl);
    setImageDialogOpen(true);
  };

  // Hàm đóng dialog hình ảnh
  const closeImageDialog = () => {
    setImageDialogOpen(false);
  };

  const openDialog = (yeuCau) => {
    setSelectedYeuCau(yeuCau);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div className="wrapper mt-8 px-4">
      <Typography variant="h3">Danh Sách Yêu Cầu Chi Trả</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {danhSachYeuCau
          .filter((yeuCau) => yeuCau.tinhTrangDuyet === "Chưa Duyệt")
          .map((yeuCau) => (
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
                  Ngày yêu cầu: {formatDate(yeuCau.ngayYeuCau)}
                </Typography>
                <Button color="blue" onClick={() => openDialog(yeuCau)}>
                  Xem chi tiết
                </Button>
              </CardBody>
            </Card>
          ))}
      </div>
      {selectedYeuCau && (
        <Dialog
          // size="lg"
          open={isDialogOpen}
          toggler={closeDialog}
          className="rounded-lg"
          style={{
            maxWidth: "80vw", // Chiều rộng tối đa là 80% của viewport width
            maxHeight: "80vh", // Chiều cao tối đa là 80% của viewport height
            width: "1200", // Chiều rộng tự động dựa vào nội dung
            height: "630", // Chiều cao tự động dựa vào nội dung
            backgroundColor: "rgba(0, 0, 0, 0)",
            overflowY: "auto", // Thêm thanh cuộn nếu nội dung dài hơn chiều cao của Dialog
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="p-4 relative" style={{ overflowY: "auto" }}>
            <button
              onClick={closeDialog}
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
                  Người yêu cầu: {selectedYeuCau.nguoiYeuCau}
                </Typography>

                <Typography color="blue-gray">
                  Ngày yêu cầu: {formatDate(selectedYeuCau.ngayYeuCau)}
                </Typography>
                <Typography color="blue-gray">
                  Địa chỉ: {selectedYeuCau.diaChi}
                </Typography>
                <Typography color="blue-gray">
                  SĐT: {selectedYeuCau.dienThoai}
                </Typography>
                <Typography color="blue-gray">
                  Email: {selectedYeuCau.email}
                </Typography>
                <Typography color="blue-gray">
                  Mối quan hệ: {selectedYeuCau.moiQuanHe}
                </Typography>
              </div>
              <div className="flex-1 min-w-0 px-2 mb-4">
                <Typography color="blue-gray">
                  Trường hợp chi trả: {selectedYeuCau.truongHopChiTra}
                </Typography>
                <Typography color="blue-gray">
                  Nơi điều trị: {selectedYeuCau.noiDieuTri}
                </Typography>
                <Typography color="blue-gray">
                  Chẩn đoán: {selectedYeuCau.chanDoan}
                </Typography>
                <Typography color="blue-gray">
                  Hậu quả: {selectedYeuCau.hauQua}
                </Typography>
                <Typography color="blue-gray">
                  Hình thức điều trị: {selectedYeuCau.hinhThucDieuTri}
                </Typography>
                <Typography color="blue-gray">
                  Ngày bắt đầu:{" "}
                  {selectedYeuCau.ngayBatDau
                    ? formatDate(selectedYeuCau.ngayBatDau)
                    : ""}
                </Typography>
                <Typography color="blue-gray">
                  Ngày kết thúc:{" "}
                  {selectedYeuCau.ngayKetThuc
                    ? formatDate(selectedYeuCau.ngayKetThuc)
                    : ""}
                </Typography>
                <Typography color="blue-gray">
                  Hình hóa đơn:
                  {selectedYeuCau.hinhHoaDon ? (
                    <span
                      onClick={() => openImageDialog(selectedYeuCau.hinhHoaDon)}
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
                  Tổng tiền: {formatCurrency(selectedYeuCau.soTienYeuCauChiTra)}
                </Typography>
                <Typography color="blue-gray">
                  Tình trạng duyệt: {selectedYeuCau.tinhTrangDuyet}
                </Typography>
              </div>
            </div>
            <div className="px-4 pb-4">
              <div className="flex justify-between mt-4">
                <Button
                  color="green"
                  className="mr-2"
                  onClick={() => handleDuyet(selectedYeuCau.iD_YeuCauChiTra)}
                >
                  Duyệt
                </Button>
                <Button
                  color="red"
                  onClick={() => handleTuChoi(selectedYeuCau.iD_YeuCauChiTra)}
                >
                  Từ Chối
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
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
  );
};

export default Nv_duyetYeuCauChiTra;
