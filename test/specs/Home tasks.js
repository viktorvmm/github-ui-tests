import { expect } from '@wdio/globals';

describe('Webdriverio main page', () => {
    before(async () => {
        await browser.url('https://webdriver.io'); 
    });

//Home work Lesson #8
    xit("should complete full API docs test flow", async () => {
    const apiLink = await $('=API'); 
    await apiLink.click();
     
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('/docs/api'),
        {
            timeout: 5000,
            timeoutMsg: 'Не вдалося перейти на сторінку API'
        }
    );
      
    const introHeader = await $('h1*=Introduction'); 
    await introHeader.waitForDisplayed();
       
    const webdriverLink = await $('a[href="/docs/api/webdriver"]'); 
    await expect(webdriverLink).toHaveText('WebDriver'); 
        
    const searchButton = await $('.DocSearch-Button-Placeholder');
    await searchButton.click();
        
    const searchInput = await $('#docsearch-input');
    await searchInput.setValue('all is done');
    await browser.pause(1000);
       
    await searchInput.clearValue();
    await browser.pause(500);
       
    await expect(searchInput).toHaveValue('');
    console.log('Тест успішно завершено!');
    });

// Home task Lesson #13
    xit("should navigate, scroll, check visibility, click and wait for element", async () => {
    await browser.pause(2000);
    await browser.url("https://webdriver.io/docs/api");

    const blogLink = await $("a.footer__link-item[href='/blog']");
    await blogLink.scrollIntoView();
    await blogLink.waitForExist({ timeout: 5000 }); 
    await expect(blogLink).toBeDisplayed({ withinViewport: true });
    console.log("Blog link is visible in viewport: ", await blogLink.isDisplayed({ withinViewport: true }));
    
    const protocolCommands = await $("div.pagination-nav__label=Protocol Commands");
    await protocolCommands.scrollIntoView();
    await protocolCommands.waitForExist({ timeout: 5000 });
    await expect(protocolCommands).toBeDisplayed({ withinViewport: true });
    await expect(protocolCommands).toBeClickable();
    console.log("Protocol Commands is visible and clickable: ", await protocolCommands.isDisplayed({ withinViewport: true }));
    
    const outerHTML = await protocolCommands.getHTML();
    console.log("outerHTML of Protocol Commands: " + outerHTML);
    const innerHTML = await protocolCommands.getHTML(false);
    console.log("innerHTML of Protocol Commands: " + innerHTML);
    
    await protocolCommands.click();
    
    await browser.waitUntil(async () => {
    const header = await $("h2#webdriver-protocol");
    return header.isDisplayed();
    }, 5000, "WebDriver Protocol header is not displayed");
    });
});

 //Final Home task
