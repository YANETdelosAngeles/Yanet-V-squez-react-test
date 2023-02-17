import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate } from 'react-router-dom';

export function RequiredEmployeesRandom({ children }: { children: JSX.Element }) {
    const users = useSelector((state: RootState) => state.counter)
    const sessionAunt = users.find(user => user.session === true);
  
    if (sessionAunt) 
    {
      return <Navigate to="/employees" />;
    }
    else
    {
        return <Navigate to="/login" />;
    }    
}