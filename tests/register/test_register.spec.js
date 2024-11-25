import { Selector, t } from "testcafe";
import { APP_HOST } from "../../environment";
import { translate } from "../../helpers/translate";

fixture`Sign In Tests`
    .page`${APP_HOST}register`
    .beforeEach(async () => {
        await t.setCookies({ cookiesAccepted: 'true' }, 'http://localhost');
        await t.setCookies({language: 'en'}, 'http://localhost')
    });


const validateSEOTags = async (t, language) => {
    await t.setCookies({ language }, 'http://localhost');

    await t.navigateTo(`${APP_HOST}register`);

    const translatePath = (key) => translate(language, "seo", `registerPage.${key}`);

    const metaDescription = Selector('meta[name="description"]').getAttribute("content");
    await t.expect(metaDescription).eql(translatePath("description"), `The meta description does not match in ${language}.`);

    const metaKeywords = Selector('meta[name="keywords"]').getAttribute("content");
    await t.expect(metaKeywords).eql(translatePath("keywords"), `The meta keywords do not match in ${language}.`);

    const ogTitle = Selector('meta[property="og:title"]').getAttribute("content");
    await t.expect(ogTitle).eql(translatePath("ogTitle"), `The OG title does not match in ${language}.`);

    const ogDescription = Selector('meta[property="og:description"]').getAttribute("content");
    await t.expect(ogDescription).eql(translatePath("ogDescription"), `The OG description does not match in ${language}.`);

    const ogImage = Selector('meta[property="og:image"]').getAttribute("content");
    await t.expect(ogImage).eql(translatePath("ogImage"), `The OG image URL does not match in ${language}.`);

    const ogUrl = Selector('meta[property="og:url"]').getAttribute("content");
    await t.expect(ogUrl).eql(translatePath("ogUrl"), `The OG URL does not match in ${language}.`);

    const twitterTitle = Selector('meta[name="twitter:title"]').getAttribute("content");
    await t.expect(twitterTitle).eql(translatePath("twitterTitle"), `The Twitter title does not match in ${language}.`);

    const twitterDescription = Selector('meta[name="twitter:description"]').getAttribute("content");
    await t.expect(twitterDescription).eql(translatePath("twitterDescription"), `The Twitter description does not match in ${language}.`);

    const twitterImage = Selector('meta[name="twitter:image"]').getAttribute("content");
    await t.expect(twitterImage).eql(translatePath("twitterImage"), `The Twitter image URL does not match in ${language}.`);
};

const validateRegisterForm = async (t, language) => {
    await t.setCookies({ language }, 'http://localhost');
    
    await t.navigateTo(`${APP_HOST}register`);

    const userNameLabel = translate(language, "translation", "register.username");
    const userNamePlaceholder = translate(language, "translation", "register.username");
    const emailLabel = translate(language, "translation", "register.email");
    const emailPlaceholder = translate(language, "translation", "register.emailAddress");
    const passwordLabel = translate(language, "translation", "register.password");
    const confirmPasswordLabel = translate(language, "translation", "register.confirm");
    const registerButtonText = translate(language, "translation", "register.register");

    const userNameInput = Selector("#userName");
    const emailInput = Selector("#email");
    const passwordInput = Selector("#password");
    const confirmPasswordInput = Selector("#confirm-password");
    const registerButton = Selector("button").withText(registerButtonText);

    await t
        .expect(Selector('label[for="userName"]').innerText).eql(userNameLabel, `The username label does not match in ${language}.`)
        .expect(userNameInput.getAttribute("placeholder")).eql(userNamePlaceholder, `The username placeholder does not match in ${language}.`)

        .expect(Selector('label[for="email"]').innerText).eql(emailLabel, `The email label does not match in ${language}.`)
        .expect(emailInput.getAttribute("placeholder")).eql(emailPlaceholder, `The email placeholder does not match in ${language}.`)

        .expect(Selector('label[for="password"]').innerText).eql(passwordLabel, `The password label does not match in ${language}.`)

        .expect(Selector('label[for="confirm-password"]').innerText).eql(confirmPasswordLabel, `The confirm password label does not match in ${language}.`)

        .expect(registerButton.exists).ok(`The register button is not present in ${language}.`)
        .expect(registerButton.innerText).eql(registerButtonText, `The register button text does not match in ${language}.`);
};

test("Validate SEO tags for Register page", async (t) => {
    await validateSEOTags(t, "en");
    await validateSEOTags(t, "es");
});

test("Validate Register form labels and placeholders", async (t) => {
    await validateRegisterForm(t, "en");
    await validateRegisterForm(t, "es");
});
