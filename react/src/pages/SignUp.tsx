import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';

import { signUp } from "../api/auth";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const confirmSuccessUrl = "http://localhost:3000";
  const navigate = useNavigate();

  const handleSignUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp({
        email,
        password,
        passwordConfirmation,
        confirmSuccessUrl,
      });
      navigate("/signin");
    } catch (err) {
      if (Axios.isAxiosError(err) && err.response?.data.status === "error") {
        setErrorMessage(err.response.data.errors.fullMessages);
      }
      console.log(err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSignUpSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '450px' }}>
        <h1>アカウント作成</h1>
        {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
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
        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
        >
          続ける
        </Button>
        <Link to="/signin">ログインへ</Link>
      </form>
    </div>
  );
};

export default SignUp;