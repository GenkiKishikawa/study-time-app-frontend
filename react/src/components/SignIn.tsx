import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../api/auth";
import { AuthContext } from "../App";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const SignIn = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password,
    };
    return signInParams;
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();

    try {
      const res = await signIn(params);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <h1>サインインページです</h1>
      <form>
        <div>
          <TextField
            type="email"
            id="email"
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            type="password"
            id="password"
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" onClick={(e) => handleSignInSubmit(e)}>
          Sign in
        </Button>
      </form>
      <Link to="/signup">サインアップへ</Link>
    </>
  );
};