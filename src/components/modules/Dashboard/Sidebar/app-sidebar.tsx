'use client';

import * as React from 'react';
import { useUser } from '@/context/UserContext';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import Link from 'next/link';
import {
  StickyNote,
  Settings,
  SquareTerminal,
  FlaskConicalOff,
  FolderOpenDot,
  SquareChevronUp,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const sidebarItems = {
  // admin sidebar-part
  admin: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: 'Blog Posts',
      url: '/dashboard/posts',
      icon: StickyNote,
    },
    {
      title: 'Experiences',
      url: '/dashboard/experiences',
      icon: FlaskConicalOff,
    },
    {
      title: 'Projects',
      url: '/dashboard/projects',
      icon: FolderOpenDot,
    },
    {
      title: 'Skills',
      url: '/dashboard/skills',
      icon: SquareChevronUp,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings,
      items: [
        {
          title: 'Profile',
          url: '/profile',
        },
        {
          title: 'Update Profile',
          url: '/profile/update-profile',
        },
        {
          title: 'Change Password',
          url: '/profile/change-password',
        },
      ],
    },
  ],

  // common sidebar-part that will show while loading
  common: [
    {
      title: 'Dashboard',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings,
      isActive: true,
      items: [
        {
          title: 'Profile',
          url: '/profile',
        },
        {
          title: 'Update Profile',
          url: '/profile/update-profile',
        },
        {
          title: 'Change Password',
          url: '/profile/change-password',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">Khaled</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain items={user ? sidebarItems.admin : sidebarItems.common} />
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
