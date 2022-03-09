/* eslint-disable no-useless-constructor */
import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { baseService } from "./baseService";

// Suử dụng như 1 lớp đôi tượng nên cần phải viết hoa tên lớp
export class QuanLyDatVeService extends baseService {
    constructor() {
        super();
    }
    layChiTietPhongVe = (maLichChieu) => {
        return this.get(
            `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
        );
    };
    // thong tin dat ve
    // {
    //     "maLichChieu": 0,
    //     "danhSachVe": [{
    //         "maGhe": 0,
    //         "giaVe": 0
    //     }]
    // }
    datVe = (thongTinDatVe = new ThongTinDatVe()) => {
        return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe);
    };
}

// goi kế thừa , nhớ là đặt tên khác tên lớp đối tượng , ko sẽ bị lỗi
export const quanLyDatVeService = new QuanLyDatVeService();