import { Fragment } from "react";
import { Route } from "react-router-dom";
// import HomeMenu from "../../pages/Home/HomeMenu/HomeMenu";
// import HomeCarousel from "./HomeCarousel/HomeCarousel";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
export const HomeTemplate = (props) => {
  const { Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location.props,history.props.match
        return (
          <Fragment>
            <Header {...propsRoute} />
            {/* propsRoute có tác dụng để dúng các thuộc tính history , match.params,... */}

            <Component {...propsRoute} />

            <div className="mt-6">
              <Footer {...propsRoute} />
            </div>
          </Fragment>
        );
      }}
    />
  );
};
