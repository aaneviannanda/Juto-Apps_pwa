import RestaurantSource from '../../data/juto-source';
import { createRestoItemTemplate, loader } from '../templates/template-creator';

const Home = {
    async render() {
        return `
        <div class="load"></div>
        <!-- Content -->
        <section class="content">
            <h2>Explore Restaurant</h2>
            <div class="card__list" id="data__card">
            <!-- Isi Card -->                  
        </section>   
      `;
    },
    async afterRender() {
        // Fungsi ini akan dipanggil setelah render()
        const load = document.querySelector('.load');
        const content = document.querySelector('.content');
        const restaurantContainer = document.querySelector('#data__card');
        content.style.display = 'none';
        load.innerHTML = loader();
        try {
            const restaurant = await RestaurantSource.getRestaurantList();
            restaurant.forEach((resto) => {
                restaurantContainer.innerHTML += createRestoItemTemplate(resto);
            });
            content.style.display = 'block';
            load.style.display = 'none';
        } catch (err) {
            content.style.display = 'block';
            load.style.display = 'none';
            content.innerHTML = `<b>Error:</b> ${err}`;
        }
    },
};

export default Home;
