import { Selector, t } from "testcafe";
import { APP_HOST } from "../../environment";
import { translate } from "../../helpers/translate";

fixture`Music Player Tests`
    .page`${APP_HOST}musicplayer`;


const validateMusicPlayerFunctionality = async (t, language) => {

    await t.setCookies({ language }, 'http://localhost');

    await t.navigateTo(`${APP_HOST}player/none`);

    const songName = Selector("h2").withText(translate(language, "translation", "player.song"));
    const author = Selector("p").withText(translate(language, "translation", "player.author"));
    const tone = Selector("p").withText(translate(language, "translation", "player.tone"));
    const playButton = Selector("button").withText(translate(language, "translation", "player.play"));

    await t
        .expect(songName.exists).ok(`Song name not displayed correctly in ${language}.`)
        .expect(author.exists).ok(`Author not displayed correctly in ${language}.`)
        .expect(tone.exists).ok(`Tone not displayed correctly in ${language}.`)
        .expect(playButton.exists).ok(`Play button is not visible in ${language}.`)
};

const validateSEOTags = async (t, language) => {

    await t.setCookies({ language }, 'http://localhost');

    await t.navigateTo(`${APP_HOST}player/none`);

    const translatePath = (key) => translate(language, "seo", `musicPlayer.${key}`);

    const metaDescription = Selector('meta[name="description"]').getAttribute("content");
    await t.expect(metaDescription).eql(translatePath("description"), `Meta description does not match in ${language}.`);

    const metaKeywords = Selector('meta[name="keywords"]').getAttribute("content");
    await t.expect(metaKeywords).eql(translatePath("keywords"), `Meta keywords do not match in ${language}.`);

    const ogTitle = Selector('meta[property="og:title"]').getAttribute("content");
    await t.expect(ogTitle).eql(translatePath("ogTitle"), `OG title does not match in ${language}.`);

    const ogDescription = Selector('meta[property="og:description"]').getAttribute("content");
    await t.expect(ogDescription).eql(translatePath("ogDescription"), `OG description does not match in ${language}.`);

    const ogImage = Selector('meta[property="og:image"]').getAttribute("content");
    await t.expect(ogImage).eql(translatePath("ogImage"), `OG image URL does not match in ${language}.`);

    const ogUrl = Selector('meta[property="og:url"]').getAttribute("content");
    await t.expect(ogUrl).eql(translatePath("ogUrl"), `OG URL does not match in ${language}.`);

    const twitterTitle = Selector('meta[name="twitter:title"]').getAttribute("content");
    await t.expect(twitterTitle).eql(translatePath("twitterTitle"), `Twitter title does not match in ${language}.`);

    const twitterDescription = Selector('meta[name="twitter:description"]').getAttribute("content");
    await t.expect(twitterDescription).eql(translatePath("twitterDescription"), `Twitter description does not match in ${language}.`);

    const twitterImage = Selector('meta[name="twitter:image"]').getAttribute("content");
    await t.expect(twitterImage).eql(translatePath("twitterImage"), `Twitter image URL does not match in ${language}.`);
};

test("Validate Music Player functionality", async (t) => {
    await validateMusicPlayerFunctionality(t, "es");
    await validateMusicPlayerFunctionality(t, "en");
});

test("Validate SEO tags for Music Player page", async (t) => {
    await validateSEOTags(t, "es");
    await validateSEOTags(t, "en");
});
