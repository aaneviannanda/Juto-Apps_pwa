import API_ENDPOINT from '../global/api-endpoint';

class RestaurantSource {
    static async getRestaurantList() {
        const response = await fetch(API_ENDPOINT.LIST);
        const responseJson = await response.json();
        return responseJson.restaurants;
    }

    static async getRestaurantDetail(id) {
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        return response.json();
    }

    static async addReview(data) {
        const response = await fetch(API_ENDPOINT.POST_REVIEW, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const responseJson = await response.json();
        return responseJson;
    }
}

export default RestaurantSource;
