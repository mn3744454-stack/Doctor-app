import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BottomNavigation from './BottomNavigation';
import TopHeader from './TopHeader';
import { languages } from '@/i18n';

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  showNotifications?: boolean;
}

export default function MobileLayout({
  children,
  title,
  showBack = false,
  showNotifications = true,
}: MobileLayoutProps) {
  const location = useLocation();
  const { i18n } = useTranslation();
  const hideNavRoutes = ['/login', '/onboarding'];
  const shouldShowNav = !hideNavRoutes.includes(location.pathname);
  
  const currentLang = languages.find(l => l.code === i18n.language);
  const dir = currentLang?.dir || 'rtl';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [dir, i18n.language]);

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={dir}>
      <TopHeader 
        title={title} 
        showBack={showBack} 
        showNotifications={showNotifications && shouldShowNav} 
      />
      
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>
      
      {shouldShowNav && <BottomNavigation />}
    </div>
  );
}
