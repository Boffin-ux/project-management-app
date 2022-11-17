import { useAppSelector } from './redux';

const useAccessToken = () => {
  const { token } = useAppSelector((state) => state.auth);
  return token;
};

export default useAccessToken;
