/* eslint-disable no-useless-constructor */
import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

// Suử dụng như 1 lớp đôi tượng nên cần phải viết hoa tên lớp
export class QuanLyPhimService extends baseService {
    constructor() {
        super();
    }
    layDanhSachBanner = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
    }
    layDanhSachPhim = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
    }
}

// goi kế thừa , nhớ là đặt tên khác tên lớp đối tượng , ko sẽ bị lỗi
export const qLPhimService = new QuanLyPhimService();