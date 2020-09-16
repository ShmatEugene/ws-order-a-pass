import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';

export default function Logout() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(logout());
  });

  return <Redirect to={'/'} />;
}
