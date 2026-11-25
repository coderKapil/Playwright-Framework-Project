import { test, expect } from "@playwright/test"
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig"
import { ProductPage } from "../pages/ProductPage"
import { LoginPage } from "../pages/LoginPage"
import { LoginLocators } from "../locators/LoginLocators"
import { productPageLocator } from "../locators/ProductPageLocator"

test.describe("Product page validation", () => {

    let loginpage: LoginPage
    let productpage: ProductPage

    test.beforeEach(async ({ page }) => {
        loginpage = new LoginPage(page)
        productpage = new ProductPage(page)

        await page.goto(BASE_URL)
        await loginpage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })

    test("Validate logout functionality", async ({ page }) => {
      await productpage.logout();
      await expect(page.locator(LoginLocators.loginButton)).toBeVisible();
    })

    test("Validate About page and navigate back",async({page})=>{
        await productpage.openAboutPage();
        await expect(page.locator(productPageLocator.logoImage)).toBeVisible();
        await page.goBack()
        await expect(page.locator(productPageLocator.settingIcon)).toBeVisible()
    })

})