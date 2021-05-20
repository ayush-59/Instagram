import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExists } from "../services/firebase";

function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const isInvalid = email === "" || password === "";

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExists(username);
    if (!usernameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username,
          fullName: fullName,
          avatar: "/images/avatars/default.png",
          followers: [],
          following: [],
          emailAddress: email,
          dateCreated: Date.now(),
        });
        setTimeout(() => {
          history.push(ROUTES.DASHBOARD);
        }, 500);
      } catch (error) {
        setUsername("");
        setFullName("");
        setEmail("");
        setPassword("");
        setErrors(error.message);
      }
    } else {
      setUsername("");
      setErrors("This username is already taken, please try another");
    }
  };

  useEffect(() => {
    document.title = "SignUp - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iphone" />
      </div>

      <div className="flex flex-col w-2/5">
        <div className="flex flex-col bg-white items-center rounded p-4 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              className="mt-2 mb-4 w-6/12"
              alt="Instagram"
            />
          </h1>

          {errors && <p className="mb-4 text-xs text-red-primary">{errors}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your Username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base px-5 py-4 mr-3 mb-2 w-full h-2
              border border-gray-primary rounded"
              onChange={({ target }) => {
                setUsername(target.value.toLowerCase());
              }}
              value={username}
            />
            <input
              aria-label="Enter your Full Name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base px-5 py-4 mr-3 mb-2 w-full h-2
              border border-gray-primary rounded"
              onChange={({ target }) => {
                setFullName(target.value);
              }}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="email"
              placeholder="Email"
              className="text-sm text-gray-base px-5 py-4 mr-3 mb-2 w-full h-2
              border border-gray-primary rounded"
              onChange={({ target }) => {
                setEmail(target.value.toLowerCase());
              }}
              value={email}
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
              value={password}
            />
            <button
              type="submit"
              disabled={isInvalid}
              className={`w-full bg-blue-medium text-white rounded h-8 font-bold
              ${isInvalid && "opacity-50"}`}
            >
              Sign Up
            </button>
          </form>
        </div>

        <div
          className="flex flex-col justify-center rounded items-center
        w-full bg-white p-4 border border-gray-primary"
        >
          <p className="text-sm">
            Already have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
