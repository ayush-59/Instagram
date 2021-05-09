import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";

function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const isInvalid = email === "" || password === "";

  const handleLogin = () => {};
  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iphone" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col bg-white items-center p-4 border border-gray-base mb-4">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              className="mt-2 mb-4 w-6/12"
              alt="Instagram"
            />
          </h1>

          {errors && <p className="mb-4 text-xs text-red-primary">{errors}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email address"
              type="email"
              placeholder="Email"
              className="text-sm text-gray-base px-5 py-4 mr-3 mb-2 w-full h-2
              border border-gray-primary rounded"
              onChange={({ target }) => {
                setEmail(target.value);
              }}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base px-5 py-4 mr-3 mb-2 w-full h-2
              border border-gray-primary rounded"
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
            <button
              type="submit"
              disabled={isInvalid}
              className={`w-full bg-blue-medium text-white rounded h-8 font-bold
              ${isInvalid && "opacity-50"}`}
            >
              Log In
            </button>
          </form>
        </div>
        <div
          className="flex flex-col justify-center items-center
        w-full bg-white p-4 border border-gray-base"
        >
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
