import PropTypes from "prop-types";

export default function Footer({ username, caption }) {
  return (
    <div className="p-4 pt-2 pb-0">
      <span className="font-bold mr-1">{username}</span>
      <span>{caption}</span>
    </div>
  );
}

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
