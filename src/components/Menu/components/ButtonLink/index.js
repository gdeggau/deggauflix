import React from "react";

function ButtonLink(props) {
  console.log(props);
  //props => {className: "o que alguém passar", href: "/"}
  //a propriedade children é o próprio react que cria, no caso children é o valor que vai no interior da tag chamada
  return (
    <a href={props.href} className={props.className}>
      {props.children}
    </a>
  );
}

export default ButtonLink;
