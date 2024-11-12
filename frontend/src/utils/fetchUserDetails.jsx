import SummaryApi from "../common/Api";
import Axios from "./axios";

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.userDetails,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserDetails;
