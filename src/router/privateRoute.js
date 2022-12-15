import { TOKEN_FEATURE_KEY } from "../reducers/zohoTokenReducer";
import { useSelector } from "react-redux";
import { LOGIN_URL } from "../generalConfig";
function PrivateRoute({ element }) {
  let { isAuthenticated, loading } = useSelector((state) => {
    return state[TOKEN_FEATURE_KEY];
  });
  if (!isAuthenticated) {
    window.location = LOGIN_URL;
  }
  return element;
}

export default PrivateRoute;
