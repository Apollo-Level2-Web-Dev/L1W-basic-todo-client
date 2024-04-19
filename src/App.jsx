import { LogOutIcon } from 'lucide-react';
import { Button } from './components/ui/button';
import Todos from './pages/Todos';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <>
      <Todos />
      <div className="absolute bottom-5 right-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger data-state="closed">
              <Button
                onClick={handleLogout}
                className="rounded-full size-16"
                variant="outline"
              >
                <LogOutIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}

export default App;
