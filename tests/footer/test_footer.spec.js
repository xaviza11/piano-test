import { Selector, t } from 'testcafe';
import { APP_HOST } from '../../environment';
import { translate } from '../../helpers/translate';

fixture`Footer Tests`
    .page`${APP_HOST}`
    .beforeEach(async () => {
        await t.setCookies({ cookiesAccepted: 'true' }, 'http://localhost');
        await t.setCookies({language: 'en'}, 'http://localhost')
    });

test('should display footer', async t => {
    const footer = Selector('footer');
    await t.expect(footer.exists).ok();
});

test('should display correct links in footer', async t => {
    const container = Selector('footer');

    const aboutText = translate('en', 'translation', 'footer.about');
    const contactText = translate('en', 'translation', 'footer.contact');
    const privacyText = translate('en', 'translation', 'footer.privacy');
    const termsText = translate('en', 'translation', 'footer.terms');
    const text = translate('en', 'translation', 'footer.text')

    const aboutLink = container.find('a').withText(aboutText);
    const contactLink = container.find('a').withText(contactText);
    const privacyLink = container.find('a').withText(privacyText);
    const termsLink = container.find('a').withText(termsText);
    const textComponent = container.find('p').withText(text)

    await t.expect(aboutLink.innerText).eql(aboutText)
    await t.expect(contactLink.innerText).eql(contactText)
    await t.expect(privacyLink.innerText).eql(privacyText)
    await t.expect(termsLink.innerText).eql(termsText)
    await t.expect(textComponent.innerText).contains(text)
});


test('should navigate using links', async t => {
    const container = Selector('footer');

    const aboutText = translate('en', 'translation', 'footer.about');
    const contactText = translate('en', 'translation', 'footer.contact');
    const privacyText = translate('en', 'translation', 'footer.privacy');
    const termsText = translate('en', 'translation', 'footer.terms');

    const aboutLink = container.find('a').withText(aboutText);
    const contactLink = container.find('a').withText(contactText);
    const privacyLink = container.find('a').withText(privacyText);
    const termsLink = container.find('a').withText(termsText);

    await t.click(aboutLink);
    await t.expect(Selector('h2').withText('404').exists).ok('Should display 404 page for About link');

    await t.navigateTo(`${APP_HOST}`);

    await t.click(contactLink);
    await t.expect(Selector('h2').withText('404').exists).ok('Should display 404 page for Contact link');

    await t.navigateTo(`${APP_HOST}`);
    await t.click(privacyLink);
    await t.expect(Selector('h2').withText('404').exists).ok('Should display 404 page for Privacy link');

    await t.navigateTo(`${APP_HOST}`);
    await t.click(termsLink);
    await t.expect(Selector('h2').withText('404').exists).ok('Should display 404 page for Terms link');
});

test('should display correct links in footer in English', async t => {
    await verifyFooterLinks('en', t);
});

test('should display correct links in footer in Spanish', async t => {
    await verifyFooterLinks('es', t);
});

async function verifyFooterLinks(language, t) {
    await t.setCookies({ language: language }, 'http://localhost');

    const container = Selector('footer');

    const aboutText = translate(language, 'translation', 'footer.about');
    const contactText = translate(language, 'translation', 'footer.contact');
    const privacyText = translate(language, 'translation', 'footer.privacy');
    const termsText = translate(language, 'translation', 'footer.terms');
    const text = translate(language, 'translation', 'footer.text');

    const aboutLink = container.find('a').withText(aboutText);
    const contactLink = container.find('a').withText(contactText);
    const privacyLink = container.find('a').withText(privacyText);
    const termsLink = container.find('a').withText(termsText);
    const textComponent = container.find('p').withText(text);

    await t.expect(aboutLink.innerText).eql(aboutText);
    await t.expect(contactLink.innerText).eql(contactText);
    await t.expect(privacyLink.innerText).eql(privacyText);
    await t.expect(termsLink.innerText).eql(termsText);
    await t.expect(textComponent.innerText).contains(text);
}
