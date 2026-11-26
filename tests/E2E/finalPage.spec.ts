import { test, expect } from "@playwright/test"
import { BASE_URL, USERNAME, PASSWORD } from "../../utils/envConfig"
import { ProductPage } from "../../pages/ProductPage"
import { LoginPage } from "../../pages/LoginPage"
import { CartPage } from "../../pages/CartPage"
import { CheckoutPage } from "../../pages/CheckoutPage"
import { CheckoutOverviewPage } from "../../pages/CheckoutOverViewPage"
import { checkoutData } from "../../test-data/CheckoutData"
import { productsToCart } from "../../test-data/products"
import { FinalPage } from "../../pages/FinalPage"

test.describe("Final page validation", () => {

    let loginpage: LoginPage
    let productpage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage
    let checkoutOverviewPage: CheckoutOverviewPage
    let finalPage:FinalPage

    test.beforeEach(async ({ page }) => {
        loginpage = new LoginPage(page)
        productpage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        checkoutOverviewPage = new CheckoutOverviewPage(page)
        finalPage = new FinalPage(page)

        await page.goto(BASE_URL)
        await loginpage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

        await productpage.getSpecificProductDetails(productsToCart);
        await productpage.clickOnCartLink();
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postal)
        await checkoutPage.clickContinueButton();
        await checkoutOverviewPage.clickFinishButton()
    })

    test("Validate final page UI and url",async({page})=>{
     await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html")
     const finalPageElement = await finalPage.getFinalPageElement();
     expect(finalPageElement.pageTitle).toBeVisible();
     expect(finalPageElement.successMsg).toBeVisible()
     expect(finalPageElement.backHomeButton).toBeVisible();
    })

    test("Validate the success Message",async({page})=>{
        const message = await finalPage.getSuccessMessage();
        expect(message).toBe("Thank you for your order!")
    })

    test("Validate Back home button functionality",async({page})=>{
        await finalPage.clickOnBackHomeBtn();
        expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })


})