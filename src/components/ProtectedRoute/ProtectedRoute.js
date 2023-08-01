import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Link, useNavigate } from "react-router-dom";


export function ProtectedRoute({children}) {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
      Auth.currentAuthenticatedUser()
          .then(
              () => setIsAuth(true)
          )
          .catch(() => {
              navigate('/signup')
          })
  }, [])

  return isAuth && children;
}
export default ProtectedRoute;