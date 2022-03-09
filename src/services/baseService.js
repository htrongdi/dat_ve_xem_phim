import Axios from "axios";
import { DOMAIN, TOKEN } from "../util/settings/config";

export class baseService {
    // put json về phía backend
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: "PUT",
            data: model,
            headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //JWT
        });
    };

    post = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: "POST",
            data: model,
            headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //JWT
        });
    };

    get = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: "GET",
            headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        });
    };

    delete = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: "DELETE",
            headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        });
    };
    // get = (url) => {
    //     return Axios({
    //         url: `${DOMAIN}/${url}`,
    //         method: "GET",
    //         headers: {
    //             TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNjQiLCJIZXRIYW5TdHJpbmciOiIyMS8wMS8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDI3MjMyMDAwMDAiLCJuYmYiOjE2MTYxNzMyMDAsImV4cCI6MTY0Mjg3MDgwMH0.2sSWVGy-3Ce9iJ8bIYmYOJ9aE1eu3fz07DtA2ECfiyk",
    //         },
    //     });
    // };

    // post = (url, model) => {
    //     return Axios({
    //         url: `${DOMAIN}/${url}`,
    //         method: "POST",
    //         data: model,
    //         headers: {
    //             // Authorization: "Bearer " + localStorage.getItem(TOKEN),
    //             Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTIzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiR1YiLCJuYmYiOjE2MzI5OTA5MDQsImV4cCI6MTYzMjk5NDUwNH0.wPQX33_2MdJ792k8IuMgxF1l8fqfUZvLH9X-LHmsijI",
    //             TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNjQiLCJIZXRIYW5TdHJpbmciOiIyMS8wMS8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDI3MjMyMDAwMDAiLCJuYmYiOjE2MTYxNzMyMDAsImV4cCI6MTY0Mjg3MDgwMH0.2sSWVGy-3Ce9iJ8bIYmYOJ9aE1eu3fz07DtA2ECfiyk",
    //         },
    //     });
    // };

    // put = (url, model) => {
    //     return Axios({
    //         url: `${DOMAIN}/${url}`,
    //         method: "PUT",
    //         data: model,
    //         headers: {
    //             Authorization: "Bearer " + localStorage.getItem(TOKEN),
    //             TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNjQiLCJIZXRIYW5TdHJpbmciOiIyMS8wMS8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDI3MjMyMDAwMDAiLCJuYmYiOjE2MTYxNzMyMDAsImV4cCI6MTY0Mjg3MDgwMH0.2sSWVGy-3Ce9iJ8bIYmYOJ9aE1eu3fz07DtA2ECfiyk",
    //         },
    //     });
    // };
    // delete = (url) => {
    //     return Axios({
    //         url: `${DOMAIN}/${url}`,
    //         method: "DELETE",
    //         headers: {
    //             Authorization: "Bearer " + localStorage.getItem(TOKEN),
    //             TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNjQiLCJIZXRIYW5TdHJpbmciOiIyMS8wMS8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDI3MjMyMDAwMDAiLCJuYmYiOjE2MTYxNzMyMDAsImV4cCI6MTY0Mjg3MDgwMH0.2sSWVGy-3Ce9iJ8bIYmYOJ9aE1eu3fz07DtA2ECfiyk",
    //         },
    //     });
    // };
}