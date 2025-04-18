import { useLayoutConfig } from '../../hooks';
import { Outlet } from 'react-router-dom';
import { MemoizedHeader } from '../header/header';

export default function Layout() {
  const { pageClassName, shouldUserInfoRender, isLogoActive } = useLayoutConfig();

  return (
    <div className={`page ${pageClassName}`} data-testid="layout">
      <MemoizedHeader isLogoActive={isLogoActive} shouldUserInfoRender={shouldUserInfoRender} />
      <Outlet />
    </div>
  );
}
