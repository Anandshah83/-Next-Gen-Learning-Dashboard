export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at?: string;
}

export type SidebarItem = 'home' | 'courses' | 'analytics' | 'profile' | 'settings';
