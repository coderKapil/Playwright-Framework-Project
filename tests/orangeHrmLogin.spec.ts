import {test,expect} from "@playwright/test"
import { LoginPageOrangeHrm } from "../pages/LoginPageOrangeHrm"
import { BASE_URL,USERNAME,PASSWORD } from "../utils/orangehrmenvConfig"

test("Orange HRM Application Login Test",async({page})=>{
    const orangeHrmLoginPage = new LoginPageOrangeHrm(page);
    await page.goto(BASE_URL);
    await orangeHrmLoginPage.loginOrangeHrm(USERNAME,PASSWORD)
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
})