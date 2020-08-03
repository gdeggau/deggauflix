import { useState } from "react";

function useForm(valoresIniciais) {
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

  function clearForm() {
    setValue(valoresIniciais);
  }

  return {
    values,
    handleChange,
    clearForm,
  };
}

export default useForm;
