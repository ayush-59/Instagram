import { useState, useEffect } from "react";
import { getPhotos } from "../services/firebase";

export default function usePhotos(user) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function getTimelinePhotos() {
      // does the user actually follow people?
      let followedUserPhotos = [];
      if (user?.following?.length > 0) {
        followedUserPhotos = await getPhotos(user.userId, user.following);
        // re-arrange array to be newest photos first by dateCreated

        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    getTimelinePhotos();
  }, [user?.userId, user?.following]);

  return { photos };
}
