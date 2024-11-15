import SummaryApi from "../common/Api";
import Axios from "./axios";

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.userDetails,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Adds JWT token for auth
      },
    });
    return response.data;
  } catch (error) {
    // Handles 401 Unauthorized errors specifically
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Redirecting to login.");
      // Note: Redirect logic appears to be missing here
    } else {
      // Handles all other errors
      console.error("An error occurred while fetching user details:", error);
    }
    return null; // Returns null for all error cases
  }
};

export default fetchUserDetails;
