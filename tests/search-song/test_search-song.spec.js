import { Selector, t } from 'testcafe';
import { APP_HOST } from '../../environment';
import { translate } from '../../helpers/translate';

fixture`Search Songs Tests`
    .page`${APP_HOST}search-songs`
    .beforeEach(async () => {
        await t.setCookies({ cookiesAccepted: 'true' }, 'http://localhost');
    });

test('Validate Search Songs form in English', async t => {
    await validateSearchSongs(t, 'en');
});

test('Validate Search Songs form in Spanish', async t => {
    await validateSearchSongs(t, 'es');
});

test('Validate SEO tags for Search Songs page in English', async t => {
    await validateSearchSongsSEOTags(t, 'en');
});

test('Validate SEO tags for Search Songs page in Spanish', async t => {
    await validateSearchSongsSEOTags(t, 'es');
});

async function validateSearchSongs(t, language) {
    await t.setCookies({ language }, 'http://localhost');
    await t.navigateTo(`${APP_HOST}search-songs`);

    const authorLabel = translate(language, 'translation', 'searcher.author');
    const authorPlaceholder = translate(language, 'translation', 'searcher.authorInput');
    const nameLabel = translate(language, 'translation', 'searcher.name');
    const namePlaceholder = translate(language, 'translation', 'searcher.nameInput');
    const toneLabel = translate(language, 'translation', 'searcher.tone');
    const searchButtonText = translate(language, 'translation', 'searcher.search');

    const authorInput = Selector('#author');
    const nameInput = Selector('#name');
    const toneSelect = Selector('#tone');
    const searchButton = Selector('button').withText(searchButtonText);
    const authorLabelSelector = Selector('label').withAttribute('for', 'author');
    const nameLabelSelector = Selector('label').withAttribute('for', 'name');
    const toneLabelSelector = Selector('label').withAttribute('for', 'tone');

    await t
        .expect(authorLabelSelector.innerText).eql(authorLabel, 'The author label does not match the translations')
        .expect(authorInput.getAttribute('placeholder')).eql(authorPlaceholder, 'The author placeholder does not match the translations')

        .expect(nameLabelSelector.innerText).eql(nameLabel, 'The name label does not match the translations')
        .expect(nameInput.getAttribute('placeholder')).eql(namePlaceholder, 'The name placeholder does not match the translations')

        .expect(toneLabelSelector.innerText).eql(toneLabel, 'The tone label does not match the translations')

        .expect(searchButton.exists).ok('The search button is not present')
        .expect(searchButton.innerText).eql(searchButtonText, 'The search button text does not match the translations');
}

async function validateSearchSongsSEOTags(t, language) {
    await t.setCookies({ language }, 'http://localhost');
    await t.navigateTo(`${APP_HOST}search-songs`);

    const translatePath = key => translate(language, 'seo', `searchPage.${key}`);

    const metaDescription = Selector('meta[name="description"]').getAttribute('content');
    await t.expect(metaDescription).eql(translatePath('description'), 'The meta description does not match the translations');

    const metaKeywords = Selector('meta[name="keywords"]').getAttribute('content');
    await t.expect(metaKeywords).eql(translatePath('keywords'), 'The meta keywords do not match the translations');

    const ogTitle = Selector('meta[property="og:title"]').getAttribute('content');
    await t.expect(ogTitle).eql(translatePath('ogTitle'), 'The Open Graph title does not match the translations');

    const ogDescription = Selector('meta[property="og:description"]').getAttribute('content');
    await t.expect(ogDescription).eql(translatePath('ogDescription'), 'The Open Graph description does not match the translations');

    const ogImage = Selector('meta[property="og:image"]').getAttribute('content');
    await t.expect(ogImage).eql(translatePath('ogImage'), 'The Open Graph image URL does not match the translations');

    const ogUrl = Selector('meta[property="og:url"]').getAttribute('content');
    await t.expect(ogUrl).eql(translatePath('ogUrl'), 'The Open Graph URL does not match the translations');

    const twitterTitle = Selector('meta[name="twitter:title"]').getAttribute('content');
    await t.expect(twitterTitle).eql(translatePath('twitterTitle'), 'The Twitter title does not match the translations');

    const twitterDescription = Selector('meta[name="twitter:description"]').getAttribute('content');
    await t.expect(twitterDescription).eql(translatePath('twitterDescription'), 'The Twitter description does not match the translations');

    const twitterImage = Selector('meta[name="twitter:image"]').getAttribute('content');
    await t.expect(twitterImage).eql(translatePath('twitterImage'), 'The Twitter image URL does not match the translations');
}
