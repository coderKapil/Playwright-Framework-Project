import { Page } from "@playwright/test";
import { cartPageLocators } from "../locators/CartPageLocator";

export class CartPage {
    constructor(private page: Page) {

    }

    async clickOnContinueShopping() {
        await this.page.locator(cartPageLocators.continueShoppingButton).click();
    }

    async getCartPageElements() {
        return {
            cartTitle: this.page.locator(cartPageLocators.cartTitle),
            continueButton: this.page.locator(cartPageLocators.continueShoppingButton),
            checkoutButton: this.page.locator(cartPageLocators.checkoutButton)
        }
    }

    async getCartProducts() {
        const allnames = await this.page.locator(cartPageLocators.productName).allTextContents();
        const alldescriptions = await this.page.locator(cartPageLocators.productDescription).allTextContents();
        const allprices = await this.page.locator(cartPageLocators.productPrice).allTextContents();
        //here we are sending multiple product details so here we have to use array of objects
        const allCartProducts = allnames.map((_, i) =>
        ({
            name: allnames[i].trim(),
            description: alldescriptions[i].trim(),
            price: allprices[i].trim()
        }))

        return allCartProducts
    }

    async removeFirstProduct(){
        await this.page.locator(cartPageLocators.removeButton).first().click();
        await this.page.waitForTimeout(2000)
    }

}