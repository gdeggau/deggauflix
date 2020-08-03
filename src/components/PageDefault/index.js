import React from "react";
import Menu from "../Menu";
import Footer from "../Footer";
import styled, { css } from "styled-components";

const Main = styled.main`
  background-color: #141414;
  color: var(--white);
  flex: 1;
  padding-top: 50px;
  padding-left: 5%;
  padding-right: 5%;
  ${({ paddingAll }) =>
    css`
      padding: ${paddingAll};
    `}
`;

//children é uma desustruturação de props.children
function PageDefault({ children, paddingAll }) {
  //<> é chamado de fragment, também existe a sintaxe React.Fragment
  return (
    <>
      <Menu />
      <Main paddingAll={paddingAll}>{children}</Main>
      <Footer />
    </>
  );
}

export default PageDefault;
