import { SyncOutlined } from "@ant-design/icons";

import styles from "../../styles/Home.module.css";
const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
  username,
  setUsername,
  about,
  setAbout,
  profileUpdat,
}) => (
  <form onSubmit={handleSubmit}>
    {profileUpdat && (
      <div className="">
        <small>
          <label className="">User name</label>
        </small>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className=""
          placeholder="User Name"
        />
      </div>
    )}
    {profileUpdat && (
      <div className="">
        <small>
          <label className="">About</label>
        </small>
        <input
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          type="text"
          className=""
          placeholder="Write about yourself.."
        />
      </div>
    )}
    {page !== "login" && (
      <div className="">
        <small>
          <label className="">your name</label>
        </small>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className=""
          placeholder="Enter Name"
        />
      </div>
    )}
    <div style={{display:"flex",flexDirection:"column"}}>
      <small>
        <label style={{fontSize:"10px",marginRight:"5px"}}>Email address</label>
      </small>
      <input
      className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        
        placeholder="Email address"
        disabled={profileUpdat}
      />
 
  </div>
  <div style={{display:"flex",flexDirection:"column",marginTop:"5px"}}>
      <small>
        <label style={{fontSize:"10px"}}>Password</label>
      </small>
      <input
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
     
        placeholder="Password"
      />
    </div>
    
    <div style={{marginTop:"5px"}}>
      <button
        disabled={
          profileUpdat ? loading :
          page === "login"
            ? !email || !password || loading
            : !name || !email || !secret || !password || loading
        }
        className={styles.button} 
      >
        {loading ? <SyncOutlined spin className="py-1" /> : "submit"}
      </button>
    </div>
  </form>
);

export default AuthForm;
