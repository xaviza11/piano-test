import { Selector, t } from 'testcafe';
import { APP_HOST } from '../../environment';
import { translate } from '../../helpers/translate';

fixture`Sign In Tests`
    .page`${APP_HOST}signin`
    .beforeEach(async () => {
        await t.setCookies({ cookiesAccepted: 'true' }, 'http://localhost');
    });

test('Validate SignIn form in English', async t => {
    await validateSignIn(t, 'en');
});

test('Validate SignIn form in Spanish', async t => {
    await validateSignIn(t, 'es');
});

test('Validate SEO tags for SignIn page in English', async t => {
    await validateSignInSEOTags(t, 'en');
});

test('Validate SEO tags for SignIn page in Spanish', async t => {
    await validateSignInSEOTags(t, 'es');
});

async function validateSignIn(t, language) {
    await t.setCookies({ language }, 'http://localhost');

    await t.navigateTo(`${APP_HOST}signin`);
    
    const emailLabel = translate(language, 'translation', 'signin.email');
    const emailPlaceholder = translate(language, 'translation', 'signin.emailAddress');
    const passwordLabel = translate(language, 'translation', 'signin.password');
    const signInButtonText = translate(language, 'translation', 'signin.signIn');

    const emailInput = Selector('#email');
    const passwordInput = Selector('#password');
    const signInButton = Selector('button').withText(signInButtonText);
    const emailLabelSelector = Selector('label').withAttribute('for', 'email');
    const passwordLabelSelector = Selector('label').withAttribute('for', 'password');

    await t
        .expect(emailLabelSelector.innerText).eql(emailLabel, 'The email label does not match the translations')
        .expect(emailInput.getAttribute('placeholder')).eql(emailPlaceholder, 'The email placeholder does not match the translations')

        .expect(passwordLabelSelector.innerText).eql(passwordLabel, 'The password label does not match the translations')

        .expect(signInButton.exists).ok('The sign-in button is not present')
        .expect(signInButton.innerText).eql(signInButtonText, 'The sign-in button text does not match the translations');
}

async function validateSignInSEOTags(t, language) {
    await t.setCookies({ language }, 'http://localhost');

    await t.navigateTo(`${APP_HOST}signin`);

    const translatePath = key => translate(language, 'seo', `signInPage.${key}`);

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