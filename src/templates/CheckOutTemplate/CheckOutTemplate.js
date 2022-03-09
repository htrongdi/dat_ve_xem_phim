import { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";

import { USER_LOGIN } from "../../util/settings/config";
const CheckOutTemplate = (props) => {
  const { Component, ...restProps } = props;

  // điều kiện đăng nhạp vào mới vào dc cái template checkout
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" />;
  }
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location.props,history.props.match

        return (
          <Fragment>
            <Component {...propsRoute}></Component>
          </Fragment>
        );
      }}
    />
  );
};

export default CheckOutTemplate;
