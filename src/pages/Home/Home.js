/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useDispatch, useSelector } from "react-redux";
import MultipleRowSlick from "../../components/RSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimActions";
import { useEffect } from "react";
import { LayDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapAction";
import { Fragment } from "react";
import HomeCarousel from "../../templates/HomeTamplate/HomeCarousel/HomeCarousel.js";

// abc222 123456

export default function Home(props) {
    const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
    console.log(arrFilm);
    // const renderPhim = () => {
    //   return arrFilm.map((item, index) => {
    //     return <Film key={index} />;
    //   });
    // }
    const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const action = layDanhSachPhimAction();
        dispatch(action);
        dispatch(LayDanhSachHeThongRapAction());
    }, [dispatch]);
    return ( <
        Fragment >
        <
        HomeCarousel / >
        <
        div style = {
            { marginLeft: "5%", width: "90%" } } >
        <
        section className = "text-gray-600 body-font justify-center flex" >
        <
        div className = "container px-5 py-24 mx-auto" > {
            /* <div
                        className="flex flex-wrap -m-4"
                        style={{ justifyContent: "center" }}
                      >
                        {renderPhim()}
                      </div> */
        } <
        MultipleRowSlick arrFilm = { arrFilm }
        /> <
        /div> <
        /section> <
        div className = "mx-36" >
        <
        HomeMenu heThongRapChieu = { heThongRapChieu }
        /> <
        /div> <
        /div> <
        /Fragment>
    );
}