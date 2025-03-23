import React, { useState } from 'react';
import "./SignUp.css";

export function SignUp({ darkMode }) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false); // ✅ 이메일 인증 성공 여부
  const [nickname, setNickname] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false); // ✅ 닉네임 중복 체크 완료 여부
  const [password, setPassword] = useState("");

  const handleEmailSend = () => {
    alert("인증번호가 발송되었습니다!");
    setEmailSent(true);
  };

  const handleEmailVerify = () => {
    if (emailCode === "1234") {
      setIsEmailVerified(true);
      alert("이메일 인증 성공!");
    } else {
      alert("인증 실패! 올바른 코드를 입력하세요.");
    }
  };

  const handleNicknameCheck = () => {
    if (nickname === "사용가능닉네임") {
      setIsNicknameAvailable(true);
      alert("닉네임 사용 가능!");
    } else {
      alert("닉네임이 이미 사용 중입니다.");
    }
  };

  const handleSignup = () => {
    if (isEmailVerified && isNicknameAvailable) {
      alert(`회원가입 완료!\n이메일: ${email}\n닉네임: ${nickname}`);
    }
  };

  return (
    <div className={darkMode ? "App dark-mode" : "App"}>
      <div className="container">
        <div className="signup-box">
          <h2>회원가입</h2>

          {/* ✅ 이메일 입력 + 인증 번호 발송 버튼 */}
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <div className="input-flex">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
              />
              <button className="verify-btn" onClick={handleEmailSend}>인증번호 발송</button>
            </div>
          </div>

          {/* ✅ 이메일 인증 번호 입력 필드 (이메일 발송 후 나타남) */}
          {emailSent && (
            <div className="input-group">
              <label htmlFor="emailCode">인증번호 입력</label>
              <div className="input-flex">
                <input
                  type="text"
                  id="emailCode"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                  placeholder="인증번호 입력"
                />
                <button className="verify-btn" onClick={handleEmailVerify}>확인</button>
              </div>
            </div>
          )}

          {/* ✅ 닉네임 입력 + 중복 검사 버튼 */}
          <div className="input-group">
            <label htmlFor="nickname">닉네임</label>
            <div className="input-flex">
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력하세요"
              />
              <button className="check-btn" onClick={handleNicknameCheck}>중복 검사</button>
            </div>
          </div>

          {/* ✅ 비밀번호 입력 */}
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {/* ✅ 회원가입 버튼 (이메일 인증 & 닉네임 중복 체크 완료 후 활성화) */}
          <button 
            className="signup-btn" 
            onClick={handleSignup} 
            disabled={!isEmailVerified || !isNicknameAvailable}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
