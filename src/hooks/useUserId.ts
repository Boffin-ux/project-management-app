import { parseJwt } from 'utils/helpers';
import useAccessToken from './useAccessToken';

const useUserId = () => {
  const isAuth = useAccessToken();
  return parseJwt(isAuth).id;
};

export default useUserId;
