import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageDefault from "../../../components/PageDefault";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import useForm from "../../../hooks/useForm";

export default function CadastroCategoria() {
  const valoresIniciais = {
    nome: "",
    descricao: "",
    cor: "",
  };
  const { handleChange, values, clearForm } = useForm(valoresIniciais);
  const [categorias, setCategorias] = useState([]);

  //o primeiro parametro é o que vai acontecer quando o segundo parametro (array) for alterado
  //se o array estiver vazio [] so vai ser executado quando carregar a tela
  //se n passar o array, a funcao (primeiro parametro) vai ser executada em qualquer interação
  useEffect(() => {
    const url = window.location.hostname.includes("localhost")
      ? "http://localhost:8080/categorias"
      : "https://deggauflix.herokuapp.com/categorias";
    fetch(url).then(async (respostaServer) => {
      const resposta = await respostaServer.json();
      console.log(resposta);
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
          clearForm();
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
          return <li key={`${categoria.titulo}`}>{categoria.titulo}</li>;
        })}
      </ul>

      <Link to="/">Ir para home</Link>
    </PageDefault>
  );
}
