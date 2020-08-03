import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PageDefault from "../../../components/PageDefault";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";
import useForm from "../../../hooks/useForm";
import videosRepository from "../../../repositories/videos";
import categoriasRepository from "../../../repositories/categorias";

export default function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { handleChange, values } = useForm({
    titulo: "Vídeo padrão",
    url: "https://www.youtube.com/watch?v=-nYNd6EuZHU&feature=youtu.be",
    categoria: "React",
  });

  useEffect(() => {
    categoriasRepository.getAll().then((categoriasDoServer) => {
      setCategorias(categoriasDoServer);
    });
  }, []);
  console.log(categorias);
  return (
    <PageDefault>
      <h1>Cadastro de Video</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const categoriaEscolhida = categorias.find((categoria) => {
            return categoria.titulo === values.categoria;
          });

          videosRepository
            .create({
              titulo: values.titulo,
              url: values.url,
              categoriaId: categoriaEscolhida.id,
            })
            .then(() => {
              console.log("video cadastrado");
              history.push("/");
            });
        }}
      >
        <FormField
          label="Titulo do video"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />
        <FormField
          label="URL do video"
          name="url"
          value={values.url}
          onChange={handleChange}
        />
        <FormField
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <Button type="submit">Cadastrar</Button>
      </form>
      <Link to="/cadastro/categoria">Cadastrar categoria</Link>
    </PageDefault>
  );
}
