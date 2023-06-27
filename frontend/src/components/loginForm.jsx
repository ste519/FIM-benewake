import  { useState, useEffect} from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
          required
        />
      </div>
      <div className='input-container'>

        <input
          type="password"
          id="password"
          value={password}
          placeholder='密码'
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
