import { test, expect } from '@playwright/test';

test('dashboard matches the expected structure', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Academic operations' })).toBeVisible();

  await expect(page.locator('.brand')).toContainText("Alya's ERP");
  await expect(page.locator('.signed-in')).toContainText('Administrator');

  for (const label of [
    'Dashboard', 'Students', 'Faculty', 'Courses and curriculum',
    'Timetable', 'Attendance', 'Internal assessment',
    'Examinations', 'Reports', 'Admissions', 'Fees', 'Library', 'Settings'
  ]) {
    await expect(page.getByRole('button', { name: new RegExp(label, 'i') }).first()).toBeVisible();
  }

  await expect(page.getByText('LATER PHASES')).toBeVisible();
  await expect(page.locator('.nav-item.later')).toHaveCount(3);
  await expect(page.locator('.nav-item.later').filter({ hasText: 'Soon' })).toHaveCount(3);

  const settings = page.getByRole('button', { name: /Settings/i });
  await expect(settings).toBeVisible();
  await expect(settings).not.toContainText('Soon');

  await expect(page.getByText('Average attendance', { exact: true })).toBeVisible();
  await expect(page.getByText('Attendance by department')).toBeVisible();
  await expect(page.getByText('Weekly attendance trend')).toBeVisible();
  await expect(page.getByText('Needs attention')).toBeVisible();
  await expect(page.getByText(/Upcoming examinations/i)).toBeVisible();

  await page.screenshot({ path: 'test-results/alyas-erp-dashboard.png', fullPage: true });
  expect(errors, 'Browser JavaScript errors').toEqual([]);
});

test('all main navigation pages open', async ({ page }) => {
  await page.goto('/');

  const pages = [
    ['Students', 'Student directory'],
    ['Faculty', 'Faculty directory'],
    ['Courses and curriculum', 'Courses and curriculum'],
    ['Timetable', 'Academic timetable'],
    ['Attendance', 'Attendance overview'],
    ['Internal assessment', 'Internal assessment'],
    ['Examinations', 'Examination management'],
    ['Reports', 'Reports and analytics'],
    ['Settings', 'Portal settings'],
  ];

  for (const [label, heading] of pages) {
    await page.getByRole('button', { name: new RegExp(label, 'i') }).first().click();
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
  }

  await page.getByRole('button', { name: /Dashboard/i }).first().click();
  await expect(page.getByRole('heading', { name: 'Academic operations' })).toBeVisible();
});

test('dashboard controls respond', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /Schedule examination/i }).click();
  await expect(page.locator('.modal')).toBeVisible();

  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(page.locator('.modal')).toHaveCount(0);

  await page.locator('.notification-wrap > button.icon-btn').click();
  await expect(page.locator('.notification-pop')).toBeVisible();
});

test('mobile layout loads without horizontal page overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Academic operations' })).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    page: document.documentElement.scrollWidth,
  }));

  expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport + 1);

  const menu = page.locator('.mobile-menu');
  await expect(menu).toBeVisible();
  await menu.click();
  await expect(page.locator('.sidebar')).toHaveClass(/mobile-open/);

  await page.getByRole('button', { name: /Settings/i }).click();
  await expect(page.getByRole('heading', { name: 'Portal settings' })).toBeVisible();
});



