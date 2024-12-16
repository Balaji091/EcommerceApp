import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie'

function ProtectedRoute({element}){
      const jwtToken=Cookies.get('jwt_token');
      if(jwtToken===undefined){
          return <Navigate to='/login' replace/>
      }
    return element;
}
export default ProtectedRoute; 