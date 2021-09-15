
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import ChatImage from "../chatImage.png";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useParams,useHistory } from "react-router-dom";
import db, { auth } from "../firebase";
import firebase from "firebase";
import arrow from '../assets/backarrow.png';
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import chatback from './../img/chatImage.png'

function MainContainer({ userName }) {
  let history = useHistory();
  const messageRef = useRef();
  let { userId } = useParams();
  const [user, setUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  var day = "none";
  // var newMessage,wait = false;
  // const [myself, setMyself] = useState([]);

  const getUser = () => {
    db.collection("users")
      .doc(userId)
      .onSnapshot((snapshot) => {
        setUser(snapshot.data());
      });
  };

  // const getMyself = () => {
  //   db.collection("users")
  //     .doc(auth.currentUser?.uid)
  //     .onSnapshot((snapshot) => {
  //       setMyself(snapshot.data());
  //     });
  // };

  const MyOptions = [
    <a href="mailto: connectchattingteam@gmail.com?subject=Reporting Abuse&body=Hi sir/madam, this is from the team connect, we ask you to send detailed information about your query. Attach screenshots to improve the chances of query resolution."style={{textDecoration: "none", fontSize: "15px", color: "#000", fontWeight: "bold"}}>Report</a>
  ];
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null)
  };


  const sendMessage = (messageData) => {
    if (userId) {
      let payload = {
        text: messageData.message,
        files: messageData.files?.length > 0 ? messageData.files : [],
        videos: messageData.videos?.length > 0 ? messageData.videos : [],
        voice: messageData.voice ? messageData.voice : "",
        senderEmail: auth.currentUser?.email,
        receiverEmail: user.email,
        timestamp: firebase.firestore.Timestamp.now(),
      };
      db.collection("chats").doc(userId).collection("messages").add(payload);
      db.collection("chats")
        .doc(auth.currentUser?.uid)
        .collection("messages")
        .add(payload);
        let Friend = {
          email: user?.email,
          photoURL: user?.photoURL,
          fullname: user?.fullname,
          newMessages: 0
        };
  
        let Friend2 = {
          email: auth.currentUser?.email,
          photoURL: auth.currentUser?.photoURL,
          fullname: auth.currentUser?.displayName,
          newMessages: firebase.firestore.FieldValue.increment(1)
        };
  
        db.collection("FriendsList")
          .doc(auth.currentUser?.uid)
          .collection("List")
          .doc(userId)
          .set(Friend);
  
          db.collection("FriendsList")
          .doc(userId)
          .collection("List")
          .doc(auth.currentUser?.uid)
          .set(Friend2,{merge:true});

    }
  };

  const getMessages = () => {
    db.collection("chats")
      .doc(auth.currentUser?.uid)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        let messages = snapshot.docs.map((doc) => doc.data());
        const newMessage =   messages  .filter(
          (message) =>
            message.senderEmail === (user?.email) ||
            message.receiverEmail === (user?.email)
        );
    
        setMessages(newMessage);
      });
};

const scrollToBottom = () => {
      messageRef.current?.scrollIntoView();
}

useEffect(() => {
  getUser();
  db.collection("FriendsList")
  .doc(auth.currentUser?.uid)
  .collection("List")
  .doc(userId)
  .update({
    newMessages: 0
  });
}, [userId]);

useEffect(() => {
getMessages();
}, [user]);

useEffect(() => {
scrollToBottom();
}, [messages]);

// useEffect(() => {
// setTimeout(() => {
//   getMyself();
// }, 500);
// }, [])

const checkDay = (timestamp) => {
  if(day == new Date(timestamp.toDate()).toString().slice(0,15))
  {
    return true;
  }
  day = new Date(timestamp.toDate()).toString().slice(0,15);
  return false;
}

