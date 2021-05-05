import React, { useState, useEffect } from "react";
import "./login.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
export const Login = (props) => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [state, setState] = useState({
    token: "",
    password: "",
    username: "",
    error: null,
  });

  const callAPI = (credentials) => {
    const result = fetch(
      "https://api-int.cryptobucksapp.com/api/v1/auth/sign-in",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    )
      .then(
        (data) => data.json(),
        (error) => error
      )
      .then((data) => {
        return data;
      });
    return result;
  };

  useEffect(() => {
    let sessionToken = window.localStorage.getItem("sessionToken");
    if (sessionToken && sessionToken !== "") {
      setState({ ...state, token: sessionToken });
      props.history.push("/dashboard");
    } else {
      window.localStorage.removeItem("sessionToken");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    // console.log(JSON.stringify(data));
    const user = await callAPI({
      username: state.username,
      password: state.password,
    });

    if (user.error) {
      setState({
        ...state,
        error: user.message,
      });
    } else {
      setState({ ...state, token: user.data.token });
      window.localStorage.setItem("sessionToken", user.data.token);
      history.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Sign In</h3>
      <div className="form-group">
        <label>Email address</label>
        <input
          {...register("username", { required: true })}
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) =>
            setState({ ...state, username: e.target.value, error: null })
          }
        />
        {errors?.username?.type === "required" && <p>This field is required</p>}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          {...register("password", { required: true })}
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) =>
            setState({ ...state, password: e.target.value, error: null })
          }
        />
        {errors?.password?.type === "required" && <p>This field is required</p>}
      </div>

      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Submit
      </button>

      {state.error !== "null" && <p className="text-center"> {state.error}</p>}

      {/* <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p> */}
    </form>
  );
  //   }
};
