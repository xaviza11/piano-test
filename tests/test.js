import { Selector } from 'testcafe'
import { APP_HOST, API_HOST } from '../environment';

fixture `Example`
    .page `${APP_HOST}`;  

test('example', async t => {
    const pageTitle = Selector('h1');

    await t
        .expect(pageTitle.innerText).eql('Example Domain');
});
