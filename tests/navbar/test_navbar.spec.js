import { Selector, t } from 'testcafe';
import { APP_HOST } from '../../environment';
import { translate } from '../../helpers/translate';

fixture`Navbar Tests`
    .page`${APP_HOST}`
    .beforeEach(async () => {
        await t.setCookies({ cookiesAccepted: 'true' }, 'http://localhost');
    });

async function verifyNavbar(language, loggedIn) {
    await t.setCookies({ language }, 'http://localhost');
    await t.setCookies({ username: loggedIn ? 'TestUser' : '' }, 'http://localhost');

    const container = Selector('nav');
    
    const titleText = translate(language, 'translation', 'navbar.title');
    const pianoText = translate(language, 'translation', 'navbar.piano');
    const playerText = translate(language, 'translation', 'navbar.player');
    const searchText = translate(language, 'translation', 'navbar.search');
    const uploadText = translate(language, 'translation', 'navbar.upload');
    const signInText = translate(language, 'translation', 'navbar.signIn');
    const registerText = translate(language, 'translation', 'navbar.register');
    const welcomeText = translate(language, 'translation', 'navbar.welcome');

    const title = container.find('h1');
    const pianoLink = container.find('a').withText(pianoText);
    const playerLink = container.find('a').withText(playerText);
    const searchLink = container.find('a').withText(searchText);
    const uploadLink = container.find('a').withText(uploadText);
    const signInLink = container.find('a').withText(signInText);
    const registerLink = container.find('a').withText(registerText);
    const welcomeMessage = container.find('div').withText(`${welcomeText}, TestUser`);

    await t.expect(title.innerText).eql(titleText);
    await t.expect(pianoLink.innerText).eql(pianoText);
    await t.expect(playerLink.innerText).eql(playerText);
    await t.expect(searchLink.innerText).eql(searchText);
    await t.expect(uploadLink.innerText).eql(uploadText);

    if (loggedIn) {
        await t.expect(welcomeMessage.exists).ok();
        await t.expect(signInLink.exists).notOk();
        await t.expect(registerLink.exists).notOk();
    } else {
        await t.expect(welcomeMessage.exists).notOk();
        await t.expect(signInLink.innerText).eql(signInText);
        await t.expect(registerLink.innerText).eql(registerText);
    }
}

test('should display correct navbar links in English when user is logged in', async t => {
    await verifyNavbar('en', true);
});

test('should display correct navbar links in English when user is not logged in', async t => {
    await verifyNavbar('en', false);
});

test('should display correct navbar links in Spanish when user is logged in', async t => {
    await verifyNavbar('es', true);
});

test('should display correct navbar links in Spanish when user is not logged in', async t => {
    await verifyNavbar('es', false);
});
