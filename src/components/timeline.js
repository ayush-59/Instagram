import usePhotos from "../hooks/use-photos";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import Post from "./post";
import LoggedInUserContext from "../context/logged-in-user";

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);

  return (
    <div className=" container col-span-3 md:col-span-2">
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : photos.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">
          Follow some users to see their Posts !
        </p>
      )}
    </div>
  );
}
