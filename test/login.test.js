import { Builder, By, Key, until } from "selenium-webdriver";
import { expect } from "chai";


describe("Automation Login Test",async function(){
    this.timeout(20000);
    let driver

    beforeEach(async function(){
        driver = await new Builder().forBrowser("chrome").build()
        await driver.get("https://practicetestautomation.com/practice-test-login/")
    })

    afterEach(async function(){
        await driver.quit()
    })

    it("Should login successfully",async function(){
        await driver.findElement(By.id("username")).sendKeys("student")
        await driver.findElement(By.id("password")).sendKeys("Password123")
        await driver.findElement(By.id("submit")).click()

        await driver.wait(until.urlContains("logged-in-successfully"),5000)
        const heading = await driver.findElement(By.tagName("h1")).getText()
        expect(heading).to.be.eq("Logged In Successfully")
    })

    it("Should show error for invalid username",async function(){
        await driver.findElement(By.id("username")).sendKeys("incorrectUser")
        await driver.findElement(By.id("password")).sendKeys("Password123")
        await driver.findElement(By.id("submit")).click()

        const e = await driver.wait(until.elementLocated(By.className("show")),5000)
        await driver.wait(async function(){
            const t = await e.getText()
            return t.trim().length > 0
        },3000)
        const errortext = await e.getText()
        expect(errortext).to.be.eq("Your username is invalid!") 
    })

    it("Should show error for invalid password",async function(){
        await driver.findElement(By.id("username")).sendKeys("student")
        await driver.findElement(By.id("password")).sendKeys("incorrectPassword")
        await driver.findElement(By.id("submit")).click()

        const e = await driver.wait(until.elementLocated(By.className("show")),5000)
        await driver.wait(async function(){
            const t = await e.getText()
            return t.trim().length > 0
        },3000)
        const errortext = await e.getText()
        expect(errortext).to.be.eq("Your password is invalid!") 
    })
})