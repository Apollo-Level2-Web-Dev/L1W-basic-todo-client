import { jwtDecode } from 'jwt-decode';

const verifyJWT = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
  } catch (err) {
    return false;
  }
};

export default verifyJWT;
