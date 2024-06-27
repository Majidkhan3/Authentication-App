import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import { loginRoute } from "../utils/APIRoutes";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      try {
        const { data } = await axios.post(loginRoute, {
          username,

          password,
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/");
          toast.success("Login SuccessFully ", toastOptions);
        }
        // toast.success("Registered Successfully", toastOptions);
      } catch (error) {
        toast.error("Error registering user", toastOptions);
      }
    }
  };
  const [values, Setvalues] = useState({
    username: "",

    password: "",
  });
  const handleChange = (event) => {
    Setvalues({ ...values, [event.target.name]: event.target.value });
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("email and password is required", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("email and password is required", toastOptions);
      return false;
    }
    //  else {
    //   toast.success("Login  Successfully", toastOptions);
    // }
    return true;
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="" />
            <h1>Register User</h1>
          </div>
          <input
            name="username"
            type="text"
            placeholder="username"
            onChange={(event) => handleChange(event)}
            min={3}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(event) => handleChange(event)}
          />

          <button type="submit"> Login In</button>
          <span>
            {" "}
            Don't have an Account <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;
