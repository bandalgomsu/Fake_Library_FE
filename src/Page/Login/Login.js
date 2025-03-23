import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css";

export function Login({ darkMode }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`ID: ${id}, Password: ${password}`);
  };

  return (
    <div className={`login-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <h2>로그인</h2>
      <div className="input-group">
        <label htmlFor="id">ID</label>
        <input 
          type="text" 
          id="id" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          placeholder="아이디를 입력하세요" 
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="비밀번호를 입력하세요" 
        />
      </div>
      <button className="login-btn">로그인</button>
      <button className="signup-btn"><Link to = "/signUp">회원가입</Link></button>
    </div>
  );
}

export default Login;
