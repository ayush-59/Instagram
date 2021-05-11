import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExists(username) {
  const usernameExists = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  const result = usernameExists.docs.map((user) => user.data().length > 0);
  return result.length;
}
