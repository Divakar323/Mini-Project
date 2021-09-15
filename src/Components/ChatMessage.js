import React from "react";
import styled from "styled-components";
import { auth } from "../firebase";

function ChatMessage({ text, timestamp, voice, sender, videos, files }) {
  return (
    <Container sender={sender}>
      <AttachFiles filesLength={files.length || videos.length}>
        {files &&
          files?.map((file) => (
            <div
              key={file}
              className="image__cont"
              style={{
                width: "200px",
                height: "200px",

                display: "flex",
                alignItems: "stretch",
              }}
            >
              <img
                src={file}
                alt="some thing went wrong"
                style={{
                  width: "100%",

                  imageRendering: "pixelated",
                }}
              />
            </div>
          ))}

        {videos &&
          videos.map((video) => (
            <div
              key={video}
              className="video__cont"
              style={{
                width: "200px",
                height: "200px",
                border: "1px solid green",
                display: "flex",
                alignItems: "center",
              }}
            >
              <video src={video} alt="" width="100%" height="100%" />
            </div>
          ))}
      </AttachFiles>
      <Text>
        <p>{text}</p>
      </Text>
      <DateMessage>
        <p>{new Date(timestamp.toDate()).toString().slice(16,21)}</p>
      </DateMessage>
    </Container>
  );
}

export default ChatMessage;

const Container = styled.div`
  display: flex;
  margin: 0px 15px 15px 15px;
  flex-direction: column;
  position: relative;
  width: fit-content;
  max-width: 400px;
  // padding: 12px;
  word-break: break-word;

  @media (min-width: 750px) {
    min-width: 200px;
  }
  @media (max-width: 1000px) {
    max-width: 350px;
    min-width: 130px;
  }
  @media (max-width: 750px) {
    max-width: 220px;
  }
  padding-right: 10px;
  height: auto;
  align-self: ${(props) =>
    props.sender === auth.currentUser?.email ? "flex-end" : "flex-start"};
  border-radius: 10px;
  box-shadow: -2px 5px 10px -4px rgba(0, 0, 0, 0.30);
  background-color: ${(props) =>
    props.sender === auth.currentUser?.email ? "#7e7db6" : "#656565"};
  font-size: 14px;
`;

const Text = styled.div`
  p{margin: 0;}
  padding: 10px 0 0 10px;
  line-height: 20px;
  color: white;
  // font-weight: bold;
`;
const DateMessage = styled.div`
  font-size: 11px;
  color: #eee;
  font-weight: lighter;
  // margin-top: 10;
  align-self: flex-end;
`;

const AttachFiles = styled.div`
  display:  ${(props) =>
    props.filesLength > 0 ? "grid": "none"};
  grid-gap: 10px;
  padding: 10px 0 0 10px;
  grid-template-columns: ${(props) =>
    props.filesLength > 1 ? "repeat(2, 200px)" : "200px"};
`;
