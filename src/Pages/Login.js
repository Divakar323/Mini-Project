import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/headicon.png";
import GoogleLogo from "../assets/google.png";
import db, { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import {Default} from 'react-spinners-css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import back from '../assets/background2.jpg';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import { Link } from 'react-router-dom';
import firebase from "firebase";

toast.configure()
function Login({ setUser, setSignUp }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const newUser = {
          fullname: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          isOnline: true
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        db.collection("users").doc(result.user.uid).set(newUser,{merge: true});
        // db.collection('users')
        //     .doc(auth.currentUser.uid)
        //     .update({
        //         isOnline: true,
        //         lastOnline: firebase.firestore.Timestamp.now(),
        // })
      })
      .catch((err) => toast.error(err.message,{position: toast.POSITION.TOP_CENTER, autoClose: 2000,hideProgressBar: true}));
  };

  const signInWithEmail =async (e) => {
    e.preventDefault();
    setLoading(true);
    
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth.user.emailVerified) {
          dispatch({
            type: "SET_USER",
            user: auth.user,
          });
          const newUser = {
            name: auth.user.displayName,
            photo: auth.user.photoURL,
            isOnline: true
          };
          
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
          
          db.collection('users')
          .doc(auth.user.uid)
          .update({
              isOnline: true
          })
          
        } else {
          toast.error("Please Verify Your Account",{position: toast.POSITION.TOP_CENTER, autoClose:3000,hideProgressBar: true});
        }
       
        setLoading(false);
      })
      .catch((error) => (toast.error((error.message),{position: toast.POSITION.TOP_CENTER, autoClose: 2000,hideProgressBar: true}),setLoading(false)));
  };

// console.log(loading)

  return (
    <Container style={{backgroundImage:"linear-gradient(to bottom, rgba(230, 230, 255, 0.8), rgba(230, 230, 255, 0.7)),url("+back+")",
                       backgroundRepeat:"repeat"}}>
      <Header>
        <div className="header__logo">
          <Link to="/">
            <img src={Logo} alt="logo image" />
          </Link>
        </div>

        <div className="header__title">
          <Link to="/" style={{textDecoration:"none", color:"#000"}}>
            <p>Connect</p>
          </Link>
        </div>
      </Header>
      <LoginComponent>
        <h3>Sign-In</h3>

        <LoginForm onSubmit={signInWithEmail}>
          <Email>
            {/* <p>Email</p> */}
            <input
            onPaste={(e)=>{
              e.preventDefault()
              return false;
            }} onCopy={(e)=>{
               e.preventDefault()
               return false;
            }}
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
            <EmailIcon className="icon"/>
          </Email>
          <Password>
            {/* <p>Password</p> */}
            <input
            onPaste={(e)=>{
              e.preventDefault()
              return false;
            }} onCopy={(e)=>{
               e.preventDefault()
               return false;
            }}
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LockIcon className="icon"/>
          </Password>

          <div className="signInOptions">    


          {loading ?<Default color="blue" size={34}/>
              : <button onClick={signInWithEmail}><span>Sign-In Securely</span></button>}
          
          {loading && <p style={{margin: "5px 30px 0 30px"}}>please wait..</p>}

            <OtherSignInOption onClick={signInWithGoogle}>
              <img src={GoogleLogo} alt="" />
              <p>Sign In With Google</p>
            </OtherSignInOption>
          </div>
          <div className="mt-2">
            <Link to="/forget" style={{ color: "black", fontWeight:"lighter", marginLeft:"5%" }}>
              <b className="text-secondary">Forget Password</b>
            </Link>
          </div>

          <p className="or__divider">
            ------------ <span className="OR__word">&nbsp; OR &nbsp;</span>{" "}
            ------------
          </p>

          <button className="register__btn" onClick={() => setSignUp(true)}>
            Create an Account
          </button>
        </LoginForm>
      </LoginComponent>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  margin:0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  height: 650px;
  min-height: 100vh;
  @media (max-width: 800px) {
    justify-content: flex-start;
    overflow: hidden !important;
  }
`;

const Header = styled.div`
  width: 90%;
  height: 60px;

  position: absolute;
  top: 20px;
  align-self: center;
  display: flex;
  align-items: center;
  .header__logo {
    width: 50px;
    margin-right: 20px;
    img {
      width: 100%;
    }
  }

  .header__title {
    margin: 10px 0;
    font-size: 30px;
    font-weight: bold;
    font-family: Verdana, Helvetica, sans-serif;
    text-transform: Capitalized;
    color: #fff;
    // background: rgba(255,255,255,0.7);
  }
`;

const LoginComponent = styled.div`
height: fit-content;
padding-bottom: 3%;
width: 50%;
position: absolute;
border-radius: 10px;
box-shadow: -4px 10px 40px -6px rgba(0, 0, 0, 0.30);

align-self: center;
top: 100px;

background-color: #f0f3fc;

display: flex;
flex-direction: column;

flex: none;

@media (max-width: 1080px) {
  width: 70%;
}

@media (max-width: 650px) {
  width: 100%;
  padding-bottom: 40px;
  margin-bottom: 40px;
}


transition: ease all .5s;

h3 {
  margin-left: 10%;
  margin-top: 30px;
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 24px;
  font-weight: 400;
}
`;

const LoginForm = styled.form`
  margin: 0 auto;
  margin-top: 23px;
  font-family: Verdana, Helvetica, sans-serif;
  width: 60%;
  button{
    height: fit-content;

    padding: 10px 20px;
    width: 11em;
    color: white;
    background-color: #1e496b;
    border: none;
    border-radius: 5px;
    margin-right: 20px;
    transition: all 0.5s;
    cursor: pointer;
    @media (max-width: 800px) {
      padding: 5px 20px;
    }
  }
  button:hover{
    background: dodgerblue;
  }


  .or__divider {
    text-align: center;
    margin: 20px auto 0 auto;
    color: gray;
    letter-spacing: -3px;
  }
  .OR__word {
    letter-spacing: -0.5px;
  }

  .register__btn {
    width: 100%;
    margin-top: 20px;
    align-items:center;
    height: fit-content;
    min-height: 45px;
    background-color: #1e496b;
  }

  .signInOptions {
    display: flex;
    margin-top: 30px;
  }

  input {
    width: 100%;
    padding-left: 35px;
    height: 40px;
    border:0;
    border-bottom: 2px solid #1e496b;
    outline: none;
    background: #f0f3fc;
  }
  input:focus {
    border-bottom: 2px solid dodgerblue;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px  #f0f3fc inset !important;
  }
`;

const Email = styled.div`
  p {
    font-size: 20px;
    margin-bottom: 20px;
  }
  input:focus+.icon {
    color: dodgerblue;
  }
  .icon {
    margin-top: -72px;
    font-size: 28px;
    padding-left: 10px;
    text-align: left;
  }
`;
const Password = styled.div`
  p {
    font-size: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  input:focus+.icon {
    color: dodgerblue;
  }
  .icon {
    margin-top: -72px;
    font-size: 28px;
    padding-left: 10px;;
    text-align: left;
  }
`;

const OtherSignInOption = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  width: fit-content;
  font-size:12px;

  @media (max-width: 800px) {
    width: 50px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 30px;
  }

  p {
    margin:0;
    @media (max-width: 800px) {
      display: none;
    }
  }
`;
