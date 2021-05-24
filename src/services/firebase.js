import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExists(username) {
  const usernameExists = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  const result = usernameExists.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }));
  return result.length ? result : false;
}

//get user from firestore collections where userId(from authentication) == userId(from collections)
export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

//get profiles for suggestions which does not include active user's profile and already followed profiles
export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();

  return result.docs
    .map((user) => ({
      ...user.data(),
      docId: user.id,
    }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId, //currently logged in user
  profileId, //profile that user wants to follow
  isFollowingProfile //is user already following that profile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(
  profileDocId, //profile that user wants to follow
  loggedInUserId, //currently logged in user
  isFollower //is user already in followers
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollower
        ? FieldValue.arrayRemove(loggedInUserId)
        : FieldValue.arrayUnion(loggedInUserId),
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const [{ username, avatar }] = user;
      return { username, avatar, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}

export async function getUserPhotosbyUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();

  return result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
}

