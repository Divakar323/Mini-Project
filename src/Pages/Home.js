import React from "react";
import styled from "styled-components";

import SideBar from "../Components/SideBar";
import whatsappHome from "../assets/Bubbles-alt-icon.png";
import disableBrowserBackButton from '../Disableback'
function Home({ signOut, user}) {
  {
    disableBrowserBackButton();
  return (
    <Container>
      <Main>
        <SideBar signOut={signOut} user={user} />
        <div className="sg__2gf5">
          <img src={whatsappHome} alt="" />
        </div>
      </Main>
    </Container>
  );
  }
}

export default Home;

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 100);
  // min-height: 600px;
  // max-height: 1400px;
  // background-color: red;
  position: relative;
  @media (max-width: 1366px) {
    justify-content: flex-start;
  }
  @media (min-width: 1000px) {
    width: 95vw;
    height: calc(var(--vh, 1vh) * 90);
    //min-height: 600px;
    box-shadow: -4px 10px 40px -6px rgba(0, 0, 0, 0.80);
  }
`;

const Main = styled.div`
  display: flex;
  // position: absolute;
  height: 100%;
  width: 100%;
  // min-width: 800px;
  // max-width: 1400px;
  background-color: #fafafa;
  align-self: center;
  @media (max-width: 1368px) {
    position: unset;
  }
  // top: 90px;
  .sg__2gf5 {
    width: 500px;
    height: 500px;
    margin: auto;

    img {
      width: 100%;
    }

    @media (max-width: 600px) {
      display: none;
    }
  }
`;
