import axios from "axios";

const API_URL = `${process.env.REACT_APP_URL_API}/api/KhachHang/`;
//const API_TEST = `${process.env.REACT_APP_SERVICE_URL}/api/test/`;

class UserService {
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

  getCustomer(iD_Khachhang) {
    // alert(`${API_URL}idtk:int?idtk=${iD_Khachhang}`);
    return axios.get(`${API_URL}idtk:int?idtk=${iD_Khachhang}`);
  }
  getCurrentCustomer() {
    return JSON.parse(localStorage.getItem("customer"));
  }

  addCustomer(idTK, data) {
    try {
      alert(data);
      return axios.post(`${API_URL}ThemKhachHang?idTK=${idTK}`, data);
    } catch (error) {
      // Xử lý lỗi
      console.error("Đã xảy ra lỗi khi thêm khách hàng", error);
      throw error; // Nếu bạn muốn xử lý lỗi ở phía calling function
    }
  }
}

export default new UserService();
