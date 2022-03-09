/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const { Option } = Select;

export default function Header(props) {
  const { t, i18n } = useTranslation();

  const handleChange = (value) => {
    i18n.changeLanguage(value);
    // console.log(`selected ${value}`);
  };

  return (
    <header className="p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black w-full fixed z-10 ">
      <div
        className="container flex
 justify-between h-16 mx-auto"
      >
        <NavLink
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img
            src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
            alt="cyberlearn"
          />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to="/home"
              className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white"
              activeClassName="border-b-2 border-white "
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/contact"
              className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white"
              activeClassname="border-b-2 border-white"
            >
              Liên hệ
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/news"
              className="flex items-center mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white"
              activeClassName="border-b-2 border-white"
            >
              Tin tức
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <button
            onClick={() => {
              history.push("/login");
            }}
            className="self-center px-8 py-3 text-white rounded"
          >
            {t("signin")}
          </button>
          <button className="self-center px-8 py-3  rounded bg-violet-600 text-white">
            {t("signup")}
          </button>
          {/* Dùng khi từ có nhìu */}

          {/* {t("hello.2")} */}

          <Select
            defaultValue="en"
            style={{ width: 100 }}
            onChange={handleChange}
          >
            <Option value="en">Eng</Option>
            <Option value="chi">Chi</Option>
            <Option value="vi">Vi</Option>
          </Select>
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-coolGray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
