import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useUser from "../../hooks/use-user";
import Skeleton from "react-loading-skeleton";
import {
  updateFollowedUserFollowers,
  updateLoggedInUserFollowing,
} from "../../services/firebase";

export default function Header({
  photosCount,
  followerCount,
  followingCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    avatar: profileAvatar,
    username: profileUsername,
    fullName,
    following = [],
    followers = [],
  },
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeButtonFollow = user.username && user.username !== profileUsername;

  const handleToggleFollow = async () => {
    await updateFollowedUserFollowers(
      profileDocId,
      user.userId,
      isFollowingProfile
    );
    await updateLoggedInUserFollowing(
      user.docId,
      profileUserId,
      isFollowingProfile
    );
    setIsFollowingProfile(!isFollowingProfile);

    setFollowerCount({
      followerCount:
        (isFollowingProfile && followerCount - 1) || followerCount + 1,
    });
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = followers.includes(user.userId);
      setIsFollowingProfile(isFollowing);
    };
    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);

  return (
    <div className="grid grid-cols-3 justify-between gap-4 mx-auto max-w-screen-lg  ">
      <div className="container flex justify-center items-center">
        {(profileUsername && (
          <img
            className="rounded-full h-40 w-40 flex"
            src={profileAvatar}
            alt={`${user.username} profile`}
          />
        )) || <Skeleton circle count={1} height={150} width={150} />}
      </div>
      <div className="flex flex-col justify-center items-center col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeButtonFollow && (
            <button
              className="bg-blue-medium rounded font-bold text-sm text-white h-8 w-20"
              type="button"
              onClick={handleToggleFollow}
            >
              {(isFollowingProfile && "Unfollow") || "Follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {!following || !followers ? (
            <Skeleton count={1} height={24} width={677} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount} </span>
                posts
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount} </span>
                {followerCount === 1 ? "follower" : "followers"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{followingCount} </span>
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!fullName ? <Skeleton count={1} height={24} /> : fullName}
          </p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    following: PropTypes.array.isRequired,
  }).isRequired,
};
