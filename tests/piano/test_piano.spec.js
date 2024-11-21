import { Selector, t } from 'testcafe';
import { APP_HOST } from '../../environment';
import { translate } from '../../helpers/translate';

fixture`Piano SEO Tests`
    .page`${APP_HOST}piano`
    .beforeEach(async () => {
        await t.setCookies({ cookiesAccepted: 'true' }, 'http://localhost');
    });

test('should validate SEO tags for Piano in English', async t => {
    await validateSEOTags(t, 'en');
});

test('should validate SEO tags for Piano in Spanish', async t => {
    await validateSEOTags(t, 'es');
});

test('should render the piano', async t => {
    const pianoContainer = Selector('.piano-container');
    const keys = pianoContainer.find('div'); 
    const navbar = Selector('nav');
    const footer = Selector('footer');

    await t.expect(navbar.exists).ok('Navbar should exist');
    await t.expect(footer.exists).ok('Footer should exist');

    await t.expect(pianoContainer.exists).ok('Piano container should exist');

    await t.expect(keys.count).gte(12, 'Piano should have at least 12 keys');

});

async function validateSEOTags(t, language) {
    await t.setCookies({ language }, 'http://localhost');

    await t.navigateTo(`${APP_HOST}piano`);

    const translatePath = key => translate(language, 'seo', `piano.${key}`);

    const metaDescription = Selector('meta[name="description"]').getAttribute('content');
    await t.expect(metaDescription).eql(translatePath('description'));

    const metaKeywords = Selector('meta[name="keywords"]').getAttribute('content');
    await t.expect(metaKeywords).eql(translatePath('keywords'));

    const ogTitle = Selector('meta[property="og:title"]').getAttribute('content');
    await t.expect(ogTitle).eql(translatePath('ogTitle'));

    const ogDescription = Selector('meta[property="og:description"]').getAttribute('content');
    await t.expect(ogDescription).eql(translatePath('ogDescription'));

    const ogImage = Selector('meta[property="og:image"]').getAttribute('content');
    await t.expect(ogImage).eql(translatePath('ogImage'));

    const ogUrl = Selector('meta[property="og:url"]').getAttribute('content');
    await t.expect(ogUrl).eql(translatePath('ogUrl'));

    const twitterTitle = Selector('meta[name="twitter:title"]').getAttribute('content');
    await t.expect(twitterTitle).eql(translatePath('twitterTitle'));

    const twitterDescription = Selector('meta[name="twitter:description"]').getAttribute('content');
    await t.expect(twitterDescription).eql(translatePath('twitterDescription'));

    const twitterImage = Selector('meta[name="twitter:image"]').getAttribute('content');
    await t.expect(twitterImage).eql(translatePath('twitterImage'));
}

