import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  datGheAction,
  datVeAction,
  layChiTietPhongVeAction,
} from "../../redux/actions/QuanLyDatVeAction";
import style from "./Checkout.module.css";
import "./Checkout.css";
import {
  CheckOutlined,
  CloseOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";

import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { Tabs } from "antd";

import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment";

import { connection } from "../..";

function Checkout(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.QuanLyDatVeReducer);
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  const dispatch = useDispatch();
  useEffect(() => {
    const action = layChiTietPhongVeAction(props.match.params.id);
    dispatch(action);

    // lắng nghe thì sử dụng on, có 1 client nào thưc hiện đặt vé thành công thì sẽ load lại danh sách phòng vé của lịch chiếu đó
    connection.on("datVeThanhCong");

    //Vừa vào trang load tất cả ghế ng khác đang đặt
    connection.invoke("loadDanhSachGhe", props.match.params.id);

    //Load danh sách gh61 load từ server về: lang nghe ở đâu bỏ cái này ở đó -- lắng nghe tín hịu từ server trả về
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      console.log("danhSachGheKhachDat", dsGheKhachDat);
      // Bước 1 loai mìn ra khoi danh sach:
      dsGheKhachDat = dsGheKhachDat.filter((item) => {
        return item.taiKhoan !== userLogin.taiKhoan;
      });
      //Gộp danh sách ghế khách đặt ở tất cả user thành q mảng lớn:
      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);

        return [...result, ...arrGhe];
      }, []);
      // đưa dữ liệu ghế khach đặt or3 tất cả user thành 1 mảng chung
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");

      //
      dispatch({
        type: "DAT_GHE",
        arrGheKhachDat,
      });
    });
    //Cai đặt sự kiện khi load lại trang
    window.addEventListener("beforeunload", clearGhe);
    return () => {
      clearGhe();
      window.removeEventListener("beforeunload", clearGhe);
    };
  }, []);

  const clearGhe = function (event) {
    connection.invoke("huyDat", userLogin.taiKhoan, props.match.params.id);
  };

  console.log(chiTietPhongVe);

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";

      // Kiểm tra từng ghê render xem có phải ghế khách dặt hay không

      let classGheKhachDat = "";
      let indexGheKD = danhSachGheKhachDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );
      if (indexGheKD !== -1) {
        classGheKhachDat = "gheKhachDat";
      }

      let classGheDaDuocDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }

      let classGheDangDat = "";
      //kiêmr tr từng ghé render có trong mảng hay ko
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      if (indexGheDD !== -1) {
        classGheDaDat = "gheDangDat";
      }

      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              const action = datGheAction(ghe, props.match.params.id);
              dispatch(action);
            }}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheKhachDat} ${classGheDaDuocDat} `}
            key={index}
            disabled={ghe.daDat || classGheKhachDat !== ""}
          >
            {ghe.daDat ? (
              classGheDaDuocDat !== "" ? (
                <UserOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                ></UserOutlined>
              ) : (
                <CloseOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              )
            ) : classGheKhachDat !== "" ? (
              <SmileOutlined
                style={{ marginBottom: 7.5, fontWeight: "bold" }}
              />
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className=" min-h-screen mt-5">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="flex flex-col items-center mt-5">
            <div
              className="bg-black "
              style={{ width: "80%", height: 15 }}
            ></div>
            <div className={`${style["trapezoid"]} text-center`}>
              <h3 className="mt-3 text-black" style={{}}>
                Màn hình
              </h3>
            </div>
            <div className="">{renderSeats()}</div>
          </div>
          <div className="mt-5 flex justify-center">
            <table className="divide-y divide-gray-200 w-2/3">
              <thead className="hg-gray-50 p-5">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế Vip</th>
                  <th>Ghế đã đặt </th>
                  <th>Ghế mình đặt</th>
                  <th>Ghế khách đặt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td>
                    <button className="ghe text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheDangDat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheVip text-center">
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheDaDat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheDaDuocDat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>{" "}
                  </td>
                  <td>
                    <button className="ghe gheKhachDat text-center">
                      {" "}
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />{" "}
                    </button>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-3">
          <h3 className="tex-green-400 text-center text-2xl">
            {danhSachGheDangDat
              .reduce((tongTien, ghe, index) => {
                return (tongTien += ghe.giaVe);
              }, 0)
              .toLocaleString()}{" "}
          </h3>
          <hr />
          <h3 className="text-xl mt-2">{thongTinPhim.tenPhim}</h3>
          <p>
            Địa điểm : {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}
          </p>
          <p>
            Ngày chiếu : {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}{" "}
          </p>
          <hr />
          <div className="flex flex-row my-5">
            <div className="w-4/5">
              <span className="text-red-400 text-lg">Ghế</span>
              {_.sortBy(danhSachGheDangDat, ["stt"]).map((gheDD, index) => {
                return (
                  <span key={index} className="text-green-500 text-2xl">
                    {" "}
                    {gheDD.stt}
                  </span>
                );
              })}
            </div>
            <div className="text-right col-span-1">
              <span className="text-green-800 text-lg">
                {danhSachGheDangDat
                  .reduce((tongTien, ghe, index) => {
                    return (tongTien += ghe.giaVe);
                  }, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>
          <hr></hr>
          <div className="my-5">
            <i>Email</i>
            <br />
            {userLogin.email}
          </div>
          <div className="my-5">
            <i>Phone</i>
            <br />
            {userLogin.soDT}
          </div>
          <hr />
          <div className="mb-0  flex flex-col justify-end items-center ">
            <div
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                console.log(thongTinDatVe);
                dispatch(datVeAction(thongTinDatVe));
              }}
              className="bg-green-500 text-white w-full text-center py-3 font-bold  text-2xl cursor-pointer "
            >
              ĐẶT VÉ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const { TabPane } = Tabs;

// function callback(key) {
//   console.log(key);
// }

export default function Demo(props) {
  const dispatch = useDispatch();
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  return (
    <div className="p-5">
      <Tabs
        defaultActiveKey={tabActive}
        onChange={(key) => {
          dispatch({ type: "CHANGE_TAB_ACTIVE", number: key.toString() });
        }}
        activeKey={tabActive}

        //  nhớ gắn activeKey thì nó mới tự động chạy
      >
        <TabPane tab="01 CHON GHẾ  & THANH TOÁN" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <KetQuaDatVe {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
}
function KetQuaDatVe(props) {
  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  useEffect(() => {
    const action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);
  console.log(thongTinNguoiDung.thongTinDatVe);
  const renderTicketItem = function () {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);
      return (
        <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                {ticket.tenPhim}
              </h2>
              <p className="text-gray-500">
                Giờ chiếu: {moment(ticket.ngayDat).format("hh:mm A ")} - Ngày
                chiếu: {moment(ticket.ngayDat).format("DD-MM-YYYY")}
              </p>
              <p>Địa điểm : {seats.tenHeThongRap}</p>
              <p>
                Tên rạp : {seats.tenCumRap} - Ghế{" "}
                {ticket.danhSachGhe.map((ghe, index) => {
                  return <span key={index}>{ghe.tenGhe} </span>;
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600">
              Lịch sử đặt vé khách hàng
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Xem lại thông tin địa chỉ , thời gian
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  );
}
