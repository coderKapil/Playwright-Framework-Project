import { test, expect } from "@playwright/test"
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfig"
import { ProductPage } from "../pages/ProductPage"
import { LoginPage } from "../pages/LoginPage"
import { productsToCart } from "../test-data/products"
import { CartPage } from "../pages/CartPage"

test.describe("Cart page validation", () => {

    let loginpage: LoginPage
    let productpage: ProductPage
    let cartPage: CartPage

    test.beforeEach(async ({ page }) => {
        loginpage = new LoginPage(page)
        productpage = new ProductPage(page)
        cartPage = new CartPage(page)

        await page.goto(BASE_URL)
        await loginpage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })

    test("Validate cart page url and validate elements", async ({ page }) => {
        await productpage.addFirstProductToTheCart();
        await productpage.clickOnCartLink();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
        const ui = await cartPage.getCartPageElements();
        await expect(ui.cartTitle).toBeVisible();
        await expect(ui.continueButton).toBeVisible();
        await expect(ui.checkoutButton).toBeVisible();
    })

    test("Validate continue shopping functionality", async ({ page }) => {
        await productpage.addFirstProductToTheCart();
        await productpage.clickOnCartLink();
        await cartPage.clickOnContinueShopping();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })

    test("Validate First product in the cart page", async ({ page }) => {
        const firstProduct = await productpage.getFirstProductDetails();
        await productpage.addFirstProductToTheCart();
        await productpage.clickOnCartLink();
        const cartproductDetails = await cartPage.getCartProducts();
        expect(cartproductDetails[0]).toEqual(firstProduct)
    })

    test("Validate all products added to the cart page", async ({ page }) => {
        const allproducts = await productpage.getAllProductsDetails();
        await productpage.addAllProductsToCart();
        await productpage.clickOnCartLink();
        const cartproductDetails = await cartPage.getCartProducts();
        expect(cartproductDetails).toEqual(allproducts)
    })

    test("Validate specific product added to the cart page", async ({ page }) => {
        const getSpecificProductDetails = await productpage.getSpecificProductDetails(productsToCart);
        await productpage.addSpecificProductToCart(productsToCart)
        await productpage.clickOnCartLink();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
        const cartProducts = await cartPage.getCartProducts();
        expect(cartProducts).toEqual(getSpecificProductDetails)
    })

    test.only("Validate remove product functionality", async ({ page }) => {
        await productpage.addAllProductsToCart();
        await productpage.clickOnCartLink();
        const initialproducts = await cartPage.getCartProducts();
         expect(initialproducts.length).toBeGreaterThan(0);
        await cartPage.removeFirstProduct()
        const updatedCartProduct = await cartPage.getCartProducts();
        expect(updatedCartProduct.length).toBe(initialproducts.length-1)
    })

})