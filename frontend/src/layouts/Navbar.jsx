import { LogOut, Bell, Calendar, Search } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    
    // Show a success message
    toast.success('Logged out successfully!');
    
    // Redirect to the login page, replacing the current history entry
    navigate('/login', { replace: true });
  };

  return (
    <header className="flex h-16 items-center gap-6 border-b border-slate-700 bg-slate-800 px-6">
      {/* Left: Brand */}
      <div className="flex items-center flex-shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <Calendar className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Schedura</span>
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 flex justify-center px-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input 
            type="search" 
            placeholder="Search for anything..." 
            className="w-full pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:bg-slate-600 focus:border-blue-400"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-700">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
        </Button>
        
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>

        <Button variant="destructive" size="sm" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;