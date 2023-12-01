import React from "react";

const SECURITY_CODE = "SECRET";

function UseState({ name }) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [valueInput, setValueInput] = React.useState("");

  React.useEffect(() => {
    setTimeout(() => {
      if (loading) {
        if (valueInput !== SECURITY_CODE) {
          setError(true);
        }
        setLoading(false);
      }
    }, 3000);
  }, [loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor escribe el codigo de seguridad.</p>
      {(error && !loading) && <p>Error: El codigo es incorrecto</p>}
      {loading && <p>Loading...</p>}
      <input
        placeholder="Codigo de seguridad"
        type="password"
        value={valueInput}
        onChange={(event) => {
          setValueInput(event.target.value);
        }}
      />
      <button
        onClick={() => {
          setLoading(true);
          setError(false);
        }}
      >
        Comprobar
      </button>
    </div>
  );
}

export { UseState };
