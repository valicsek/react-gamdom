import { test, expect } from "@playwright/test";

const url = "http://localhost:3000/";

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("should navigate to the index page", async ({ page }) => {
  await expect(page).toHaveURL(url);
  await expect(page.locator("h1")).toContainText("Betting Dashboard - Sport Games");
});

test("should have a 7 sport list filter items (Football, Basketball, Ice Hockey, Tennis, Volleyball, Baseball, Rugby)", async ({ page }) => {
  await expect(page.getByTestId("sport-filter-item")).toHaveCount(7);
});

test("should have sport card item list for Football", async ({ page }) => {
  await expect(page.getByTestId("sport-card-item")).not.toHaveCount(0);
});

test("should show a modal when user click on a sport card item bet", async ({ page }) => {
  await page.getByTestId("sport-card-item-bet").first().click();
  await expect(page.getByTestId("modal")).toHaveCount(1);
});

test("should show a modal when user click on a sport card item bet", async ({ page }) => {
  await page.getByTestId("sport-card-item-bet").first().click();
});
