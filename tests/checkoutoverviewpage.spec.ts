import { test, expect } from "@playwright/test"
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig"
import { ProductPage } from "../pages/ProductPage"
import { LoginPage } from "../pages/LoginPage"
import { CartPage } from "../pages/CartPage"
import { CheckoutPage } from "../pages/CheckoutPage"
import { CheckoutOverviewPage } from "../pages/CheckoutOverViewPage"
import { checkoutData } from "../test-data/CheckoutData"
import { productsToCart } from "../test-data/products"

test.describe("Checkout Overview page validation", () => {

    let loginpage: LoginPage
    let productpage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage
    let checkoutOverviewPage: CheckoutOverviewPage

    test.beforeEach(async ({ page }) => {
        loginpage = new LoginPage(page)
        productpage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        checkoutOverviewPage = new CheckoutOverviewPage(page)

        await page.goto(BASE_URL)
        await loginpage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

        await productpage.getSpecificProductDetails(productsToCart);
        await productpage.clickOnCartLink();
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postal)
        await checkoutPage.clickContinueButton();
    })

    test("Validate checkout overview page UI and url", async ({ page }) => {
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
        const overViewElements = await checkoutOverviewPage.getCheckoutOverviewElement();
        expect(overViewElements.pageInfo).toBeVisible();
        expect(overViewElements.cancelButton).toBeVisible();
        expect(overViewElements.finishButton).toBeVisible();
    })

    test("Validate cancel button functionality", async ({ page }) => {
        await checkoutOverviewPage.clickCancel();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })

    test("Validate Item total calculation", async ({ page }) => {
        const overViewProduct = await checkoutOverviewPage.getCartOverviewProducts();
        //sum initial value is 0 and price value we are getting from getCartOverviewProducts and we want only price that's why {} used
        const calculatedTotal = overViewProduct.reduce((sum, { price }) => sum + parseFloat(price.replace("$", "")), 0);
        const UiTotalItem = await checkoutOverviewPage.getItemTotal();
        expect(calculatedTotal).toBe(UiTotalItem)
    })

    test.only("Validate final total (itemTotal+Tax)", async ({ page }) => {
        const itemTotal = await checkoutOverviewPage.getItemTotal();
        const tax = await checkoutOverviewPage.getTax();
        const finalTotal = await checkoutOverviewPage.getTotal();

        const expectedFinalTotal = itemTotal + tax
        expect(finalTotal).toBe(expectedFinalTotal)
    })

})