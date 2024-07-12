import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../api/auth";
import { AuthContext } from "../App";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const SignUp = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const confirmSuccessUrl = "http://localhost:3000";

  const generateParams = () => {
    const signUpParams = {
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      confirmSuccessUrl: confirmSuccessUrl,
    };
    return signUpParams;
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();
    try {
      const res = await signUp(params);
      console.log(res);
      alert("confirm email");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <h1>サインアップページです</h1>
      <form>
        <div>
          <TextField
            type="email"
            id="email"
            label="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            type="password"
            id="password"
            label="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <TextField
            type="password"
            id="password_confirmation"
            label="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
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
        <Button type="submit" onClick={(e) => handleSignUpSubmit(e)}>
          続ける
        </Button>
      </form>
      <Link to="/signin">サインインへ</Link>
    </>
  );
};