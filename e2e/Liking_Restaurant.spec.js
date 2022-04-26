const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurant', ({ I }) => {
    I.seeElement('.empty__container');
    I.see("You haven't added a favorite restaurant yet", '.empty__message');
});

Scenario('like and unlike for first restaurant', async ({ I }) => {
    I.see("You haven't added a favorite restaurant yet", '.empty__message');
    I.amOnPage('/');
    // like first restaurant
    I.wait(2);
    I.seeElement('.card__title a');
    I.click(locate('.card__title a').first());
    I.wait(2);
    I.seeElement('#likeButton');
    I.click('#likeButton');
    I.amOnPage('/#/favorite');
    I.seeElement('.card');
    const firstRestaurantTitle = await I.grabTextFrom(locate('.card__title a').first());
    const likedRestaurantTitle = await I.grabTextFrom('.card__title a');
    assert.strictEqual(likedRestaurantTitle, firstRestaurantTitle);
    // unlike first restaurant
    I.wait(2);
    I.click(locate('.card__title a').first());
    I.wait(2);
    I.seeElement('#likeButton');
    I.click('#likeButton');
    I.amOnPage('/#/favorite');
    I.seeElement('.empty__container');
    I.see("You haven't added a favorite restaurant yet", '.empty__message');
});

