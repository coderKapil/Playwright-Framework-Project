import { Page } from "@playwright/test";
import { checkoutpagelocator } from "../locators/CheckoutPageLocator";
import { checkoutData } from "../test-data/CheckoutData";

export class CheckoutPage {
    constructor(private page: Page) {

    }

    async getCheckoutElements() {
        return {
            pageInfo: this.page.locator(checkoutpagelocator.pageInformation),
            cancel: this.page.locator(checkoutpagelocator.cancelButton),
            continue: this.page.locator(checkoutpagelocator.continuebutton)
        }
    }

    async fillCheckoutDetails(firstName: string, lastName: string, postal: string) {
        await this.page.fill(checkoutpagelocator.firstName, firstName)
        await this.page.fill(checkoutpagelocator.lastName, lastName)
        await this.page.fill(checkoutpagelocator.postal, postal)
    }

    async clickCancelButton(){
        await this.page.click(checkoutpagelocator.cancelButton)
    }

    async clickContinueButton(){
        await this.page.click(checkoutpagelocator.continuebutton)
    }

}