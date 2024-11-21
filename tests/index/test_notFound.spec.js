import { Selector, t } from 'testcafe';
import { APP_HOST } from '../../environment';
import { translate } from '../../helpers/translate';
import retrieveFiltered_notFound from '../../moks/error/retrieveFiltered_notFound'

fixture`Index Tests`
    .page`${APP_HOST}`
    .requestHooks(retrieveFiltered_notFound)
    .beforeEach(async () => {
        await t.setCookies({ cookiesAccepted: 'true' }, 'http://localhost');
    });

test('Should display alert when no sound found in en', async t => {
    await noSongFound(t, 'en')
})

test('Should display alert when no sound found in es', async t => {
    await noSongFound(t, 'es')
})

async function noSongFound(t, language){
    await t.setCookies({ language}, 'http://localhost');
    const container = Selector('body');
    const searchText = translate(language, 'translation', 'searcher.search');
    const searchButton = container.find('button').withText(searchText);

    const authorInput = container.find('input#author');
    const authorPlaceholder = translate(language, 'translation', 'searcher.authorInput');
    await t
        .expect(authorInput.exists).ok('Author input not found')
        .typeText(authorInput, 'as');

    await t.expect(searchButton.visible).ok('Search button is not visible')
    await t.click(searchButton);
    const messageText = translate(language, 'alert', 'No songs found');
    const alert = Selector('.fixed').withText(messageText)
    const alertMessage = alert.find('span.flex-1');
    await t.expect(alertMessage.innerText).eql(messageText);
}