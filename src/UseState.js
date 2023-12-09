import React from "react";

const SECURITY_CODE = "SECRET";
const defaultValue = {
  error: false,
  loading: false,
  valueInput: "",
  confirmed: false,
  deleted: false,
};

function UseState({ name }) {
  const [state, setState] = React.useState({ ...defaultValue });

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
      valueInput: "",
    });
  };

  const onError = () => {
    setState({ ...state, error: true, loading: false, valueInput: "" });
  };

  const onWrite = (newValue) => {
    setState({ ...state, valueInput: newValue });
  };

  const onCheck = () => {
    setState({ ...state, confirmed: false, deleted: true });
  };

  const onDelete = ()=>{
    setState({ ...state, confirmed: false, deleted: true });
  }

  const onReset = ()=>{
    setState({ ...state, confirmed: false, deleted: false });
    
  }
  React.useEffect(() => {
    setTimeout(() => {
      if (state.loading) {
        if (state.valueInput !== SECURITY_CODE) {
          return onError();
        }
        return onConfirm();
      }
    }, 3000);
  }, [state.loading]);

  return (
    <div>
      {!state.confirmed && !state.deleted && (
        <>
          <h2>Eliminar {name}</h2>
          <p>Por favor escribe el codigo de seguridad.</p>
          {state.error && !state.loading && (
            <p>Error: El codigo es incorrecto</p>
          )}
          {state.loading && <p>Loading...</p>}
          <input
            placeholder="Codigo de seguridad"
            type="password"
            value={state.valueInput}
            onChange={(event) => {
              onWrite(event.target.value);
            }}
          />
          <button
            onClick={() => {
              onCheck();
            }}
          >
            Comprobar
          </button>
        </>
      )}
      {!!state.confirmed && !state.deleted && (
        <>
          <p>Pedimos la confirmacion, ¿Estas seguro de Eliminar?</p>
          <button
            onClick={() => {
              onDelete()
            }}
          >
            Si, Eliminar
          </button>
          <button
            onClick={() => {
              onReset();
            }}
          >
            No, Me Arrepentí
          </button>
        </>
      )}
      {!state.confirmed && !!state.deleted && (
        <>
          <button
            onClick={() => {
              onReset();
            }}
          >
            Recuperar UseState
          </button>
        </>
      )}
    </div>
  );
}

export { UseState };
