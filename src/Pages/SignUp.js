import React, { useRef, useState } from "react";
import styled from "styled-components";
import {Default} from 'react-spinners-css'
import Logo from "../assets/headicon.png";
import showPwdImg from './show-password.svg';
import hidePwdImg from './hide-password.svg';
import db, { auth, storage } from "../firebase";
import validator from 'validator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import back from '../assets/background2.jpg';
import { Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import firebase from "firebase";

toast.configure()
function SignUp({ setSignUp }) {
  // const history = useHistory();
  const storageRef = storage.ref();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [profile, setProfile] = useState("");
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [matchError, isMatching] = useState('');
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const validate = (value) =>{
    if(validator.isStrongPassword(value, {
      minLength: 6, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorMessage('Strong Password')
    } else{
      setErrorMessage('Weak Password');
    }
  }

  const CheckMatching = (value) =>{
    if(value !== password){
      isMatching('Password not Matching')
    } else{
      isMatching('');
    }
  }
  
  const signUp = (e) => {
    e.preventDefault();
    setLoading(true);
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      result.user.updateProfile({
        id: result.user.uid,
        displayName: fullname,
        photoURL: profile,
        email: email,
      });

      result.user
        .sendEmailVerification()
        .then(toast.info("Mail Sent...verify your account!", {position: toast.POSITION.TOP_CENTER, autoClose: 3000}))
        .catch((error) => {
          toast.error(error.message,{position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000});
        });
        const newUser = {
          fullname: fullname,
          email: email,
          lastOnline: firebase.firestore.Timestamp.now(),
          photoURL: profile,
        };
      db.collection("users").doc(result.user.uid).set(newUser);

        setSignUp(false);
        setLoading(false);
    })
    .catch((error) => (toast.error(error.message,{position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000, hideProgressBar:true}),setLoading(false)));
  };

  const setPicture = async (e) => {
    setDisable(true);
    const file = e.target.files[0];
    console.log(file);

    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const link = await fileRef.getDownloadURL();
    setProfile(link);
    console.log(profile);
    setDisable(false);
  };

  return (
    <Container style={{backgroundImage:"linear-gradient(to bottom, rgba(230, 230, 255, 0.8), rgba(230, 230, 255, 0.7)),url("+back+")",backgroundRepeat:"repeat"}}>
      <Header>
        <div className="header__logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="header__title">
          <Link to="/" style={{textDecoration:"none", color:"#000"}}>
            <p>Connect</p>
          </Link>
        </div>
      </Header>
      <SignUpComponent >
        <h3>Create an Account<PersonAddIcon className="icon"/></h3>
        
        <SignUpForm onSubmit={signUp}>
          <Name>
            {/* <p>Full Name</p> */}
            <input
              type="text"
              name="name"
              placeholder="Enter FullName"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
            <PersonIcon className="icon"/>
          </Name>
          <Email>
            {/* <p>Email</p> */}
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              required
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
              required
              type={isRevealPwd ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {validate(e.target.value); setPassword(e.target.value);}}
            />
            <LockIcon className="icon"/>
            <img 
              title={isRevealPwd ? "Hide password" : "Show password"} 
              src={isRevealPwd ? hidePwdImg : showPwdImg} 
              onClick={() => setIsRevealPwd(prevState => !prevState)}
            />
            <br />
            <span style={{color: 'gray', fontSize: '14px'}}>
              <ul>
                <li>Lenght of password should be 6</li>
                <li>Lowercase atleast 1</li>
                <li>Uppercase atleast 1</li>
                <li>Numbers(0-9) atleast 1</li>
                <li>atleast one Special Character(@,$,%,^)</li>
              </ul>
            </span>
            <span style={errorMessage ==='Strong Password'?{fontWeight: 'bold', color: 'green'}:{fontWeight: 'bold', color: 'red'}}>{errorMessage}</span>
          </Password>

          <RePassword>
            {/* <p>Confirm Password</p> */}
            <input
              onPaste={(e)=>{
                e.preventDefault()
                return false;
              }} onCopy={(e)=>{
                e.preventDefault()
                return false;
              }}
              required
              type="password"
              name="repassword"
              placeholder="Re-Enter password"
              value={repassword}
              onChange={(e) => {CheckMatching(e.target.value); setRepassword(e.target.value);}}
            /><br />
            <span style={{fontWeight: 'bold', color: 'red', fontSize: '13px'}}>{matchError}</span>
          </RePassword>

          <ProfilePicture>
            <p>Profile Picture</p>

            {disable && <Default color="blue" size={16}/>}
            <input accept="image/*" type="file" onChange={setPicture} disabled={disable||loading} />
            
          </ProfilePicture>
          {loading && <Default color="blue" size={16}/>}
          <button type="submit" disabled={disable||loading}>
            Create a Account
          </button>
          <button onClick={() => setSignUp(false)}>Back to login</button>
        </SignUpForm>
      </SignUpComponent>
    </Container>
  );
}

export default SignUp;


const Container = styled.div`
  margin:0;
  width:100vw;
  display: flex;
  flex-direction: column;
  height: 900px;
  min-height: 100vh;
  padding-bottom: 100px;
  
  @media (max-width: 650px) {
    display: flex;
    width: 100%;
    margin: 0;
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
    margin-right: 10px;
    img {
      width: 100%;
    }
  }

  .header__title {
    margin: 10px;
    font-size: 30px;
    font-weight: bold;
    font-family: Verdana, Helvetica, sans-serif;
    text-transform: Capitalized;
    color: #fff;
    // background: rgba(255,255,255,0.7);
  }
`;

const SignUpComponent = styled.div`
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

  .icon{
    font-size: 130%;
    margin-left: 15px;
  }
}
`;

const SignUpForm = styled.form`
  margin: 0 15%;
  margin-top: 30px;

  button {
    margin-top: 15px;
    height: 40px;
    padding: 5px 20px 5px 20px;
    width: 11em;
    color: white;
    background-color: #1e496b;
    border: none;
    border-radius: 5px;
    margin-right: 20px;
    transition: all 0.5s;
    cursor: pointer;
  }
  button:hover{
    background: dodgerblue;
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

const Name = styled.div`
  p {
    font-size: 18px;
    font-family: Verdana, Helvetica, sans-serif;
    margin-bottom: 10px;
  }
  .icon {
    margin-top: -72px;
    font-size: 30px;
    padding-left: 10px;;
    text-align: left;
  }

  input:focus+.icon {
    color: dodgerblue;
  }

  margin-bottom: 10px;
`;

const Email = styled.div`
  p {
    font-size: 18px;
    font-family: Verdana, Helvetica, sans-serif;
    margin-bottom: 10px;
  }
  .icon {
    margin-top: -72px;
    font-size: 30px;
    padding-left: 10px;;
    text-align: left;
  }
  input:focus+.icon {
    color: dodgerblue;
  }
  margin-bottom: 20px;
`;
const Password = styled.div`
  p {
    font-size: 18px;
    font-family: Verdana, Helvetica, sans-serif;
    margin-bottom: 10px;
  }
  .icon {
    margin-top: -72px;
    font-size: 30px;
    padding-left: 10px;;
    text-align: left;
  }
  input:focus+.icon {
    color: dodgerblue;
  }
  img{
    width:20px;
    cursor: pointer;
    position: absolute;
    // top:5px;
    margin-top: -30px;
    right:17.5%;

  }

  margin-bottom: 20px;
`;

const RePassword = styled.div`
  p {
    font-size: 18px;
    font-family: Verdana, Helvetica, sans-serif;
    margin-bottom: 10px;
  }

  input:focus+.icon {
    color: dodgerblue;
  }
  margin-bottom: 20px;
`;

const ProfilePicture = styled.div`
  p {
    font-size: 16px;
    margin-bottom: 10px;
  }
  

  input {
    width: 80%;
    padding-left: 5px;
    height: 30px;
    border-radius: 8px;
    outline: none;
    border: 0;
  }
  input:focus {
    border: 2px solid ;
    border-radius: 10px;
  }

  margin-bottom: 20px;
`;