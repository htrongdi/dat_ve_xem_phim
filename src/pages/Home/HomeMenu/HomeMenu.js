/* eslint-disable no-unused-vars */
import React from "react";
import { Tabs } from "antd";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

const { TabPane } = Tabs;

export default class HomeMenu extends React.PureComponent {
  //PureComponent khacs Component : khi dispatch tới đâu thì render tới đó, có nghĩa props của thằng này nó thay đổi thì nó mới render lại
  state = {
    tabPosition: "left",
  };
  componentDidMount() {
    console.log(this.props);
  }

  changeTabPosition = (e) => {
    this.setState({ tabPosition: e.target.value });
  };
  renderHeThongRap = () => {
    const { tabPosition } = this.state;
    return this.props.heThongRapChieu?.map((heThongRap, index) => {
      return (
        <TabPane
          tab={
            <img
              src={heThongRap.logo}
              className="rounded-full w-20 "
              alt="123"
            />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div style={{ width: 300, display: "flex" }}>
                      <img
                        src="https://s3img.vcdn.vn/123phim/2018/10/lotte-cinema-ha-long-15383889412916.jpg"
                        width="50"
                        alt="123"
                      />
                      <div className="ml-2 text-left">
                        {cumRap.tenCumRap}
                        <p className="text-red-200">Chi tiết</p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {/* Load phim tuog ung */}
                  {cumRap.danhSachPhim.map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="my-5">
                          <div className="flex">
                            <img
                              width={75}
                              height={75}
                              src={phim.hinhAnh}
                              alt={phim.tenPhim}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://picsum.photos/75/75";
                              }}
                            />
                            <div className="ml-2">
                              <h1 className=" text-2xl text-green-700">
                                {phim.tenPhim}
                              </h1>
                              <p>{cumRap.diaChi}</p>
                              <div className="grid grid-cols-6 gap-6">
                                {phim.lstLichChieuTheoPhim
                                  ?.splice(0, 12)
                                  .map((lichChieu, index) => {
                                    return (
                                      <NavLink to="/" key={index}>
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  render() {
    const { tabPosition } = this.state;
    return (
      <>
        <Tabs tabPosition={tabPosition}>{this.renderHeThongRap()}</Tabs>
      </>
    );
  }
}
