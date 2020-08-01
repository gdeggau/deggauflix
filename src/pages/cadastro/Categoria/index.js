import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageDefault from "../../../components/PageDefault";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";

export default function CadastroCategoria() {
  const valoresIniciais = {
    nome: "",
    descricao: "",
    cor: "",
  };
  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function handleChange(infosDoEvento) {
    setValue(
      infosDoEvento.target.getAttribute("name"),
      infosDoEvento.target.value
    );
    // setNomeDaCategoria(infosDoEvento.target.value);
  }
  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  //o primeiro parametro é o que vai acontecer quando o segundo parametro (array) for alterado
  //se o array estiver vazio [] so vai ser executado quando carregar a tela
  //se n passar o array, a funcao (primeiro parametro) vai ser executada em qualquer interação
  useEffect(() => {
    console.log("aloooooooo");

    const url = "http://localhost:8080/categorias";
    fetch(url).then(async (respostaServer) => {
      const resposta = await respostaServer.json();
      setCategorias([...resposta]);
    });

    // setTimeout(() => {
    //   setCategorias([
    //     ...categorias,
    //     {
    //       id: 1,
    //       nome: "Front End",
    //       "descricao:": "Categoria massa",
    //       cor: "#cbd1ff",
    //     },
    //     {
    //       id: 2,
    //       nome: "Back End",
    //       "descricao:": "Outra Categoria massa",
    //       cor: "#cbd1ff",
    //     },
    //   ]);
    // }, 4 * 1000);
  }, []);
  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {values.nome}</h1>

      <form
        onSubmit={function handleSubmit(infosEvento) {
          infosEvento.preventDefault();
          setCategorias([...categorias, values]);
          setValues(valoresIniciais);
        }}
      >
        <FormField
          label="Nome da categoria"
          name="nome"
          type="text"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          name="descricao"
          type="textarea"
          value={values.descricao}
          onChange={handleChange}
        />
        <FormField
          label="Cor"
          name="cor"
          type="color"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>Cadastrar</Button>
      </form>

      {categorias.length === 0 && <div>Loading...</div>}
      <ul>
        {categorias.map((categoria) => {
          return <li key={`${categoria.nome}`}>{categoria.nome}</li>;
        })}
      </ul>

      <Link to="/">Ir para home</Link>
    </PageDefault>
  );
}
