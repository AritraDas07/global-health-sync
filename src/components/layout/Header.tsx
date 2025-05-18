import React from 'react';
import { Bell, Menu, Moon, Sun, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleDarkMode } from '../../store/slices/userSettingsSlice';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const { darkMode, name } = useSelector((state: RootState) => state.userSettings);
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-1 mr-4 rounded-md text-gray-700 hover:bg-gray-100 md:hidden focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-primary-600 hidden md:block">
            Global HealthSync
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className="p-2 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-tertiary-500"></span>
          </button>
          
          <div className="flex items-center">
            <div className="hidden md:block mr-3">
              <p className="text-sm font-medium">{name}</p>
            </div>
            <button className="flex items-center justify-center w-9 h-9 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <User size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;