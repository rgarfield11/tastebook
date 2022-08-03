import React, { useState } from 'react'
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function Login({onLogin}) {
    const [showLogin, setShowLogin] = useState(true)
  return (
    <div className="login_wrapper">
      <h1 className="login_logo">tastebook</h1>
        {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <p className="login_form_switch">
            Don't have an account? &nbsp;
            <button className="login_btn_switch"onClick={() => setShowLogin(false)}>Sign Up</button>
          </p>
        </>
        ) : (
        <>
          <SignUpForm onLogin={onLogin} />
        </>
        )}
    </div>
  )
}

export default Login