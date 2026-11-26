import * as process from "node:process";

const ENV_URL = {
    dev: "https://www.saucedemo.com/",
    qa: "https://www.saucedemo.com/",
    stage: "https://www.saucedemo.com/",
    prod: "https://www.saucedemo.com/"
};

type Environment = keyof typeof ENV_URL;

const envName = process.env.ENV as Environment | undefined;
const ENV = envName && envName in ENV_URL ? envName : "prod";

export const BASE_URL = (ENV_URL as any)[ENV]
export const USERNAME = "standard_user"
export const PASSWORD = "secret_sauce"