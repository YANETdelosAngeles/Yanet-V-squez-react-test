import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Route, Navigate } from 'react-router-dom';

export function Required({ children }: { children: JSX.Element }) {
    const users = useSelector((state: RootState) => state.counter)
    const sessionAunt = users.find(user => user.session === true);
  
    if (!sessionAunt) 
    {
      return <Navigate to="/login" />;
    }
    else
    {
        return children;
    }    
}