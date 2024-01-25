import axios from "axios";
//phonghoc@i91

const API_URL = `https://localhost:7202/api/GoiBaoHiem`;
class GoiBaoHiemService {
  getAll() {
    return axios.get(`${API_URL}/GetAll`);
  }
  getByID(id) {
    return axios.get(`${API_URL}/GetById?id=${id}`);
  }
  capNhatGoiBaoHiem(
    id,
    tenBaoHiem,
    tenGoi,
    giaTien,
    thoiHan,
    moTa,
    ngayPhatHanh,
    tinhTrang,
    hinhAnh
  ) {
    return axios.post(`${API_URL}/CapNhatGoiBaoHiem?id=${id}`, {
      tenBaoHiem,
      tenGoi,
      giaTien,
      thoiHan,
      moTa,
      ngayPhatHanh,
      tinhTrang,
      hinhAnh,
    });
  }
  capNhatGBH(
    id,
    iD_GoiBaoHiem,
    tenBaoHiem,
    tenGoi,
    giaTien,
    thoiHan,
    moTa,
    ngayPhatHanh,
    tinhTrang,
    hinhAnh
  ) {
    return axios.put(`${API_URL}/CapNhatGoiBaoHiem/${id}`, {
      iD_GoiBaoHiem,
      tenBaoHiem,
      tenGoi,
      giaTien,
      thoiHan,
      moTa,
      ngayPhatHanh,
      tinhTrang,
      hinhAnh,
    });
  }
  ThemGoiBaoHiem(
    iD_GoiBaoHiem,
    tenBaoHiem,
    tenGoi,
    giaTien,
    thoiHan,
    moTa,
    ngayPhatHanh,
    tinhTrang,
    hinhAnh
  ) {
    return axios.post(
      `${API_URL}/ThemGoiBaoHiem`,
      {
        iD_GoiBaoHiem,
        tenBaoHiem,
        tenGoi,
        giaTien,
        thoiHan,
        moTa,
        ngayPhatHanh,
        tinhTrang,
        hinhAnh,
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

export default new GoiBaoHiemService();
