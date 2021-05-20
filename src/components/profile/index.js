import PropTypes from "prop-types";
import { useEffect, useReducer } from "react";
import { getUserPhotosbyUserId } from "../../services/firebase";
import Header from "./header";
import Photos from "./photos";

export default function Profile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });

  const initialState = {
    profile: {},
    photoCollection: [],
    followerCount: 0,
    followingCount: 0,
  };
  const [
    { profile, photoCollection, followerCount, followingCount },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getUserInfoAndPhotosByUserId() {
      const photos = await getUserPhotosbyUserId(user.userId);
      dispatch({
        profile: user,
        photoCollection: photos,
        followerCount: user.followers.length,
        followingCount: user.following.length,
      });
    }
    getUserInfoAndPhotosByUserId();
  }, [user?.username]);

  return (
    <>
      <Header
        profile={profile}
        photosCount={photoCollection ? photoCollection.length : 0}
        followerCount={followerCount}
        followingCount={followingCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photoCollection} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    docId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    following: PropTypes.array.isRequired,
    followers: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }).isRequired,
};
