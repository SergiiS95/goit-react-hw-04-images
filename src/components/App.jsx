import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from '../Services/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const App = () => {
  const [images, setImages] = useState([]);
  const [currentSearchValue, setCurrentSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentSearchValue === '') {
      return;
    }
    const addImages = async () => {
      try {
        setLoading(true);

        const dataImages = await fetchImages(currentSearchValue, page);

        if (dataImages.hits.length === 0) {
          Notify.failure('Sorry image not found...');
          return;
        }
        const imagesArray = normalizedImages(dataImages.hits);
        setImages(prevImages => [...prevImages, ...imagesArray]);
        setError('');
        setTotalImages(dataImages.totalHits);
      } catch (error) {
        setError(`Something went wrong! ${error.message}`);
        Notify.failure(`Something went wrong! ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    const normalizedImages = imagesArray =>
      imagesArray.map(({ id, tags, webformatURL, largeImageURL }) => {
        return { id, tags, webformatURL, largeImageURL };
      });

    addImages();
  }, [currentSearchValue, page]);

  const handleSubmit = query => {
    setCurrentSearchValue(query);
    setImages([]);
    setPage(1);
    setTotalImages(0);
  };

  const loadMore = () => {
    setPage(prevPage => (prevPage = prevPage + 1));
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {loading && <Loader />}
      {!loading && images.length !== totalImages && (
        <Button onClick={loadMore} />
      )}
    </div>
  );
};
