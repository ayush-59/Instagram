import PropTypes from "prop-types";

export default function Image({ imageSrc, caption }) {
  return <img className=" w-full max-h-screen" src={imageSrc} alt={caption} />;
}

Image.propTypes = {
  imageSrc: PropTypes.string,
  caption: PropTypes.string,
};
