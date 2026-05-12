import { expect, test } from "@playwright/test";
import { auth } from "#/lib/auth";

test.describe("Authentication", () => {
  test("opens the auth page", async ({ page }) => {
    await page.goto("/auth");

    await expect(page).toHaveURL(/\/auth$/);
    await expect(page.getByRole("heading", { name: "Connexion" })).toBeVisible();
  });

  test("access to auth utilities", async ({ page }) => {
    const authContext = await auth.$context;

    authContext.test.createUser({
      id: "test-user-id",
    });

    const { session } = await authContext.test.login({
      userId: "test-user-id",
    });

    await expect(session).toBeDefined();
  });
});