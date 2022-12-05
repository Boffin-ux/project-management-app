import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const useDocumentTitle = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const pathKey = pathname.split('/')[1];
  const title = pathKey ? `${t(`titles.${pathKey}`)} - PMA` : 'PMA';

  useEffect(() => {
    document.title = title;
  }, [title]);
};

export { useDocumentTitle };
