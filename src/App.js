import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "react-loading";
import "./App.css";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import { useState, useEffect } from "react";
import db, { auth } from "./firebase";
import MainContainer from "./Components/MainContainer";
import SideBar from "./Components/SideBar";
import ClipLoader from 'react-spinners/ClipLoader';
import FrontPage from './Components/home/home';
import Forget from "./Components/Forget/forget";
import firebase from "firebase";
import { Offline, Online } from "react-detect-offline";
import PermScanWifiIcon from '@material-ui/icons/PermScanWifi';
//import Notfound from "./Components/PageNotFound/page404";

function App() {
  const  [loading, setLoading] = useState(false)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(()=> {
    setLoading(true)
    setTimeout(()=> {
      setLoading(false)
    }, 1000)
  }, []);

  const [signUp, setSignUp] = useState(false);


  const signOut = () => {
     db.collection("users")
    .doc(auth.currentUser?.uid)
    .update({
      isOnline: false,
      lastOnline: firebase.firestore.Timestamp.now(),
    })

    auth
        .signOut()
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Container>
      <Online>
        <Router>
          <Switch>
            {
              loading ? 
              <ClipLoader
                size={100}
                color={'#7335dd'}
                loading={loading}
              />
              : 
              <Route exact={true} path="/">
              <div className="front">
                <FrontPage />
              </div>
              </Route>
            }
            {
              loading ? 
              <center>
              <div
                className="shadow p-3"
                style={{ backgroundColor: "#E7E7E7", justifyContent: "center"}}
              >
                <Loading type="bars" color="black" height={100} width={100} />

                <h3>Processing...</h3>
              </div>
            </center>:
              <Route exact={true} path="/forget">
                <Forget />
              </Route>
            }
            
        {!user && signUp ? (
          <Route exact={true} path="/login">
            <SignUp setSignUp={setSignUp} />
          </Route>
        ) : !user && !signUp ? (
          <Route exact={true} path="/login">
            <Login setUser={setUser} setSignUp={setSignUp} />
          </Route>
        ) : (
          <Switch>
            <Route path="/login">
              <Home signOut={signOut} user={user}/>
            </Route>
            <Route path="/:userId" exact>
              <div className="chatDisplaysmall">
                <MainContainer userName={user.fullname}/>
              </div>
              <div className="chatDisplay">
                <SideBar signOut={signOut} user={user} />
                <MainContainer userName={user.fullname} />
              </div>
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
          </Switch>
        )}
        </Switch>
        {/*<Route path="\*" component={Notfound}/>*/}
      </Router>
      </Online>
      <Offline >
      <PermScanWifiIcon className="wifi"/>
        <span style={{fontSize: "20px"}}>Please check your connection</span>
      </Offline>
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin:0;
  padding:0;
  display: flex;
  width: 100vw;
  min-height: calc(var(--vh, 1vh) * 100);
  height: fit-content;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #7335dd 20%,#dbdbdb 0%,#dbdbdb 50%,#dbdbdb 80%);

  .wifi{
    color: darkblue;
    font-size: 90px;
  }
  .front
  {
    overflow: hidden !important;
    scroll-behavior: smooth;
    height: 100%;
  }

  .chatDisplay {
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
    background-color: #fafafa;
    display: flex;
    @media (min-width: 1000px) {
        width: 95vw;
        height: calc(var(--vh, 1vh) * 90);
        // min-height: 600px;
        box-shadow: -4px 10px 40px -6px rgba(0, 0, 0, 0.80);
    }
    @media (max-width: 600px) {
      display: none;
    }
  }

  .chatDisplaysmall {
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100); 
    // box-shadow: -4px 10px 40px -6px rgba(0, 0, 0, 0.90);
    background-color: #fafafa;
    display: flex;
    @media (min-width: 600px) {
      display: none;
    }
  }
`;
