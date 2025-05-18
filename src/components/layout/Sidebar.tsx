import React from 'react';
import { Activity, BarChart3, Heart, Calendar, Brain, Globe, Settings, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', icon: <Activity size={20} /> },
    { name: 'Health Metrics', icon: <Heart size={20} /> },
    { name: 'Activity', icon: <BarChart3 size={20} /> },
    { name: 'Mood Tracker', icon: <Calendar size={20} /> },
    { name: 'Insights', icon: <Brain size={20} /> },
    { name: 'Global Trends', icon: <Globe size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 md:z-30 flex-shrink-0 w-64 h-full bg-primary-600 text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-primary-700">
            <div className="flex items-center">
              <div className="w-8 h-8 p-1 bg-white rounded-md flex items-center justify-center mr-2">
                <Heart className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-lg font-semibold">HealthSync</h2>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md text-primary-200 hover:text-white hover:bg-primary-700 md:hidden focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      index === 0
                        ? 'bg-primary-700 text-white'
                        : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="px-4 py-3 border-t border-primary-700">
            <div className="text-xs text-primary-200">
              <p>Data Last Updated:</p>
              <p className="font-medium">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;