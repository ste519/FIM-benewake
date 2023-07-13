import  { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here, e.g., make an API call
    console.log('Username:', username);
    console.log('Password:', password);
    navigate("/user", {replace: true})
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='input-container'>
        <input
          type="username"
          id="username"
          value={username}
          placeholder='用户名'
          onChange={handleUsernameChange}
        />
      </div>
      <div className='input-container'>

        <input
          type="password"
          id="password"
          value={password}
          placeholder='密码'
          onChange={handlePasswordChange}
        />
      </div>
      <button className="login-btn" type="submit">登录</button>
    </form>
  );
};

export default LoginForm;
