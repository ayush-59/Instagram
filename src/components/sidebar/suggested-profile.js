import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
  getUserByUserId
} from "../../services/firebase";
import PropTypes from "prop-types";
import LoggedInUserContext from '../../context/logged-in-user';

export default function SuggestedProfile({
  profileDocId,
  username,
  profileId,
  loggedInUserId,
  loggedInUserDocId,
  avatar,
}) {
  const [followed, setFollowed] = useState(false);
  const { setActiveUser } = useContext(LoggedInUserContext);

  async function handleFollowUser() {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, loggedInUserId, false);
    const [user] = await getUserByUserId(loggedInUserId);
    setActiveUser(user);
  }

  return !followed ? (
    <div className="flex flex-row items-center justify-between align-items">
      <div className="flex items-center justify-between">
        <img src={avatar} alt="" className="rounded-full w-8 flex mr-3" />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};
