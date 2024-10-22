import React from 'react'

const Forgot = () => {
  return (
    <div>
        <div id="forgot-password">
        <h2>Forgot Password</h2>
        <form id="forgot-password-form">
            <label for="reset-email">Enter your email:</label>
            <input type="email" id="reset-email" required/>
            <button type="submit">Send Password Reset Email</button>
            <button type="button" id="back-to-login">Back to Login</button>
        </form>
    </div>
    </div>
  )
}

export default Forgot