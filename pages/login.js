import { useState, UseContext, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../context";
import { toast } from "react-toastify";

import AuthForm from "../component/forms/AuthForm";
import styles from "../styles/Home.module.css";
const Login = () => {
  const [email, setEmail] = useState("Amen43@gmail.com");
  const [password, setPassword] = useState("12345678");

  const [loading, setLoading] = useState(false);

  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      setLoading(true);
      const { data } = await axios.post(
        `/user/login`,
        {
          email,
          password,
        },
        {
          headers : {
          "Content-Type": "application/json",
        },
      }

        
      );
      console.log("Data response", data.error);
      if (!data) {
        toast.error(data);
        setLoading(false);
      } else {
        setState({
          user: data.user,
          token: data.token,
        });
        //save in localStorage
        window.localStorage.setItem("auth", JSON.stringify(data));
        // console.log(data);
        router.push("/");
      }
    } catch (err) {
      // toast.error(err.response.data);
      setLoading(false);
    }
  };

  if (state && state.token) router.push("/");
  return (
    <div className={styles.container}>
    
      <main className={styles.main}>
        {console.log("login page")}
        <h1 className={styles.title}>
          LO<a href="#">GIN</a>
        </h1>
        {/* {loading ? <h1>laoding</h1> : ""} */}
        <div className={styles.grid}>
          <div className={styles.card}>
            <AuthForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              page="login"
            />
          </div>
        </div>

        <div className="">
          <div className="">
            <p className="">
              not yet registred{" "}
              <Link href="/register">
                <a>Register</a>
              </Link>
            </p>
          </div>
        </div>
        <div className="">
          <div className="">
            <p className="">
              {" "}
              <Link href="/forgot-password">
                <a className="">Forgot password</a>
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Login;
