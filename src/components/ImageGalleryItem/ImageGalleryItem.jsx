import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <li className={css.ImageGalleryItem}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          className={css.ImageGalleryItemImage}
          onClick={toggleModal}
        />
      </li>
      {showModal && (
        <Modal
          largeImageURL={image.largeImageURL}
          tags={image.tags}
          onClose={toggleModal}
        />
      )}
    </div>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
