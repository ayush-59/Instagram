import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/user";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

export default function Header() {
  const { user } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container max-w-screen-lg mx-auto h-full">
        <div className="flex justify-between h-full">
          <div className="flex align-items text-center items-center cursor-pointer text-gray-700 ">
            <Link to={ROUTES.DASHBOARD} aria-label="Instagram">
              <img
                src="/images/logo.png"
                alt="Instagram"
                className="mt-2 w-6/12"
              />
            </Link>
          </div>
          <div className="flex align-items text-center items-center cursor-pointer text-gray-700 ">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <svg
                    class="w-8 mr-6 text-black-light"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </Link>
                <button
                  type="button"
                  onClick={() => firebase.auth().signOut()}
                  onKeyDown={(event) => {
                    if (event.keyDown === "Enter") {
                      firebase.auth().signOut();
                    }
                  }}
                >
                  <svg
                    class="w-8 mr-6 text-black-light"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </button>
                <Link to={`/p/${user.displayName}`}>
                  <img
                    src={`/images/avatars/${user.displayName}.jpg`}
                    alt="profile"
                    className="w-8 rounded-full"
                  />
                </Link>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="rounded bg-blue-medium text-sm text-white font-bold w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="rounded text-sm text-blue-medium font-bold w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
