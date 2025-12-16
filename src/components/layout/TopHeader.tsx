import { Bell, ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { notifications } from '@/data/mockData';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface TopHeaderProps {
  title?: string;
  showBack?: boolean;
  showNotifications?: boolean;
}

export default function TopHeader({ 
  title, 
  showBack = false, 
  showNotifications = true 
}: TopHeaderProps) {
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border safe-area-inset-top">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-10 w-10 hover:bg-sand/50"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}
          {title && (
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          
          {showNotifications && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/notifications')}
              className="h-10 w-10 relative hover:bg-sand/50"
            >
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold shadow-soft">
                  {unreadCount}
                </span>
              )}
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
            className="h-10 w-10 hover:bg-sand/50"
          >
            <User className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
