import React from 'react'
import AuthForm from './AuthForm';
import { sendUserAuthRequest } from '../../api-helpers/api-helpers';
import { userActions } from '../../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResRecieved = (data) =>{
    console.log(data);
    dispatch(userActions.login());
    localStorage.setItem("userId",data.id);
    navigate("/");
  }


  const getData =(data) =>{
   //console.log(data);
   sendUserAuthRequest(data.inputs,data.signup)
   .then(onResRecieved)
   .catch((err) => console.log(err));

  }
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false}/>
    </div>
  )
}

export default Auth;
