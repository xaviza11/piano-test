import { Selector, t } from 'testcafe';
import { APP_HOST } from '../../environment';
import { translate } from '../../helpers/translate';

fixture`Generate Tone Tests`
    .page`${APP_HOST}upload-song`
    .beforeEach(async () => {
        await t.setCookies({ cookiesAccepted: 'true' }, 'http://localhost');
    });

test('Validate GenerateTone form in English', async t => {
    await validateGenerateToneForm(t, 'en');
});

test('Validate GenerateTone form in Spanish', async t => {
    await validateGenerateToneForm(t, 'es');
});

async function validateGenerateToneForm(t, language) {
    await t.setCookies({ language }, 'http://localhost');
    await t.navigateTo(`${APP_HOST}upload-song`);

    const formContainer = Selector('#generate-song');

    const titleLabel = translate(language, 'translation', 'generate.title');
    const titlePlaceholder = translate(language, 'translation', 'generate.titleInput');
    const authorLabel = translate(language, 'translation', 'generate.author');
    const authorPlaceholder = translate(language, 'translation', 'generate.authorInput');
    const toneLabel = translate(language, 'translation', 'generate.tone');
    const generateButtonText = translate(language, 'translation', 'generate.generate');
    const chooseOptionText = translate(language, 'translation', 'tones.choose');

    const titleInput = formContainer.find('#title');
    const authorInput = formContainer.find('#author');
    const toneSelect = formContainer.find('#tone');
    const generateButton = formContainer.find('button').withText(generateButtonText);

    const titleLabelSelector = formContainer.find('label').withAttribute('for', 'title');
    const authorLabelSelector = formContainer.find('label').withAttribute('for', 'author');
    const toneLabelSelector = formContainer.find('label').withAttribute('for', 'tone');

    await t
        .expect(titleLabelSelector.innerText).eql(titleLabel, 'The title label does not match the translations')
        .expect(titleInput.getAttribute('placeholder')).eql(titlePlaceholder, 'The title placeholder does not match the translations')

        .expect(authorLabelSelector.innerText).eql(authorLabel, 'The author label does not match the translations')
        .expect(authorInput.getAttribute('placeholder')).eql(authorPlaceholder, 'The author placeholder does not match the translations')

        .expect(toneLabelSelector.innerText).eql(toneLabel, 'The tone label does not match the translations')
        .expect(toneSelect.exists).ok('The tone select is not present')
        .expect(toneSelect.find('option').withText(chooseOptionText).exists).ok('The "choose" option does not match the translations')

        .expect(generateButton.exists).ok('The generate button is not present')
        .expect(generateButton.innerText).eql(generateButtonText, 'The generate button text does not match the translations');
}
