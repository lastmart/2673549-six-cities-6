import {useLocation} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {AppRoute, PAGE_CONFIG} from '@constants';

type PageProps = {
  children: JSX.Element;
};

function getPageTitle(pathname: string): string {
  const routeTitles = new Map<string, string>([
    [AppRoute.Main, `${PAGE_CONFIG.BASE_TITLE}. Главная`],
    [AppRoute.Login, `${PAGE_CONFIG.BASE_TITLE}. Вход`],
    [AppRoute.Favourites, `${PAGE_CONFIG.BASE_TITLE}. Избранное`]
  ]);

  const staticRouteTitle = routeTitles.get(pathname);
  if (staticRouteTitle) {
    return staticRouteTitle;
  }

  if (pathname.startsWith(`${AppRoute.Offer}/`)) {
    return `${PAGE_CONFIG.BASE_TITLE}. Предложение`;
  }

  return PAGE_CONFIG.DEFAULT_TITLE;
}

function Page({children}: PageProps) {
  const location = useLocation();
  const [title, setTitle] = useState(PAGE_CONFIG.DEFAULT_TITLE);
  useEffect(() => {
    setTitle(getPageTitle(location.pathname));
  }, [location]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </React.Fragment>
  );
}

export default Page;
