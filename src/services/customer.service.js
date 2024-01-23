import axios from "axios";

const API_URL = `${process.env.REACT_APP_URL_API}/api/KhachHang/`;
//const API_TEST = `${process.env.REACT_APP_SERVICE_URL}/api/test/`;

class CustomerService {
  // getRoles(id) {
  //     axios
  //         .get(`${API_URL}getroles?id=${id}`, {
  //             headers: {
  //                 'Cache-Control': 'no-cache',
  //                 'Content-Type': 'application/x-www-form-urlencoded',
  //                 'Access-Control-Allow-Origin': '*',
  //             },
  //             mode: 'no-cors',
  //         })
  //         .then((res) => {
  //             return res.data.roles;
  //         })
  //         .catch((err) => {
  //             return '';
  //         });
  // }

  getCustomer(iD_TaiKhoan) {
    // alert(`${API_URL}idtk:int?idtk=${iD_Khachhang}`);
    return axios.get(`${API_URL}GetByIdTaiKhoan?idtk=${iD_TaiKhoan}`);
  }
  getCurrentCustomer() {
    return JSON.parse(localStorage.getItem("customer"));
  }
  addCustomer(userID, requestData) {
    return axios.post(`${API_URL}ThemKhachHang?idtk=${userID}`, requestData);
  }

  updateCustomer(customer_id, requestData) {
    const apiUrl = `${API_URL}UpdateThongTinCaNhanKhachHang(id)?id=${customer_id}`;
    console.log(requestData);

    return axios.post(apiUrl, requestData);
    //   // return axios.put(apiUrl, {
    //   //   hoTen: this.state.hoten,
    //   //   gioiTinh: this.state.gioitinh,
    //   //   quocTich: this.state.quoctich,
    //   //   chieuCao: parseInt(this.state.chieucao),
    //   //   canNang: parseInt(this.state.cannang),
    //   //   soNhaTenDuong: this.state.sonhaTenduong,
    //   //   phuongXa: this.state.phuongxa,
    //   //   quanHuyen: this.state.quanhuyen,
    //   //   thanhPho: this.state.thanhpho,
    //   //   email: this.state.email,
    //   //   cmnd: this.state.cmnd,
    //   //   ngheNghiep: this.state.nghenghiep,
    //   //   chiTietCongViec: this.state.chitietcongviec,
    //   //   thuNhap: parseInt(this.state.thunhap),
    //   //   soTaiKhoan: this.state.sotaikhoan,
    //   //   nganHang: this.state.nganHang,
    //   //   soDienThoai: this.state.sodienthoai,
    //   // });
    // };
  }
  verifyCustomer(customer_id) {
    const apiUrl = `${API_URL}XacThucKhachHang(idkh)?idkh=${customer_id}`;
    return axios.post(apiUrl);
  }

  updateEmail(iD_KhachHang, email) {
    return axios.post(
      `${API_URL}UpdateEmailKhachHang(id)?id=${iD_KhachHang}&Email=${email}`
    );
  }
}

export default new CustomerService();
