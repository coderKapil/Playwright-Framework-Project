import {Page} from "@playwright/test"
import { finalPageLocators } from "../locators/finalPageLocators"

export class FinalPage{
    constructor(private page:Page){

    }

    async getFinalPageElement(){
        return {
            pageTitle:this.page.locator(finalPageLocators.pageTitle),
            successMsg:this.page.locator(finalPageLocators.successMsg),
            backHomeButton:this.page.locator(finalPageLocators.backHomeButton)
        }
    }

    async getSuccessMessage(){
        const text = await this.page.locator(finalPageLocators.successMsg).textContent();
        return text
    }

    async clickOnBackHomeBtn(){
        await this.page.locator(finalPageLocators.backHomeButton).click();
    }

}