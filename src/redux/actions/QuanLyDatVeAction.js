/* eslint-disable no-whitespace-before-property */
import {get } from "lodash";
import { connection } from "../..";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { DISPLAY_LOADING, HIDE_LOADING } from "./types/LoadingType";
import {
    CHUYEN_TAB,
    DAT_VE,
    DAT_VE_HOAN_TAT,
    SET_CHI_TIET_PHONG_VE,
} from "./types/QuanLyDatVeType";

export const layChiTietPhongVeAction = (maLichChieu) => {
    return async(dispatch) => {
        try {
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content,
                });
            }
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
        }
    };
};
export const datVeAction = (thongTinDatVe = new layChiTietPhongVeAction()) => {
    return async(dispatch, getState) => {
        try {
            dispatch(displayLoadingAction);

            const result = await quanLyDatVeService.datVe(thongTinDatVe);
            console.log(result);
            // Đặt vé thành công api gọi lại phòng vé
            // await có tác dụng đợi nó load danh sách phòng vé xong thì mới tắt loading
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
            await dispatch({ type: DAT_VE_HOAN_TAT });
            dispatch(hideLoadingAction);

            let userLogin = getState().QuanLyNguoiDungReducer.userLogin;

            await connection.invoke(
                "datGheThanhCong",
                userLogin.taiKhoan,
                thongTinDatVe.maLichChieu
            );
            dispatch({ type: CHUYEN_TAB });
        } catch (error) {
            console.log(error.response.data);
        }
    };
};

export const datGheAction = (ghe, maLichChieu) => {
    return async(dispatch, getState) => {
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe,
        });
        // Call api về backend
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

        // thunk cho ta 2 thm số , ở action ko sử dụng dc useSelector , mà phải sử dungj getState() thay cho
        console.log(danhSachGheDangDat);
        console.log(taiKhoan);
        console.log(maLichChieu);

        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);
        // format về dang chuỗi do backend yêu cầu gửi về dạng chuỗi ( xem định dạng)
        // Call api signalR
        connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu);
    };
};