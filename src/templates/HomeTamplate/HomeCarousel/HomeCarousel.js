import React from "react";
// import { CarouselReducer } from "../../../redux/reducers/CarouselReducer";
import { Carousel } from "antd";
import { useSelector } from "react-redux";
import { getCarouselAction } from "../../../redux/actions/CarouselAction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./HomeCarousel.css";

export default function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);
  console.log(arrImg);
  const contentStyle = {
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    backgroundPosition: "center",
    height: "600px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarouselAction());
  }, [dispatch]);
  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={index}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img src={item.hinhAnh} className="w-full opacity-0 " alt="123" />
          </div>
        </div>
      );
    });
  };
  return <Carousel effect="fade">{renderImg()}</Carousel>;
}
