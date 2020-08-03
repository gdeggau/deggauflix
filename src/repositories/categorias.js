import config from "../config";

const URL_CATEGORIES = `${config.URL_BACKEND}/categorias`;

function getAllWithVideos() {
  console.log(config.URL_BACKEND);

  return fetch(`${URL_CATEGORIES}?_embed=videos`).then(
    async (respostaServer) => {
      if (respostaServer.ok) {
        const resposta = await respostaServer.json();
        return resposta;
      }

      throw new Error("Não foi possível pegar os dados");
    }
  );
}

function getAll() {
  console.log(config.URL_BACKEND);

  return fetch(`${URL_CATEGORIES}`).then(async (respostaServer) => {
    if (respostaServer.ok) {
      const resposta = await respostaServer.json();
      return resposta;
    }

    throw new Error("Não foi possível pegar os dados");
  });
}

export default {
  getAllWithVideos,
  getAll,
};
