import { Page } from "@playwright/test"
import { checkoutOverviewLocators } from "../locators/CheckoutOverview"

export class CheckoutOverviewPage {
    constructor(private page: Page) {

    }

    async getCheckoutOverviewElement() {
        return {
            pageInfo: this.page.locator(checkoutOverviewLocators.pageInfo),
            cancelButton: this.page.locator(checkoutOverviewLocators.cancelButton),
            finishButton: this.page.locator(checkoutOverviewLocators.finishButton)
        }
    }

    async getCartOverviewProducts() {
        const allnames = await this.page.locator(checkoutOverviewLocators.productName).allTextContents();
        const alldescriptions = await this.page.locator(checkoutOverviewLocators.productDescription).allTextContents();
        const allprices = await this.page.locator(checkoutOverviewLocators.productPrice).allTextContents();
        //here we are sending multiple product details so here we have to use array of objects
        const allCartProducts = allnames.map((_, i) =>
        ({
            name: allnames[i].trim(),
            description: alldescriptions[i].trim(),
            price: allprices[i].trim()
        }))

        return allCartProducts
    }
//? means the value could be null but ! means i am sure value will not be null
    async getItemTotal() {
        const text = await this.page.locator(checkoutOverviewLocators.itemTotal).textContent();
        return parseFloat(text!.replace("Item total: $", "").trim());
    }

    async getTax() {
        const text = await this.page.locator(checkoutOverviewLocators.tax).textContent();
        return parseFloat(text!.replace("Tax: $", "").trim());
    }

    async getTotal() {
        const text = await this.page.locator(checkoutOverviewLocators.total).textContent();
        return parseFloat(text!.replace("Total: $", "").trim());
    }

    async clickCancel() {
        await this.page.locator(checkoutOverviewLocators.cancelButton).click()
    }

    async clickFinishButton() {
        await this.page.locator(checkoutOverviewLocators.finishButton).click();
    }

}