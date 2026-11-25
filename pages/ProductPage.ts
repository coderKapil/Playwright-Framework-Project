import {Page} from "@playwright/test"
import { productPageLocator } from "../locators/ProductPageLocator"

export class ProductPage{
    constructor(private page:Page){

    }

    async logout(){
        await this.page.click(productPageLocator.settingIcon);
        await this.page.click(productPageLocator.logoutLink);
    }

    async openAboutPage(){
        await this.page.click(productPageLocator.settingIcon);
        await this.page.click(productPageLocator.aboutLink)
    }
}