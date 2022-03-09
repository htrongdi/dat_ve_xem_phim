import { qLRapService } from "../../services/QuanLyRapService";
import {
    SET_CHI_TIET_PHIM,
    SET_HE_THONG_RAP_CHIEU,
} from "./types/QuanLyRapType";

export const LayDanhSachHeThongRapAction = () => {
    return async(dispatch) => {
        try {
            const result = await qLRapService.layDanhSachHeThongRap();
            console.log(result.data.content);
            if (result.status === 200) {
                dispatch({
                    type: SET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu: result.data.content,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};
export const layThongTinChiTietPhim = (id) => {
    return async(dispatch) => {
        try {
            const result = await qLRapService.layThongTinLichChieuPhim(id);
            console.log(result);
            dispatch({
                type: SET_CHI_TIET_PHIM,
                filmDetail: result.data.content,
            });
        } catch (error) {
            console.log(error);
        }
    };
};