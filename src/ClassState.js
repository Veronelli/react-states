import React from "react";
import { Loading } from "./Loading";

const SECURITY_KEY = "SECRET";

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
      value: "",
    };
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate() {
    console.log(this.state)
    if (this.state.loading) {
      setTimeout(() => {
        if (this.state.value === SECURITY_KEY) {
          this.setState({...this.state, loading:false, error: false });
        } else this.setState({ ...this.state, loading: false, error: true });
      }, 1000);
    }
  }
  render() {
    const { value, loading, error } = this.state;
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor escribe el codigo de seguridad.</p>
        {error && <p>Error: el codigo es incorrecto</p>}
        {!!loading && <Loading />}
        <input
          value={value}
          placeholder="Codigo de seguridad"
          type="password"
          onChange={(event) => {
            this.setState({ ...this.state, value: event.target.value });
          }}
        />
        <button onClick={() => this.setState({ ...this.state, loading: true, })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
