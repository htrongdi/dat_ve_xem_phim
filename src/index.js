import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/configStore";
import { Provider } from "react-redux";
//antd
import "antd/dist/antd.css";
//slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DOMAIN } from "./util/settings/config";

//Cấu hình realtime (websocket với signalR )
import * as signalR from "@aspnet/signalr";

import "./i18n";

//Doan code de ket noi den server , lang nghe su kien tu server
export const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${DOMAIN}/DatVeHub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();

//cú pháp connection kết nối signalR
connection
  .start()
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,

      document.getElementById("root")
    );
  })
  .catch((error) => {
    console.log(error);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
