import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/juto-source';
import { createRestoDetailTemplate, loader } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import addNewReview from '../../utils/add-new-review';
import FavoriteRestoIdb from '../../data/favoriteresto-idb';

const Detail = {
    async render() {
        return `
        <div class="load"></div>
        <article class="content">
          <div id="result"></div>
          <div id="likeButtonContainer"></div>
          <div class="customer-reviews">
          <h2 class="add-review_title">Add New Review</h2>
            <div class="review__form">
              <div class="input_form">
                <div class="review_form_name">
                    <label for="name">Name</label><br>
                    <input type="text" name="name" id="reviewerName" placeholder="Input your name" required>
                </div>
                <div class="review_form_content">
                    <label for="content">Review</label><br>
                    <textarea name="content" id="reviewContent" placeholder="Input your review" required></textarea>
                </div>
              </div>
              <button class="submit" id="submit" aria-label="Submit my review">Add Review</submit>
            </div>
          </div>
        </article>
      `;
    },

    async afterRender() {
        // Fungsi ini akan dipanggil setelah render()
        const load = document.querySelector('.load');
        const content = document.querySelector('.content');
        const resultContainer = document.querySelector('#result');
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        content.style.display = 'none';
        load.innerHTML = loader();
        try {
            const result = await RestaurantSource.getRestaurantDetail(url.id);
            resultContainer.innerHTML = createRestoDetailTemplate(result.restaurant);
            addNewReview.post(url);
            LikeButtonPresenter.init({
                likeButtonContainer: document.querySelector('#likeButtonContainer'),
                FavoriteRestaurant: FavoriteRestoIdb,
                restaurant: {
                    id: result.restaurant.id,
                    name: result.restaurant.name,
                    address: result.restaurant.address,
                    city: result.restaurant.city,
                    categories: result.restaurant.categories,
                    menus: result.restaurant.menus,
                    rating: result.restaurant.rating,
                    pictureId: result.restaurant.pictureId,
                    description: result.restaurant.description,
                    customerReviews: result.restaurant.customerReviews,
                },
            });
            content.style.display = 'block';
            load.style.display = 'none';
        } catch (err) {
            content.style.display = 'block';
            load.style.display = 'none';
            content.innerHTML = `<b>Error: Ooups.. please check your connection!!</b> ${err}`;
        }
    },
};

export default Detail;