// const checkNewMessage = (timestamp,senderEmail) => {
//   if(timestamp > myself?.lastOnline && !wait && senderEmail!=auth.currentUser.email)
//   {
//     wait = true;
//     return !newMessage;  
//    }
//    return newMessage;
// }
// console.log(typeof user?.isOnline !=='undefined')
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <img src={arrow} className="back" onClick={history.goBack}></img>
          <Profile >
            {user?.photoURL ? (
              <img
                src={user?.photoURL}
                style={{
                  width: "35px",
                  height: "35px",
                  marginLeft: "10px",
                  borderRadius: "50%",
                }}
                alt="error"
              />
            ) : (
              <ProfilePicture/>
            )}
          </Profile>

          <p className="_ghter54">{user?.fullname}</p>
          {user?.isOnline?
           <span className="onlineStatus"></span>
           :
            <p style={{fontWeight:"lighter",fontSize:"12px"}}> 
              {typeof user?.isOnline !=='undefined' &&<>LastSeen &nbsp;</>}
             {user?.lastOnline && new Date((user?.lastOnline).toDate()).toString().slice(16,21)}
             {user?.lastOnline && new Date((user?.lastOnline).toDate()).toString().slice(3,11)}
            </p>
          }
        </HeaderLeft>
        <HeaderRight>
        <IconButton 
            aria-label="more"
            onClick={handleClick}
            aria-haspopup="true"
            aria-controls="long-menu"
          >
          <MoreIcon />
          </IconButton>
          <Menu 
            anchorEl={anchorEl} 
            keepMounted onClose={handleClose} 
            open={open}>
            {MyOptions.map((option) => (
            <MenuItem 
              key={option} 
            >
              {option}
              </MenuItem>
            ))}
          </Menu>
        </HeaderRight>
      </Header>

      <MessageContainer>
        {messages.map((message) => (
          <><p className="day" style= {checkDay(message.timestamp)?
                        {display:"none"}:
                        {fontWeight:"bold"}}>
              {new Date((message.timestamp).toDate()).toString().slice(0,10)}
            </p>
            {/* {checkNewMessage(message.timestamp,message.senderEmail) && <p className="new">new message</p>} */}
            <ChatMessage
              text={message.text}
              sender={message.senderEmail}
              files={message.files}
              videos={message.videos}
              timestamp={message.timestamp}
              voice={message.voice}
            />
          </>
        ))}
        <div ref={messageRef} style={{width: 0, height: 0}}></div>
      </MessageContainer>

      <ChatInput sendMessage={sendMessage} />
    </Container>
  );
}

export default MainContainer;

const Container = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overscroll-behavior-y: contain;
  scroll-snap-type: y proximity;
  scroll-snap-align: end;
  min-width: 320px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Header = styled.div`
  height: 60px;
  width: 100%;
  background-color: rgb(230 230 230);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  p {
    margin:-2px 0 0 15px;
    font-weight: bold;
    font-size: 14.3px;
    color: #000;
  }
  cursor: pointer;
  .onlineStatus{
    display: inline-block;
    width: 10px;
    min-width: 10px;
    height: 10px;
    margin-left: 15px;
    background: #16e316;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 #16e316;
    transition : ease all 0.5s;
  }

  .back{
    display:none;
    @media (max-width: 600px) {
      margin-left:15px;
      width: 20px;
      display:block;
    }
  }
`;
const HeaderRight = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-around;
  color: #000;
`;

const Profile = styled.div`
  
  .MuiSvgIcon-root {
    font-size: 45px !important;
    cursor: pointer;
    color: #5f828e;
  }
`;
const ProfilePicture = styled(AccountCircleIcon)`
`;

const SearchIconic = styled(SearchIcon)`
  cursor: pointer;
`;
const MoreIcon = styled(MoreVertIcon)`
  cursor: pointer;
`;

const MessageContainer = styled.div`
background-image: url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png);
  flex: 1;
  display: flex;
  padding: 0;
  flex-direction: column;
  overflow-y: scroll !important;
  ::-webkit-scrollbar {
    width: 6px;
    overflow-y: scroll !important;
    scroll-behavior: smooth;
  }
  ::-webkit-scrollbar-thumb {
    background: #b6b6b6;
  }
  .day{
    font-size: 12px;
    margin: 5px auto;
    background: #e6e6e6;
    padding: 2px 5px;
    border-radius: 5px;
    position: sticky;
    z-index: 1;
    top: 5px;
  }
  .new{
    text-align: center;
    background: #f3f3f3;
    width: 100%;
    background: linear-gradient(to right, #fff, #f0f0f0 50%, #fff);
  }
`;