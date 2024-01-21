import axios from 'axios';

const API_URL = 'https://localhost:7202/api/PhieuThanhToanBaoHiem/';

class PhieuThanhToanBaoHiemService {
    getGoiBaoHiemChuaThanhToan(soNgay) {
        return axios.get(`${API_URL}GetPhieuThanhToanDenHan?soNgay=${soNgay}`);
    }
}

export default new PhieuThanhToanBaoHiemService();
