import React from "react";
import styled from "styled-components";

function FriendProfile({ fullname, photoURL, newMessages, displayChatInfo, onClick }) {
  return (
    <Container onClick={onClick}>
      <ProfilePicture>
        <img src={photoURL} alt="" />
      </ProfilePicture>

      <Content>
        <div className="line-one">
          <p className="username">{fullname}</p>

          {displayChatInfo ? <p className="date">26/07/2021</p> : ""}
          {displayChatInfo ? <p className="_dfrtes">Hey How are you?</p> : ""}
        </div>
      </Content>
      {newMessages > 0 && <p className="unread">{newMessages}</p> }
    </Container>
  );
}

export default FriendProfile;

const Container = styled.div`
  width: 100%;

  padding: 2px 0;
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: center;
  p {
      margin-top: 16px;
    }
  .unread {
    margin: 16px 30px 16px auto;
    background-color: #6865d2;
    color: #fff;
    font-size: 13px;
    padding: 0;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    text-align: center;
    vertical-align: center;
  }
`;

const ProfilePicture = styled.div`
  margin-left: 10px;
  cursor: pointer;
  img {
    width: 45px;
    height: 45px;
    border-radius: 100%;
    border: 0.2px solid #eeeeee;
  }
`;

const Content = styled.div`
  margin-left: 15px;
  :hover{
    cursor: pointer;
  }
  .line-one {
    max-width: 250px;
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
    // margin-top: 10px;
    .date {
      color: black;
      font-size: 14px;
    }
  }


`;
