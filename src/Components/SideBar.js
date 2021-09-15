import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TollIcon from "@material-ui/icons/Toll";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FriendProfile from "./FriendProfile";
import db, { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import firebase from "firebase";
import { usePageVisibility } from 'react-page-visibility';


function SideBar({ signOut, user }) {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isVisible = usePageVisibility();

  // const [searchElement, setSearchElement] = useState({});

  const MyOptions = [
    <span style={{fontWeight: "bold"}}>Sign Out</span>
  ];
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null)
  };

  useEffect(() => {
    const fetchdata = async () => {
      const data = await db.collection("users").get();
      setUsers(
        data.docs.filter((doc) => doc.data().email !== auth.currentUser?.email)
      );
    };
    const fetchFriends = async () => {
      const data = await db
        .collection("FriendsList")
        .doc(auth.currentUser?.uid)
        .collection("List")
        .onSnapshot((snapshot) => {
          setFriendsList(snapshot.docs);
        });
    };
    fetchdata();
    fetchFriends();
  }, []);

  const searching = (e) => {
    setSearchInput(e.target.value);
  };
  const goToUser = (id) => {
    if (id) {
      history.push(`/${id}`);
    }
  };

  const searchItem = users.filter((data) => {
    if (searchInput) {
      if (
        data.data().email.toLowerCase().includes(searchInput.toLowerCase()) ||
        data.data().fullname.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return data;
      }
    }
  });

  const item = searchItem.map((data) => {
    return (
      <FriendProfile
        fullname={data?.data().fullname}
        photoURL={data?.data().photoURL}
        onClick={() => goToUser(data.id)}
      ></FriendProfile>
    );
  });

  // useEffect(() => {
  //     db.collection("users")
  //     .doc(auth.currentUser?.uid)
  //     .update({
  //       isOnline: true
  //     })
  // }, [])

  // window.addEventListener("beforeunload",(e)=>{
  //   e.preventDefault();
  //   db.collection("users")
  //   .doc(auth.currentUser?.uid)
  //   .update({
  //     isOnline: false,
  //     lastOnline: firebase.firestore.Timestamp.now(),
  //   })
  // })

  useEffect(() => {
if(isVisible && user){ 
    db.collection("users")
    .doc(auth.currentUser?.uid)
    .update({
      isOnline: true
    })}
else{
    db.collection("users")
    .doc(auth.currentUser?.uid)
    .update({
      isOnline: false,
      lastOnline: firebase.firestore.Timestamp.now(),
    })
}
}, [isVisible])

  return (
    <Container>
      <Header>
        <Profile
          onClick={() => {
            history.push("/login");
            signOut();
          }}
        >
          {auth?.currentUser?.photoURL ? (
            <img
              className="user__profile__image"
              src={auth.currentUser.photoURL}
              alt=""
            />
          ) : (
            <ProfilePicture />
            
          )}
          
          <div className="userName">
            {
              auth?.currentUser?.displayName?(
               <p>{auth.currentUser.displayName}</p>
              ):(
              null
            )}
          </div>

        </Profile>
        
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
              onClick={() => {
              history.push("/login");
              signOut();
              }}>
              {option}
              </MenuItem>
            ))}
          </Menu>
        </HeaderRight>
      </Header>

      <SearchContainer>
        <SearchBar
          placeholder="Search or Start new chat..."
          onChange={searching}
          value={searchInput}
        />
      </SearchContainer>

      <MainContent>
        {item.length > 0 ? (
          item
        ) : (
          <div className="friends__list">
            {friendsList.map((friend) => (
              <FriendProfile
                fullname={friend.data().fullname}
                photoURL={friend.data().photoURL}
                newMessages={friend.data().newMessages}
                onClick={() => goToUser(friend.id)}
              />
            ))}
          </div>
        )}
      </MainContent>
    </Container>
  );
}

export default SideBar;
const Container = styled.div`
  width: 35%;
  background-color: #f8f9fb;
  min-width: 280px;
  border-right: 1px solid lightgray;
  height: 100%;

  display: flex;
  flex-direction: column;
    @media (max-width: 600px) {
      width: 100vw;
    }
`;

const Header = styled.div`
  height: 60px;
  padding: 5px 0 5px 10px;
  background-color: rgb(230 230 230);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Profile = styled.div`

  display:flex;
  .MuiSvgIcon-root {
    font-size: 45px !important;
    color: #5f828e;
    cursor: pointer;
  }
  .user__profile__image {
    width: 45px;
    height: 45px;
    margin-top: 2px;
    border-radius: 100%;
    cursor: pointer;
  }
  .userName{
    margin:14px 0 0 15px;
    // margin-right: -70px;
    font-size: 14px;
    font-weight: bold;
    color: #000;
  
  }
`;
const ProfilePicture = styled(AccountCircleIcon)``;

const HeaderRight = styled.div`
  // margin-right: 10px;
  // display: flex;
  align-items: center;
  width: 50px;
  justify-content: space-around;

`;

const StatusIcon = styled(TollIcon)`
  font-size: 22px !important;
  color: #ffff;
  cursor: pointer;
`;

const NewChatIcon = styled(InsertCommentIcon)`
  font-size: 22px !important;
  color: #ffff;
  cursor: pointer;
`;

const MoreIcon = styled(MoreVertIcon)`
  font-size: 22px !important;
  // margin-right: -260px;
  color: #000;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f6f6f6;
`;

const SearchBar = styled.input`
  height: 30px;
  padding-left: 13px;
  font-size: 14px;
  width: 90%;
  border-radius: 20px;
  border: none;
  outline: none;
  :focus{
    border:none;
  }
`;

const Sidebar__chats = styled.div`
  flex: 1;
  background-color: white;
  overflow: auto;
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  // overflow-y: scroll;
  
  .friends__list{
    cursor:pointer;
    color: #000;
    font-weight: bold;
  }
  // .friends__list:hover{
  //   background-color: rgb(230 230 230);
  //   transition: 0.8s all;
  // }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #cccccc;
  }
`;
