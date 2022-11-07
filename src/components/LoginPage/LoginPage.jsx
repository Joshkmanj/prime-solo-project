import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  const goToAbout = () => {
    history.push('/about')
  }

  return (
    <div className="landing-grid">
      <center>
      <LoginForm />

        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
        <footer onClick={goToAbout}>&copy; Josh Kralewski</footer>
      </center>
    </div>
  );
}

export default LoginPage;
