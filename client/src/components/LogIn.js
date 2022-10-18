import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LogIn = () => {
  const baseURL = "http://localhost:5000/server";

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      setError("Input field can not be empty!");
      return;
    }
    try {
      const res = await axios.post(`${baseURL}/log-in`, data);
      console.log(res.data);
      const token = res.data.accessToken;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg);
        //console.log(error);
      } else {
        setError("Oops! Something went wrong!");
        //console.log("Oops! Something went wrong!");
      }
    }
  };
  return (
    <div>
      <h1>Log In</h1>
      {error ? <div className="error">{error}</div> : " "}
      <Form className="logInForm" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div className="signUpLinkInLogin">
        <div>New to X? </div>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
};

export default LogIn;