import { Page } from "@playwright/test"
import { productPageLocator } from "../locators/ProductPageLocator"

export class ProductPage {
    constructor(private page: Page) {

    }

    async logout() {
        await this.page.click(productPageLocator.settingIcon);
        await this.page.click(productPageLocator.logoutLink);
    }

    async openAboutPage() {
        await this.page.click(productPageLocator.settingIcon);
        await this.page.click(productPageLocator.aboutLink)
    }

    async validateAllProductIsDisplayed() {
        const productname = await this.page.locator(productPageLocator.productName).allTextContents();
        const productDescription = await this.page.locator(productPageLocator.productDescription).allTextContents();
        const ProductPrice = await this.page.locator(productPageLocator.productPrice).allTextContents();
        const buttonCount = await this.page.locator(productPageLocator.addToCartButtons).count()

        if (productname.length === 0) {
            throw Error("No Product Found")
        }

        if (productname.length !== productDescription.length || productname.length !== ProductPrice.length || productname.length !== buttonCount) {
            throw Error("Mismatch between the product details...")
        }
    }

    async addFirstProductToTheCart() {
        await this.page.locator(productPageLocator.addToCartButtons).first().click();
    }

    async addAllProductsToCart() {
        const buttons = this.page.locator(productPageLocator.addToCartButtons)
        const btnCount = await buttons.count();

        for (let i = 0; i < btnCount; i++) {
            await buttons.nth(i).click();
        }
    }

    async addSpecificProductToCart(productNames: string[]) {
        const addProducts = this.page.locator(productPageLocator.productName);
        const count = await addProducts.count();

        for (let i = 0; i < count; i++) {
            const name = await addProducts.nth(i).textContent();
            if (name && productNames.includes(name.trim())) {
                await this.page.locator(productPageLocator.addToCartButtons).nth(i).click();
                await this.page.waitForTimeout(4000);
            }
        }
    }

    async filterByNameAtoZ() {
        await this.page.selectOption(productPageLocator.filterDropDown, "az");
    }

    async filterByNameZtoA() {
        await this.page.selectOption(productPageLocator.filterDropDown, "za");//here second param is the value of that option
    }

    async filterByPriceLowToHigh() {
        await this.page.selectOption(productPageLocator.filterDropDown, "lohi");
    }

    async filterByPriceHighToLow() {
        await this.page.selectOption(productPageLocator.filterDropDown, "hilo");
    }

    //For validation we will collect the product name for A to Z and Z to A validation

    async getProductNames() {
        return await this.page.locator(productPageLocator.productName).allTextContents()
    }

    //to validate prices low to high and high to low we have to remove the dollar symbol also
    async getProductPrices() {
        const prices = await this.page.locator(productPageLocator.productPrice).allTextContents();
        //converting prices value from string to float value and replacing $ symbol from prices for comparison
        return prices.map(price => parseFloat(price.replace('$', '')))
    }

}