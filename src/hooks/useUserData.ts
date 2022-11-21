import { parseJwt } from 'utils/helpers';
import useAccessToken from './useAccessToken';

const useUserData = () => {
  const isAuth = useAccessToken();
  const userData = parseJwt(isAuth);

  return {
    id: userData.id,
    login: userData.name,
    token: isAuth,
  };
};

export default useUserData;