describe('GitHub UI Tests', () => {
    beforeEach(async () => {
        await browser.url('https://github.com');
        await browser.setWindowSize(1280, 1024);
    });

    xit('Sign Up: should fill the sign-up form and select a country', async () => {
        const randomStr = Math.random().toString(36).substring(2, 8);
        const email = `qa${randomStr}@example.com`;
        const username = `user${randomStr.replace(/[^a-z0-9]/g, '')}`;
        const password = `P@ssw0rd${randomStr}`;
        const countryName = 'Ukraine';

        const signUpLink = await $(SELECTORS.SIGN_UP_LINK);
        await signUpLink.waitForDisplayed({ timeout: 10000 });
        await signUpLink.scrollIntoView();
        await signUpLink.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/signup'),
            { timeout: 10000, timeoutMsg: 'Не вдалося перейти на сторінку реєстрації' }
        );

        const inputs = [
            { selector: SELECTORS.EMAIL_INPUT, value: email },
            { selector: SELECTORS.PASSWORD_INPUT, value: password },
            { selector: SELECTORS.USERNAME_INPUT, value: username }
        ];

        for (const { selector, value } of inputs) {
            const input = await $(selector);
            await input.waitForDisplayed({ timeout: 10000 });
            await input.setValue(value);
            await expect(input).toHaveValue(value);
        }

        await selectCountry(countryName);

        const marketingCheckbox = await $(SELECTORS.MARKETING_CHECKBOX);
        await marketingCheckbox.waitForDisplayed({ timeout: 10000 });
        if (!(await marketingCheckbox.isSelected())) {
            await marketingCheckbox.scrollIntoView();
            await marketingCheckbox.click();
            await expect(marketingCheckbox).toBeSelected();
        }

        const continueButton = await $(SELECTORS.CONTINUE_BUTTON);
        await continueButton.waitForDisplayed({ timeout: 10000 });
        await continueButton.scrollIntoView();
        await continueButton.click();
    });

    xit('Copilot: should navigate to Copilot Pro trial from homepage', async () => {
        await browser.pause(1000);
        await browser.execute(() => {
            window.scrollTo(0, document.body.scrollHeight - 500);
        });
        await browser.pause(2000);

        const header = await $('h2*=Millions of developers and businesses call GitHub home');
        await expect(header).toBeDisplayed();

        const copilotButton = await $('a=Try GitHub Copilot');
        await expect(copilotButton).toBeClickable();
        await copilotButton.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('github-copilot/pro'),
            {
                timeout: 10000,
                timeoutMsg: 'Expected to be redirected to GitHub Copilot Pro page',
            }
        );

        const trialHeader = await $('h1=Try Copilot Pro for 30 days free');
        await expect(trialHeader).toBeDisplayed();
    });

    xit('Newsletter: should click Subscribe and submit form', async () => {
        await browser.pause(1000);
        await browser.execute(() => window.scrollTo(0, document.body.scrollHeight));
        await browser.pause(2000);

        const subscribeButton = await $('a.btn-mktg[href="https://resources.github.com/newsletter/"]');
        await expect(subscribeButton).toBeDisplayed();
        await expect(subscribeButton).toBeClickable();
        await subscribeButton.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('resources.github.com/newsletter'),
            {
                timeout: 10000,
                timeoutMsg: 'Не вдалося перейти на сторінку підписки.',
            }
        );

        const header = await $('h1=Subscribe to our developer newsletter');
        await expect(header).toBeDisplayed();

        const emailInput = await $('#email');
        await emailInput.waitForDisplayed();
        await emailInput.setValue('test@example.com');

        const countrySelect = await $('#country');
        await countrySelect.waitForDisplayed();
        await countrySelect.selectByVisibleText('Ukraine');

        const checkbox = await $('#gdpr-consent');
        await checkbox.waitForExist();
        if (!(await checkbox.isSelected())) {
            await checkbox.click();
        }

        const formSubscribeButton = await $('button[type="submit"]');
        await formSubscribeButton.waitForClickable();
        await formSubscribeButton.click();

        await browser.pause(3000);
    });

    xit('Search: should search text and verify it in results', async () => {
        await browser.pause(1000);

        const searchTrigger = await $('[data-target="qbsearch-input.inputButtonText"]');
        await searchTrigger.waitForDisplayed();
        await searchTrigger.click();

        const searchInput = await $('[aria-label="Search GitHub"]');
        await searchInput.waitForDisplayed();
        const searchText = 'playwright';
        await searchInput.setValue(searchText);
        await browser.keys('Enter');

        const resultHeader = await $('main');
        await resultHeader.waitForDisplayed();
        const resultText = await resultHeader.getText();
        expect(resultText.toLowerCase()).toContain(searchText.toLowerCase());
    });

    xit('Pricing: should verify pricing page content and compare section', async () => {
        await browser.pause(1000);

        const pricingLink = await $('a[href="https://github.com/pricing"]');
        await pricingLink.waitForDisplayed();
        await pricingLink.click();

        const header = await $('h1.h2-mktg=Try the Copilot-powered platform');
        await header.waitForDisplayed();
        expect(await header.isDisplayed()).toBe(true);

        const compareLink = await $('a[href="#compare-features"]');
        await compareLink.scrollIntoView();
        await browser.pause(500);
        await compareLink.click();

        const compareHeader = await $('h1.h1=Compare features');
        await compareHeader.waitForDisplayed();
        expect(await compareHeader.isDisplayed()).toBe(true);
    });
});
