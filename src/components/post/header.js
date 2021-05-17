import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Header({ username, avatar }) {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            src={avatar}
            alt={`${username} profile pic`}
            className="rounded-full w-8 h-8 flex mr-3"
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string,
  avatar: PropTypes.string,
};
