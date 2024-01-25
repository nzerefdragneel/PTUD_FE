import axios from "axios";

const API_URL = `${process.env.REACT_APP_URL_API}/api/KhachHang/`;
//const API_TEST = `${process.env.REACT_APP_SERVICE_URL}/api/test/`;

class CustomerService {
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
