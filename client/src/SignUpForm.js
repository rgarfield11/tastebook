import React, { useState } from "react";

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
            password_confirmation: passwordConfirmation,
        }),
    }).then((r) => {
        if (r.ok) {
            r.json().then((user) => onLogin(user));
        } else {
            r.json().then((err) => setErrors(err.errors));
        }
    });
  }

  function mapErrors() {
    errors.map((err) => (
        <p key={err}>{err}</p>
    ))
  }

  return (
    <form className="signup_form" onSubmit={handleSubmit}>
        <h4>Sign Up</h4>
        <input
            placeholder="Enter Username"
            className="signup_input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
        />
        <br/>
        <input
            placeholder="Enter Password"
            className="signup_input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
        />
        <br/>
        <input
            placeholder="Confirm Password"
            className="signup_input"
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)} 
        />
        <br/>
        <button className="signup_btn" type="submit">Sign Up</button>
        <p>{mapErrors}</p>
    </form>
  )
}

export default SignUpForm