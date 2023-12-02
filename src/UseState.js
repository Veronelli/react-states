import React from "react";

const SECURITY_CODE = "SECRET";
const defaultValue = { error: false, loading: false, valueInput: "" };

function UseState({ name }) {
  const [state, setState] = React.useState({ ...defaultValue });

  React.useEffect(() => {
    setTimeout(() => {
      if (state.loading) {
        if (state.valueInput !== SECURITY_CODE) {
          setState({ ...state, error: true,loading: false });
          return
        }
        setState({ ...state,error:false, loading: false });
      }
    }, 3000);
  }, [state.loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor escribe el codigo de seguridad.</p>
      {state.error && !state.loading && <p>Error: El codigo es incorrecto</p>}
      {state.loading && <p>Loading...</p>}
      <input
        placeholder="Codigo de seguridad"
        type="password"
        value={state.valueInput}
        onChange={(event) => {
          setState({ ...state, valueInput: event.target.value });
        }}
      />
      <button
        onClick={() => {
          setState({ ...state, loading: true, error: false });
        }}
      >
        Comprobar
      </button>
    </div>
  );
}

export { UseState };
