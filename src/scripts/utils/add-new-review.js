import RestaurantSource from '../data/juto-source';
import { createReviewCard } from '../views/templates/template-creator';

const addNewReview = {
    post(url) {
        const submit = document.querySelector('#submit');
        const reviewerName = document.querySelector('#reviewerName');
        const reviewContent = document.querySelector('#reviewContent');

        submit.addEventListener('click', async () => {
            const newReview = {
                id: url.id,
                name: reviewerName.value,
                review: reviewContent.value,
            };

            if (!!newReview.name && !!newReview.review) {
                const reviewContainer = document.querySelector('.detail_review');
                try {
                    const response = await RestaurantSource.addReview(newReview);
                    RestaurantSource.getRestaurantDetail(url.id);
                    reviewContainer.innerHTML = createReviewCard(response.customerReviews);
                } catch (err) {
                    reviewContainer.innerHTML = `<b>Error:</b> ${err}`;
                }
            }
            this._emptyForm();
        });
    },
    _emptyForm() {
        document.querySelector('#reviewerName').value = '';
        document.querySelector('#reviewContent').value = '';
    },
};

export default addNewReview;
