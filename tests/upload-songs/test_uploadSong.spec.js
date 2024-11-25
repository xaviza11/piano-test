import { Selector, t } from 'testcafe';
import { APP_HOST } from '../../environment';
import { translate } from '../../helpers/translate';

fixture`MIDI Uploader Tests`
    .page`${APP_HOST}upload-song`
    .beforeEach(async () => {
        await t.setCookies({ cookiesAccepted: 'true' }, 'http://localhost');
    });

test('Validate MIDI Uploader SEO Tags in English', async t => {
    await validateMidiUploaderSEOTags(t, 'en');
});

test('Validate MIDI Uploader SEO Tags in Spanish', async t => {
    await validateMidiUploaderSEOTags(t, 'es');
});

test('Validate MIDI Uploader form in English', async t => {
    await validateMidiUploaderForm(t, 'en');
});

test('Validate MIDI Uploader form in Spanish', async t => {
    await validateMidiUploaderForm(t, 'es');
});

async function validateMidiUploaderForm(t, language) {
    await t.setCookies({ language }, 'http://localhost');
    await t.navigateTo(`${APP_HOST}upload-song`);

    const formContainer = Selector('#midi-uploader');

    const titleLabel = translate(language, 'translation', 'uploader.title');
    const titlePlaceholder = translate(language, 'translation', 'uploader.titleInput');
    const authorLabel = translate(language, 'translation', 'uploader.author');
    const authorPlaceholder = translate(language, 'translation', 'uploader.authorInput');
    const chooseFileText = translate(language, 'translation', 'uploader.choose');
    const uploadButtonText = translate(language, 'translation', 'uploader.upload');

    const titleInput = formContainer.find('#title');
    const authorInput = formContainer.find('#author');
    const fileInputLabel = formContainer.find('div').withText(chooseFileText);
    const uploadButton = formContainer.find('button').withText(uploadButtonText);

    const titleLabelSelector = formContainer.find('label').withAttribute('for', 'title');
    const authorLabelSelector = formContainer.find('label').withAttribute('for', 'author');

    await t
        .expect(titleLabelSelector.innerText).eql(titleLabel, 'The title label does not match the translations')
        .expect(titleInput.getAttribute('placeholder')).eql(titlePlaceholder, 'The title placeholder does not match the translations')

        .expect(authorLabelSelector.innerText).eql(authorLabel, 'The author label does not match the translations')
        .expect(authorInput.getAttribute('placeholder')).eql(authorPlaceholder, 'The author placeholder does not match the translations')

        .expect(fileInputLabel.exists).ok('The file input label is not present')
        .expect(fileInputLabel.innerText).eql(chooseFileText, 'The file input label does not match the translations')

        .expect(uploadButton.exists).ok('The upload button is not present')
        .expect(uploadButton.innerText).eql(uploadButtonText, 'The upload button text does not match the translations');
}

async function validateMidiUploaderSEOTags(t, language) {
    await t.setCookies({ language }, 'http://localhost');
    await t.navigateTo(`${APP_HOST}upload-song`);

    const translatePath = key => translate(language, 'seo', `midiUploaderPage.${key}`);

    // Meta tags
    const metaTitle = Selector('title').innerText;
    await t.expect(metaTitle).eql(translatePath('title'), 'The page title does not match the translations');

    const metaDescription = Selector('meta[name="description"]').getAttribute('content');
    await t.expect(metaDescription).eql(translatePath('description'), 'The meta description does not match the translations');

    const metaKeywords = Selector('meta[name="keywords"]').getAttribute('content');
    await t.expect(metaKeywords).eql(translatePath('keywords'), 'The meta keywords do not match the translations');

    // Open Graph tags
    const ogTitle = Selector('meta[property="og:title"]').getAttribute('content');
    await t.expect(ogTitle).eql(translatePath('ogTitle'), 'The Open Graph title does not match the translations');

    const ogDescription = Selector('meta[property="og:description"]').getAttribute('content');
    await t.expect(ogDescription).eql(translatePath('ogDescription'), 'The Open Graph description does not match the translations');

    const ogImage = Selector('meta[property="og:image"]').getAttribute('content');
    await t.expect(ogImage).eql(translatePath('ogImage'), 'The Open Graph image URL does not match the translations');

    const ogUrl = Selector('meta[property="og:url"]').getAttribute('content');
    await t.expect(ogUrl).eql(translatePath('ogUrl'), 'The Open Graph URL does not match the translations');

    // Twitter tags
    const twitterTitle = Selector('meta[name="twitter:title"]').getAttribute('content');
    await t.expect(twitterTitle).eql(translatePath('twitterTitle'), 'The Twitter title does not match the translations');

    const twitterDescription = Selector('meta[name="twitter:description"]').getAttribute('content');
    await t.expect(twitterDescription).eql(translatePath('twitterDescription'), 'The Twitter description does not match the translations');

    const twitterImage = Selector('meta[name="twitter:image"]').getAttribute('content');
    await t.expect(twitterImage).eql(translatePath('twitterImage'), 'The Twitter image URL does not match the translations');
}
