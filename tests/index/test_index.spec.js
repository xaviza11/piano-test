import { Selector, t } from 'testcafe';
import { APP_HOST } from '../../environment';
import { translate } from '../../helpers/translate';


fixture`Index Tests`
    .page`${APP_HOST}`
    .requestHooks()
    .beforeEach(async () => {
        await t.setCookies({ cookiesAccepted: 'true' }, 'http://localhost');
    });

test('should display navbar', async t => {
    const element = Selector('nav');
    await t.expect(element.exists).ok();
});

test('should display footer', async t => {
    const element = Selector('footer');
    await t.expect(element.exists).ok();
});

test('should display search component in en', async t => {
    await testSearchComponent(t, 'en');
});

test('should display search component in es', async t => {
    await testSearchComponent(t, 'es');
});

test('Should validate SEO ES tags', async t => {
    await validateSEOTags(t, 'es');
});

test('Should validate SEO EN tags', async t => {
    await validateSEOTags(t, 'en');
});

async function testSearchComponent(t, language) {
    const container = Selector('body');
    await t.setCookies({ language }, 'http://localhost');

    const translatePath = key => translate(language, 'translation', key);
    const authorText = translatePath('searcher.author');
    const nameText = translatePath('searcher.name');
    const toneText = translatePath('searcher.tone');
    const searchText = translatePath('searcher.search');
    const authorPlaceholder = translatePath('searcher.authorInput');
    const namePlaceholder = translatePath('searcher.nameInput');
    const toneDefaultOption = translatePath('tones.choose');
    const toneC = translatePath('tones.C');
    const toneType = translatePath('tones.major');
    const toneCSharp = translatePath('tones.C#');

    const authorLabel = container.find('label').withAttribute('for', 'author');
    const nameLabel = container.find('label').withAttribute('for', 'name');
    const toneLabel = container.find('label').withAttribute('for', 'tone');
    const authorInput = container.find('input#author');
    const nameInput = container.find('input#name');
    const searchButton = container.find('button').withText(searchText);
    const toneSelect = container.find('select#tone');
    const toneOptions = toneSelect.find('option');

    await t.expect(authorLabel.innerText).eql(authorText);
    await t.expect(nameLabel.innerText).eql(nameText);
    await t.expect(toneLabel.innerText).eql(toneText);

    await t.expect(authorInput.getAttribute('placeholder')).eql(authorPlaceholder);
    await t.expect(nameInput.getAttribute('placeholder')).eql(namePlaceholder);

    await t.expect(toneOptions.nth(0).innerText).eql(toneDefaultOption);
    await t.expect(toneOptions.nth(1).innerText).eql(`${toneC} ${toneType}`);
    await t.expect(toneOptions.nth(2).innerText).eql(`${toneCSharp} ${toneType}`);

    await t.expect(searchButton.innerText).eql(searchText);
}

async function validateSEOTags(t, language) {
    await t.setCookies({ language }, 'http://localhost');

    const translatePath = key => translate(language, 'seo', `index.${key}`);

    const pageTitle = await t.eval(() => document.title);
    await t.expect(pageTitle).eql(translatePath('title'));

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

