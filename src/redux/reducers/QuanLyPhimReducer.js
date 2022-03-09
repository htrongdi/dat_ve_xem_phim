import {
  SET_DANH_SACH_PHIM,
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../actions/types/QuanLyPhimType";
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";

const stateDefault = {
  dangChieu: true,
  sapChieu: true,
  arrFilmDefault: [],
  arrFilm: [
    {
      maPhim: 4284,
      tenPhim: "Avenger 2",
      biDanh: "avenger-2",
      trailer: "https://www.youtube.com/embed/tmeOjFno6Do",
      hinhAnh:
        "http://movie0706.cybersoft.edu.vn/hinhanh/avenger-t-u-2_gp01.jpg",
      moTa: "king",
      maNhom: "GP01",
      ngayKhoiChieu: "2021-10-23T00:00:00",
      danhGia: 10,
    },
  ],
  filmDetail: {},
};

export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM:
      state.arrFilm = action.arrFilm;
      state.arrFilmDefault = action.arrFilm;

      return { ...state };
    case SET_FILM_DANG_CHIEU:
      state.dangChieu = !state.dangChieu;
      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };
    case SET_FILM_SAP_CHIEU:
      state.sapChieu = !state.sapChieu;
      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };
    case SET_CHI_TIET_PHIM:
      state.filmDetail = action.filmDetail;
      return { ...state };
    default:
      return { ...state };
  }
};
