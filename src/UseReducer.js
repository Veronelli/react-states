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
  [actionTypes.ERROR]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.CHECK]: {
    ...state,
    loading: true,
  },
  [actionTypes.CONFIRM]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
    valueInput: "",
  },
  [actionTypes.DELETE]: {
    ...state,
    confirmed: false,
    deleted: true,
  },
  [actionTypes.RESET]: {
    ...state,
    confirmed: false,
    deleted: false,
  },
  [actionTypes.WRITE]: {
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

const actionTypes = {
  ERROR: "ERROR",
  CHECK: "CHECK",
  CONFIRM: "CONFIRM",
  DELETE: "DELETE",
  RESET: "RESET",
  WRITE: "WRITE",
};

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const onConfirm = () => {
    dispatch({ type: actionTypes.CONFIRM });
  };
  const onError = () => {
    dispatch({ type: actionTypes.ERROR });
  };
  const onCheck = () => {
    dispatch({ type: actionTypes.CHECK });
  };
  const onDelete = () => {
    dispatch({ type: actionTypes.DELETE });
  };
  const onReset = () => {
    dispatch({ type: actionTypes.RESET });
  };
  const onWrite = ({target}) => {
    dispatch({ type: actionTypes.WRITE, payload: target.value });
  };
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
            onChange={onWrite}
          />
          <button
            onClick={onCheck}
          >
            Comprobar
          </button>
        </>
      )}
      {!!state.confirmed && !state.deleted && (
        <>
          <p>Pedimos la confirmacion, ¿Estas seguro de Eliminar?</p>
          <button
            onClick={onDelete}
          >
            Si, Eliminar
          </button>
          <button
            onClick={onReset}
          >
            No, Me Arrepentí
          </button>
        </>
      )}
      {!state.confirmed && !!state.deleted && (
        <>
          <button
            onClick={onReset}
          >
            Recuperar UseState
          </button>
        </>
      )}
    </div>
  );
}

export { UseReducer };
