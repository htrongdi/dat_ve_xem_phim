/* eslint-disable react/jsx-pascal-case */
import React from "react";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
// import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import styleSlick from "./MultipleRowSlick.module.css";
import { useSelector } from "react-redux";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../../redux/actions/types/QuanLyPhimType";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-next"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    />
  );
}
const MultipleRowSlick = (props) => {
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );
  let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";
  let activeClassSC = sapChieu === true ? "active_Film" : "none_active_film";
  const renderFilm = () => {
    return props.arrFilm.slice(0, 12).map((item, index) => {
      // slice 0,12 : chỉ lấy từ thằng 0 -> 12 , còn lại ko lấy
      return (
        // className={`${styleSlick["width-item"]}`}
        <div key={index} className="mt-2">
          <Film_Flip item={item} />
        </div>
      );
    });
  };

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <div>
        <button
          type="button"
          //do ban đầu sử dụng styleModeule , nên phải sử dụng ntn
          className={` ${styleSlick[activeClassDC]} px-8 py-3 font-semibold border rounded mr-2  bg-gray-800 border-coolGray-800 text-white`}
          onClick={() => {
            const action = { type: SET_FILM_DANG_CHIEU };
            dispatch(action);
          }}
        >
          Phim Đang Chiếu
        </button>
        <button
          type="button"
          className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold border bg-white rounded border-gray-800 text-gray-800`}
          onClick={() => {
            const action = { type: SET_FILM_SAP_CHIEU };
            dispatch(action);
          }}
        >
          Phim Sắp Chiếu
        </button>
      </div>

      <Slider {...settings}>{renderFilm()}</Slider>
    </div>
  );
};
export default MultipleRowSlick;
