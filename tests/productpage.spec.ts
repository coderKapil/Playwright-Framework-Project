import { test, expect } from "@playwright/test"
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig"
import { ProductPage } from "../pages/ProductPage"
import { LoginPage } from "../pages/LoginPage"
import { LoginLocators } from "../locators/LoginLocators"
import { productPageLocator } from "../locators/ProductPageLocator"
import { productsToCart } from "../test-data/products"

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

    test("Validate About page and navigate back", async ({ page }) => {
        await productpage.openAboutPage();
        await expect(page.locator(productPageLocator.logoImage)).toBeVisible();
        await page.goBack()
        await expect(page.locator(productPageLocator.settingIcon)).toBeVisible()
    })

    test("Validate product page", async () => {
        await productpage.validateAllProductIsDisplayed();
        await productpage.addAllProductsToCart()
    })

    test("Validate adding specific product to carts", async () => {
        await productpage.addSpecificProductToCart(productsToCart)
    })

    test("Filter by name A  to Z", async () => {
        await productpage.filterByNameAtoZ();//for selecting the a to z filter form the filter dropdown
        //for storing all the product names
        const names = await productpage.getProductNames();
        const sorted = [...names].sort();//sorting the product name in ascending order
        expect(names).toEqual(sorted)//comparing the product names and sorted value
    })

    test("Filter by name Z  to A", async () => {
        await productpage.filterByNameZtoA();//for selecting the z to a filter form the filter dropdown
        //for storing all the product names
        const names = await productpage.getProductNames();
        const sorted = [...names].sort().reverse();//sorting the product name in descending order that why reverse is added
        expect(names).toEqual(sorted)//comparing the product names and sorted value
    })

    test("Filter by price low to high", async () => {
        await productpage.filterByPriceLowToHigh();
        const prices = await productpage.getProductPrices();
        const sortedPrice = [...prices].sort((a,b)=>a-b);//a is first val and b is second val and a-b is for asccending sort
        expect(prices).toEqual(sortedPrice);
    })

    test("Filter by price high to low", async () => {
        await productpage.filterByPriceHighToLow();
        const prices = await productpage.getProductPrices();
        const sortedPrice = [...prices].sort((a,b)=>b-a);//b-a is for descending sorting
        expect(prices).toEqual(sortedPrice);
    })


})