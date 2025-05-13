import { expect } from '@wdio/globals';

describe('Webdriverio main page', () => {
    before(async () => {
        await browser.url('https://webdriver.io'); 
    });

    xit('should have correct title', async () => {
        const title = await browser.getTitle();
        console.log(title);
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO');
    });

    xit("should show addValue command", async () => {
        await browser.url('https://the-internet.herokuapp.com/login');
        let input = await $('#username');
        await input.addValue("hello");
        await browser.pause(2000);
        await input.addValue(123);
        await browser.pause(2000);
        await expect(input).toHaveValue("hello123");
    });

    xit("should show setValue command", async () => {
        await browser.url('https://the-internet.herokuapp.com/login');
        let input = await $("#username");
        await input.setValue("world");
        await browser.pause(2000);
        console.log(await input.getValue());
        await expect(input).toHaveValue("world");
    });

    xit("should demonstrate click command and login flow", async () => {
        await browser.url('https://the-internet.herokuapp.com/login');
        const loginButton = await $('.radius');
        await expect(loginButton).toBeDisplayed();
        await browser.pause(2000);
        await loginButton.click();
        await browser.pause(4000);
        const inputUsername = await $("#username");
        await inputUsername.setValue("tomsmith");
        await browser.pause(2000);
        const inputPassword = await $("#password");
        await inputPassword.setValue("SuperSecretPassword!");
        await browser.pause(2000);
        await loginButton.click();
        await browser.pause(4000);
        const flashMessage = await $('#flash');
        await expect(flashMessage).toHaveTextContaining('You logged into a secure area!');
    });

    xit("should show click command", async () => {
        await browser.url('https://the-internet.herokuapp.com/login');
        let loginButton = await $('.radius');
        await browser.pause(2000);
        await loginButton.click();
        await browser.pause(4000);
        let inputUsername = await $("#username");
        await inputUsername.addValue("tomsmith");
        await browser.pause(2000);
        let inputPassword = await $("#password");
        await inputPassword.addValue("SuperSecretPassword!");
        await browser.pause(2000);
        await loginButton.click();
        await browser.pause(4000);
    });

    xit("should show getAttribute command", async () => {
        await browser.url('https://dou.ua/search');
        let inputSearch = await $('#gsc-i-id1');
        let attr = await inputSearch.getAttribute("aria-label");
        console.log("Placeholder attribute is: " + attr);
        await inputSearch.setValue("Cat");
        attr = await inputSearch.getValue();
        await browser.pause(2000);
        console.log("Value attribute is: " + attr);
    });

    xit("should show getLocation command", async () => {
        await browser.url('https://dou.ua');
        let inputSearch = await $('#txtGlobalSearch');
        let location = await inputSearch.getLocation();
        console.log("Location is: " + location);
        let xLocation = (await inputSearch.getLocation()).x;
        console.log("Location by x is: " + xLocation);
    });

    xit("should show getText command", async () => {
        await browser.url('https://webdriver.io');
        let subtitle = await $('.hero__subtitle');
        console.log("Subtitle text is: " + await subtitle.getText());
    });

    xit("should show if an element is clickable", async () => {
        await browser.url("https://webdriver.io");
        const blogButton = await $("button[href='/docs/gettingstarted']");
        let clickable = await blogButton.isClickable();
        console.log("Is clickable: " + clickable);
    });

    xit("should show if an element is displayed", async () => {
        await browser.url("https://webdriver.io");
        const blogButton = await $("button[href='/docs/gettingstarted']");
        let displayed = await blogButton.isDisplayed();
        console.log("Is displayed: " + displayed);
    });

    xit("should show if an element is visible", async () => {
        await browser.url("https://webdriver.io");
        const blogButton = await $("button[href='/docs/gettingstarted']");
        let displayedInViewport = await blogButton.isDisplayed({ withinViewport: true });
        console.log("Is blog button displayed in viewport: " + displayedInViewport);
        const footer = await $("footer .link-item[href='/docs/gettingstarted']");
        let footerIsDisplayedInViewport = await footer.isDisplayed({ withinViewport: true });
        console.log("Is footer displayed in viewport: " + footerIsDisplayedInViewport);
    });

    xit("should show movement to element action", async () => {
        await browser.url("https://webdriver.io");
        const getStartedLink = await $("footer .link-item[href='/docs/gettingstarted']");
        await getStartedLink.scrollIntoView();
        let isVisibleInViewport = await getStartedLink.isDisplayed({ withinViewport: true });
        console.log("Is get started link visible in viewport after scroll: " + isVisibleInViewport);
    });

    xit("should show movement to element action with pause", async () => {
        await browser.url("https://webdriver.io");
        const getStartedLink = await $("footer .link-item[href='/docs/gettingstarted']");
        await browser.pause(2000);
        await getStartedLink.scrollIntoView();
        await browser.pause(2000);
        let isVisibleInViewport = await getStartedLink.isDisplayed({ withinViewport: true });
        console.log("Is get started link visible in viewport after scroll: " + isVisibleInViewport);
    });

xit("should show save screenshot command", async () => {
        await browser.url("https://webdriver.io");
        const getStartedLink = await $("footer a[href='/docs/gettingstarted']");
        await getStartedLink.waitForExist({ timeout: 5000 });
        if (!(await getStartedLink.isExisting())) {
            throw new Error("Element with selector 'footer a[href='/docs/gettingstarted']' not found on the page");
        }
        await browser.pause(2000);
        await getStartedLink.scrollIntoView();
        await browser.pause(2000);
        await getStartedLink.saveScreenshot("linkScreenshot.png");
    });


    xit("should switch to another window", async () => {
        await browser.url("https://webdriver.io");
        await browser.newWindow("https://google.com");
        await browser.pause(2000);
        await browser.switchWindow("https://webdriver.io");
        await browser.pause(2000);
    });

xit("should show waitUntil command", async () => {
    await browser.url("https://webdriver.io");

    await browser.waitUntil(async () => {
        return $("button[href='/docs/gettingstarted']").isDisplayed();
    }, 5000, "Button is not displayed");
});

xit("should get html for certain elements", async () => {
    await browser.url("https://webdriver.io");

    const outerHTML = await $("dropdown_menu").getHTML();
    console.log("outerHTML: " + outerHTML);

    const innerHTML = await $(".dropdown_menu").getHTML(false);
    console.log("innerHTML: " + innerHTML);
});
});

