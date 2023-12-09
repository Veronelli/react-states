import React from "react";
import { act } from "react-dom/test-utils";

const SECURITY_CODE = "SECRET";

const initialState = {
  error: false,
  loading: false,
  valueInput: "",
  confirmed: false,
  deleted: false,
};

const reducerObject = (state, payload) => ({
  ERROR: {
    ...state,
    error: true,
    loading: false,
  },
  CHECK: {
    ...state,
    loading: true,
  },
  CONFIRM: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
    valueInput: "",
  },
  DELETE: {
    ...state,
    confirmed: false,
    deleted: true,
  },
  RESET: {
    ...state,
    confirmed: false,
    deleted: false,
  },
  WRITE: {
    ...state,
    valueInput: payload,
  },
});

const reducer = (state, action) => {
  const reducerInstance = reducerObject(state, action.payload)[action.type];
  if (reducerInstance) {
    return reducerInstance;
  }
  return state;
};

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    setTimeout(() => {
      if (state.loading) {
        if (state.valueInput !== SECURITY_CODE) {
          return dispatch({
            type: "ERROR",
          });
        }
        return dispatch({
          type: "CONFIRM",
        });
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
              dispatch({
                type: "WRITE",
                payload: event.target.value,
              });
            }}
          />
          <button
            onClick={() => {
              dispatch({ type: "CHECK" });
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
              dispatch({ type: "DELETE" });
            }}
          >
            Si, Eliminar
          </button>
          <button
            onClick={() => {
              dispatch({ type: "RESET" });
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
              dispatch({ type: "RESET" });
            }}
          >
            Recuperar UseState
          </button>
        </>
      )}
    </div>
  );
}

export { UseReducer };
