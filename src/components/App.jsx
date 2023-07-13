import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from '../Services/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    images: [],
    currentSearchValue: '',
    page: 1,
    totalImages: 0,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentSearchValue !== this.state.currentSearchValue ||
      prevState.page !== this.state.page
    ) {
      this.addImages();
    }
  }

  handleSubmit = query => {
    this.setState({
      currentSearchValue: query,
      images: [],
      page: 1,
      totalImages: 0,
    });
  };

  addImages = async () => {
    const { currentSearchValue, page } = this.state;
    try {
      this.setState({ loading: true });

      const dataImages = await fetchImages(currentSearchValue, page);

      if (dataImages.hits.length === 0) {
        Notify.failure('Sorry image not found...');
        return;
      }
      const imagesArray = this.normalizedImages(dataImages.hits);
      this.setState({
        images: [...this.state.images, ...imagesArray],
        error: '',
        totalImages: dataImages.totalHits,
      });
    } catch (error) {
      this.setState({ error: 'Something went wrong!' });
    } finally {
      this.setState({ loading: false });
    }
  };

  normalizedImages = imagesArray =>
    imagesArray.map(({ id, tags, webformatURL, largeImageURL }) => {
      return { id, tags, webformatURL, largeImageURL };
    });

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, loading, totalImages } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
        {loading && <Loader />}
        {!loading && images.length !== totalImages && (
          <Button onClick={this.loadMore} />
        )}
      </div>
    );
  }
}
