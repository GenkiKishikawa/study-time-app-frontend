import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { signUp } from "../api/auth";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import { styled } from "@mui/material";

const SendButton = styled(Button)({
  color: '#d9d9d9',
  backgroundColor: '#434343',
  '&:hover': {
    backgroundColor: '#333333',
  }
});

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const confirmSuccessUrl = "http://localhost:3000";

  const navigate = useNavigate();

  const generateParams = () => {
    const signUpParams = {
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      confirmSuccessUrl: confirmSuccessUrl,
    };
    return signUpParams;
  };

  const handleSignUpSubmit = async (e: any) => {
    e.preventDefault();
    const params = generateParams();
    try {
      const res = await signUp(params);
      console.log(res);
      navigate("/signin");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '450px' }}>
        <h1>アカウント作成</h1>
        <div>
          <TextField
            type="email"
            id="email"
            label="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ margin: '5px' }}
          />
        </div>
        <div>
          <TextField
            type="password"
            id="password"
            label="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ margin: '5px' }}
          />
        </div>
        <div>
          <TextField
            type="password"
            id="password_confirmation"
            label="パスワード(確認用)"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            sx={{ margin: '5px' }}
          />
        </div>
        <div>
          <input
            type="hidden"
            id="confirm_success_url"
            name="confirm_success_url"
            value={confirmSuccessUrl}
          />
        </div>
        <SendButton
          onClick={(e) => handleSignUpSubmit(e)}
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
        >
          続ける
        </SendButton>
        <Link to="/signin">ログインへ</Link>
      </form>
    </div>
  );
};

export default SignUp;