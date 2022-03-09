/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../../assets/styles/circle.scss";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { StarOutlined } from "@ant-design/icons";
import { Rate } from "antd";

import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapAction";
import moment from "moment";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;

export default function Detail(props) {
  const dispatch = useDispatch();
  const filmDetail = useSelector((state) => state.QuanLyPhimReducer.filmDetail);
  console.log(filmDetail);
  useEffect(() => {
    //lấy thông tin mã phim từ url
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${filmDetail.hinhAnh})`,
        backgroundSize: "100% ",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <CustomCard
        style={{ paddingTop: 150, minHeight: "100vh" }}
        effectColor="#C780FF" // required
        color="#14AEFF" // default color is white
        blur={20} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="grid grid-cols-12">
          <div className="col-span-5 col-start-3">
            <div className="grid grid-cols-3 text-white">
              <img
                src={`${filmDetail.hinhAnh}`}
                className="col-span-1"
                style={{ height: 300, width: "100%" }}
                alt="123"
              />
              <div className="col-span-2 ml-5" style={{ marginTop: "20%" }}>
                <p className="text-sm">
                  Ngày chiếu :{" "}
                  {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
                </p>
                <p className="text-4xl leading-3">{filmDetail.tenPhim}</p>
                <p className="w-4/5">{filmDetail.moTa}</p>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <h1
              style={{
                marginLeft: "15%",
                color: "yellow",
                fontWeight: "bold",
                font: 15,
              }}
            >
              Đánh Giá
            </h1>
            {/* <h1
              style={{ marginLeft: "12%" }}
              className="text-green-400 text-2xl"
            >
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
              <StarOutlined />
            </h1> */}
            <h1 className="text-green-400" style={{ marginLeft: "5%" }}>
              <Rate
                allowHalf
                value={filmDetail.danhGia / 2}
                style={{ color: "#78ed78", fontSize: 30 }}
              />
            </h1>
            <div className={`c100 p${filmDetail.danhGia * 10} big`}>
              <span>{filmDetail.danhGia * 10}%</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 container ml-72 w-2/3 bg-white px-5 py-5">
          <Tabs defaultactivekey={1} centered>
            <TabPane tab="Lịch chiếu " key={1} style={{ minHeight: 300 }}>
              <Tabs tabPosition={"left"}>
                {filmDetail.heThongRapChieu?.map((htr, index) => {
                  return (
                    <TabPane
                      tab={
                        <div>
                          <img
                            src={htr.logo}
                            width={50}
                            className="rounded-full"
                            alt={htr.tenHeThongRap}
                          />
                        </div>
                      }
                      key={index}
                    >
                      {htr.cumRapChieu?.map((cumRap, index) => {
                        return (
                          <div key={index} className="mt-5">
                            <div className="flex flex-row">
                              <img
                                style={{ height: 60, width: 60 }}
                                src={cumRap.hinhAnh}
                              />
                              <div className="ml-2">
                                <p
                                  style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    lineHeight: 1,
                                  }}
                                >
                                  {cumRap.tenCumRap}
                                </p>

                                <p className=" text-gray-400 ">
                                  {cumRap.diaChi}
                                </p>
                              </div>
                            </div>
                            <div className="thing-tin-lich-chieu grid grid-cols-4">
                              {cumRap.lichChieuPhim
                                ?.slice(0, 10)
                                .map((lichChieu, index) => {
                                  return (
                                    <NavLink
                                      to={`/checkout/${lichChieu.maLichChieu}`}
                                      key={index}
                                      className="text-green-800"
                                    >
                                      {moment(
                                        lichChieu.ngayChieuGioChieu
                                      ).format("hh:mm A")}
                                    </NavLink>
                                  );
                                })}
                            </div>
                          </div>
                        );
                      })}
                    </TabPane>
                  );
                })}
              </Tabs>
            </TabPane>
            <TabPane tab="Thông tin" key={2}>
              Thông tin
            </TabPane>
            <TabPane tab="Đánh giá" key={3}>
              Đánh giá
            </TabPane>
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
}
