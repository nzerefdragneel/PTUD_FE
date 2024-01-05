import axios from 'axios';

const API_URL = 'https://localhost:7202/api/YeuCauChiTra/YeuCauChiTra';

class YeuCauTuVanService {
    EditYeuCauChiTra(
        qlbhid,
        soTienYeuCauChiTra,
        nguoiYeuCau,
        truongHopChiTra,
        moiQuanHe,
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
        tinhTrangDuyet,
    ) {
        return axios.post(
            API_URL,
            {
                qlbhid,
                soTienYeuCauChiTra,
                nguoiYeuCau,
                truongHopChiTra,
                moiQuanHe,
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
            },
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

export default new YeuCauTuVanService();
