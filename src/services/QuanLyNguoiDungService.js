/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

// Suử dụng như 1 lớp đôi tượng nên cần phải viết hoa tên lớp
export class QuanLyNguoiDungService extends baseService {
    constructor() {
        super();
    }
    dangNhap = (thongTinDangNhap) => {
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    };
    layThongTinNguoiDung = () => {
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
    };
}

// goi kế thừa , nhớ là đặt tên khác tên lớp đối tượng , ko sẽ bị lỗi
export const quanLyNguoiDungService = new QuanLyNguoiDungService();