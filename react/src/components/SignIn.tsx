import React, { useContext, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../api/auth";
import { AuthContext } from "../App";
import Cookies from "js-cookie";
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

const SignIn: React.FC = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignInSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn({ email, password });
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSignInSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '320px' }}>
        <h1>ログイン</h1>
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ margin: '5px' }}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ margin: '5px' }}
        />
        <SendButton type="submit" variant="contained" endIcon={<SendIcon />}>
          続ける
        </SendButton>
        <Link to="/signup">アカウントの作成</Link>
      </form>
    </div>
  );
};

export default SignIn;