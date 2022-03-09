import "./App.css";
import { createBrowserHistory } from "history";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTamplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import CheckOutTemplate from "./templates/CheckOutTemplate/CheckOutTemplate";
// do export default nên bỏ dấu ngoặc nhọn
import Checkout from "./pages/Checkout/Checkout";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";
// import { Suspense, lazy } from "react";

// const CheckoutTemplateLazy = lazy(() =>
//   import("./templates/CheckOutTemplate/CheckOutTemplate")
// );
//nhớ sửa export thành export default trong link mà mìn cần gán vào

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter history={history}>
      <Loading></Loading>
      <Switch>
        <HomeTemplate path="/" exact Component={Home}></HomeTemplate>
        <HomeTemplate path="/home" exact Component={Home}></HomeTemplate>
        <HomeTemplate path="/contact" exact Component={Contact}></HomeTemplate>
        <HomeTemplate path="/news" exact Component={News}></HomeTemplate>
        <HomeTemplate
          path="/detail/:id"
          exact
          Component={Detail}
        ></HomeTemplate>

        <Route path="/register" exact component={Register}></Route>
        <UserTemplate path="/login" exact Component={Login}></UserTemplate>

        <CheckOutTemplate
          path="/checkout/:id"
          exact
          Component={Checkout}
        ></CheckOutTemplate>
        {/* <Suspense fallback={<h1>Loading...</h1>}>
          <CheckoutTemplateLazy
            path="/checkout/:id"
            exact
            Component={Checkout}
          ></CheckoutTemplateLazy>
        </Suspense> */}
        {/* supense để dưới , ko là ko hiện mấy cái dưới */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
