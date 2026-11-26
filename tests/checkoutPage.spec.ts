import { test, expect } from "@playwright/test"
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig"
import { ProductPage } from "../pages/ProductPage"
import { LoginPage } from "../pages/LoginPage"
import { CartPage } from "../pages/CartPage"
import { CheckoutPage } from "../pages/CheckoutPage"
import { checkoutData } from "../test-data/CheckoutData"

test.describe("Cart page validation", () => {

    let loginpage: LoginPage
    let productpage: ProductPage
    let cartPage: CartPage
    let checkoutPage:CheckoutPage

    test.beforeEach(async ({ page }) => {
        loginpage = new LoginPage(page)
        productpage = new ProductPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)

        await page.goto(BASE_URL)
        await loginpage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

        await productpage.addFirstProductToTheCart();
        await productpage.clickOnCartLink();
    })

    test("Validate checkout page UI elements and url",async({page})=>{
       await cartPage.clickCheckoutButton()
       expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")
       const elements = await checkoutPage.getCheckoutElements();
       await expect(elements.pageInfo).toBeVisible();
       await expect(elements.cancel).toBeVisible()
       await expect(elements.continue).toBeVisible();
    })

    test("Validate Cancel button functionality",async({page})=>{
          await cartPage.clickCheckoutButton()
          await checkoutPage.clickCancelButton()
          expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
    })

    test("Validate Continue button functionality",async()=>{
        await cartPage.clickCheckoutButton()
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName,checkoutData.lastName,checkoutData.postal)
        await checkoutPage.clickContinueButton();
    })

})