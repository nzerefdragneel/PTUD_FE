import axios from "axios";

const API_URL = "https://localhost:7202/api/YeuCauChiTra/YeuCauChiTra";

class YeuCauChiTraService {
  EditYeuCauChiTra(
    qlbhid,
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
  ) {
    return axios.post(
      API_URL,
      {
        qlbhid,
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
        hinhHoaDon,
      }
      // {
      //     headers: {
      //         'Cache-Control': 'no-cache',
      //         'Content-Type': 'application/x-www-form-urlencoded',
      //         'Access-Control-Allow-Origin': '*',
      //     },
      //     mode: 'no-cors',
      // },
    );
  }
}

export default new YeuCauChiTraService();
