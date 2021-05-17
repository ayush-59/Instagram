import User from "./user";
import Suggestions from "./suggestions";
import useUser from "../../hooks/use-user";

export default function Sidebar() {
  const {
    user: { docId, username, fullName, userId, following, avatar },
  } = useUser();

  return (
    <div className="invisible md:visible">
      <User username={username} fullName={fullName} avatar={avatar} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
}
