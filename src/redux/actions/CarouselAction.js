// import axios from "axios"
import { qLPhimService } from "../../services/QuanLyPhimService";
// import { DOMAIN } from "../../util/settings/config";
import { SET_CAROUSEL } from "./types/CarouselType";

export const getCarouselAction = () => {
    return async(dispatch) => {
        try {
            const result = await qLPhimService.layDanhSachBanner();
            dispatch({ type: SET_CAROUSEL, arrImg: result.data.content });

        } catch (error) {
            console.log(error);
        }

    }
}