import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const useDocumentTitle = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    const pathKey = pathname.split('/')[1];
    const title = t(`titles.${pathKey}`);
    document.title = pathKey ? `${title} - PMA` : 'PMA';
  }, [pathname]);
};

export { useDocumentTitle };
