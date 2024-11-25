import { Selector, t } from 'testcafe';
import { APP_HOST } from '../../environment';
import { translate } from '../../helpers/translate';

fixture`SongsDisplayer Tests`.page`${APP_HOST}search-songs`;

test('Validate SongsDisplayer in English', async t => {
    await validateSongsDisplayer(t, 'en');
});

test('Validate SongsDisplayer in Spanish', async t => {
    await validateSongsDisplayer(t, 'es');
});

async function validateSongsDisplayer(t, language) {
    await t.setCookies({ language }, 'http://localhost');
    await t.navigateTo(`${APP_HOST}search-songs`);

    const componentSelector = Selector('#songs-displayer');

    const listTitle = translate(language, 'translation', 'list.title');
    const titleSelector = componentSelector.find('h2').withText(listTitle);
    await t.expect(titleSelector.exists).ok('The list title is not displayed or translated correctly');

    const nameHeader = translate(language, 'translation', 'list.name');
    const authorHeader = translate(language, 'translation', 'list.author');
    const toneHeader = translate(language, 'translation', 'list.tone');

    const headers = componentSelector.find('thead tr th');
    await t
        .expect(headers.nth(0).innerText).eql(nameHeader, 'The name header does not match the translation')
        .expect(headers.nth(1).innerText).eql(authorHeader, 'The author header does not match the translation')
        .expect(headers.nth(2).innerText).eql(toneHeader, 'The tone header does not match the translation');

    const previousButtonText = translate(language, 'translation', 'list.previous');
    const nextButtonText = translate(language, 'translation', 'list.next');

    const previousButton = componentSelector.find('button').withText(previousButtonText);
    const nextButton = componentSelector.find('button').withText(nextButtonText);

    await t
        .expect(previousButton.exists).ok('The previous button is not displayed or translated correctly')
        .expect(nextButton.exists).ok('The next button is not displayed or translated correctly');

    const songsCount = await componentSelector.find('tbody tr').count;

    if (songsCount <= 5) {
        await t
            .expect(previousButton.hasAttribute('disabled')).ok('The previous button should be disabled on the first page')
            .expect(nextButton.hasAttribute('disabled')).ok('The next button should be disabled if there are no more pages');
    } else {
        await t.expect(nextButton.hasAttribute('disabled')).notOk('The next button should be enabled if there are more pages');
    }

    const firstSong = componentSelector.find('tbody tr').nth(0).find('td');
    if (songsCount > 0) {
        await t.expect(firstSong.exists).ok('No songs are displayed in the table');
    }
}
