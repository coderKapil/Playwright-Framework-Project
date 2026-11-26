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
            await this.page.waitForTimeout(1000)
        }
    }

    async addSpecificProductToCart(productNames: string[]) {
        const addProducts = this.page.locator(productPageLocator.productName);
        const count = await addProducts.count();

        for (let i = 0; i < count; i++) {
            const name = await addProducts.nth(i).textContent();
            if (name && productNames.includes(name.trim())) {
                await this.page.locator(productPageLocator.addToCartButtons).nth(i).click();
                await this.page.waitForTimeout(1000);
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

    async clickOnCartLink() {
        await this.page.locator(productPageLocator.cartLink).click();
    }

    async getFirstProductDetails() {
        const name = await this.page.locator(productPageLocator.productName).first().textContent();
        const description = await this.page.locator(productPageLocator.productDescription).first().textContent();
        const price = await this.page.locator(productPageLocator.productPrice).first().textContent();
        //As we are only sending a single product detail as an object so we can use object notation
        return {
            name: name?.trim(),
            description: description?.trim(),
            price: price?.trim()
        }

    }

    async getAllProductsDetails() {
        const allnames = await this.page.locator(productPageLocator.productName).allTextContents();
        const alldescriptions = await this.page.locator(productPageLocator.productDescription).allTextContents();
        const allprices = await this.page.locator(productPageLocator.productPrice).allTextContents();
        //here we are sending multiple product details so here we have to use array of objects
        const allproducts = allnames.map((_, i) =>
        ({
            name: allnames[i].trim(),
            description: alldescriptions[i].trim(),
            price: allprices[i].trim()
        }))
        return allproducts

    }

    async getSpecificProductDetails(productNames: string[]) {
        const allnames = await this.page.locator(productPageLocator.productName).allTextContents();
        const alldescriptions = await this.page.locator(productPageLocator.productDescription).allTextContents();
        const allprices = await this.page.locator(productPageLocator.productPrice).allTextContents();
        //here we are sending multiple product details so here we have to use array of objects
        const allproducts = allnames.map((_, i) =>
        ({
            name: allnames[i].trim(),
            description: alldescriptions[i].trim(),
            price: allprices[i].trim()
        }))

        return allproducts.filter(p => productNames.includes(p.name))

    }

}