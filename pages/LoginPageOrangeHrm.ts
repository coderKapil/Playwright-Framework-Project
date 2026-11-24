import { Page } from "@playwright/test";
import { loginLocatorsOrange } from "../locators/LoginLocatorsOrangeHrm";

export class LoginPageOrangeHrm{
    constructor(private page:Page){

    }

    async loginOrangeHrm(username:string,password:string){
        await this.page.fill(loginLocatorsOrange.usernameInput,username)
        await this.page.fill(loginLocatorsOrange.passwordInput,password)
        await this.page.click(loginLocatorsOrange.loginButton);
    }
}