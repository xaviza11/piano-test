import { Selector, t } from 'testcafe';
import { APP_HOST } from '../../environment';
import { translate } from '../../helpers/translate';
import retrieveFiltered_notParams from '../../moks/error/retrieveFiltered_noParams';

fixture`Index Tests`
    .page`${APP_HOST}`
    .requestHooks(retrieveFiltered_notParams)
    .beforeEach(async () => {
        await t.setCookies({ cookiesAccepted: 'true' }, 'http://localhost');
    });

test('Should display alert when no params in en', async t => {
    await noValuesToFind(t, 'en');
});

test('Should display alert when no params in es', async t => {
    await noValuesToFind(t, 'es');
});

async function noValuesToFind(t, language) {
    await t.setCookies({ language}, 'http://localhost');
    const container = Selector('body');
    const searchText = translate(language, 'translation', 'searcher.search');
    const searchButton = container.find('button').withText(searchText);
    await t.expect(searchButton.visible).ok('Search button is not visible')
    await t.click(searchButton);
    const messageText = translate(language, 'alert', 'Need values to find');
    const alert = Selector('.fixed').withText(messageText)
    const alertMessage = alert.find('span.flex-1');
    await t.expect(alertMessage.innerText).eql(messageText);
}