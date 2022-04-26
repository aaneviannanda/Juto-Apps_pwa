Feature('Add New Review');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario('add new review to first restaurant', ({ I }) => {
    I.seeElement('.card__title a');
    I.click(locate('.card__title a').first());
    I.seeElement('.detail_review_item');
    I.fillField('name', 'aanevian');
    I.fillField('content', 'Testing e2e');
    I.click('.submit');
    I.see('aanevian', '.review__name');
    I.see('Testing e2e', '.review__body');
});
