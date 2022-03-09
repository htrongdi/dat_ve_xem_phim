/* eslint-disable no-useless-constructor */
import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

// Suử dụng như 1 lớp đôi tượng nên cần phải viết hoa tên lớp
export class QuanLyRapService extends baseService {
    constructor() {
        super();
    }
    layDanhSachHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`);
    }
    layThongTinLichChieuPhim = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);

    }

}

// goi kế thừa , nhớ là đặt tên khác tên lớp đối tượng , ko sẽ bị lỗi
export const qLRapService = new QuanLyRapService();