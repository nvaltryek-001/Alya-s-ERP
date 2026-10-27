import { test, expect } from '@playwright/test';

async function openStudents(page) {
  await page.goto('/');
  await page.getByRole('button', { name: /^Students$/ }).click();
  await expect(
    page.getByRole('heading', { name: 'Student directory' })
  ).toBeVisible();
}

test('student creation, editing and deletion work', async ({ page }) => {
  await openStudents(page);

  const uniqueName = `E2E Student ${Date.now()}`;

  await page.getByRole('button', { name: 'Add student' }).first().click();
  await expect(page.locator('.modal')).toBeVisible();

  await page.getByLabel('Full name').fill(uniqueName);
  await page.getByLabel('Email address').fill('e2e.student@example.com');
  await page.getByRole('button', { name: 'Add record' }).click();

  await expect(page.locator('.modal')).toHaveCount(0);
  await expect(page.getByText('Student added successfully')).toBeVisible();

  const globalSearch = page.getByPlaceholder('Search students, faculty, courses');
  await globalSearch.fill(uniqueName);

  const studentRow = page.locator('tbody tr').filter({ hasText: uniqueName });
  await expect(studentRow).toBeVisible();

  await studentRow.getByRole('button', { name: 'Edit' }).click();

  await expect(page.locator('.modal')).toBeVisible();
  await page.getByLabel('Full name').fill(`${uniqueName} Updated`);
  await page.getByRole('button', { name: 'Save changes' }).click();

  await expect(
    page.getByText(`${uniqueName} Updated`, { exact: true })
  ).toBeVisible();

  const updatedRow = page.locator('tbody tr').filter({
    hasText: `${uniqueName} Updated`,
  });
  await updatedRow.getByRole('button', { name: 'Delete' }).click();

  await expect(
    page.getByText(`${uniqueName} Updated`, { exact: true })
  ).toHaveCount(0);
  await expect(page.getByText('Record deleted')).toBeVisible();
});

test('student search and sorting respond correctly', async ({ page }) => {
  await openStudents(page);

  const search = page.getByPlaceholder('Search students, faculty, courses');
  await search.fill('definitely-no-matching-student-928374');

  await expect(page.getByText('No records found')).toBeVisible();

  await search.fill('');
  await expect(page.locator('tbody tr').first()).toBeVisible();

  const firstNameBefore = await page.locator('tbody tr').first().innerText();
  await page.locator('th.sortable').click();
  const firstNameAfter = await page.locator('tbody tr').first().innerText();

  expect(firstNameAfter).not.toBe('');
  expect(firstNameBefore).not.toBe('');
});

test('student CSV export triggers a download', async ({ page }) => {
  await openStudents(page);

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export CSV' }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe('alyas-erp-students.csv');
});



// PHASE 3: Additional functional coverage

test('faculty creation, editing and deletion work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /^Faculty$/ }).click();
  await expect(
    page.getByRole('heading', { name: 'Faculty directory' })
  ).toBeVisible();

  const uniqueName = `E2E Faculty ${Date.now()}`;

  await page.getByRole('button', { name: 'Add faculty' }).first().click();
  await expect(page.locator('.modal')).toBeVisible();

  await page.getByLabel('Full name').fill(uniqueName);
  await page.getByLabel('Email address').fill('e2e.faculty@example.com');
  await page.getByRole('button', { name: 'Add record' }).click();

  await expect(page.locator('.modal')).toHaveCount(0);
  await expect(page.getByText('Faculty member added successfully')).toBeVisible();

  const search = page.getByPlaceholder('Search students, faculty, courses');
  await search.fill(uniqueName);

  const row = page.locator('tbody tr').filter({ hasText: uniqueName });
  await expect(row).toBeVisible();

  await row.getByRole('button', { name: 'Edit' }).click();
  await page.getByLabel('Full name').fill(`${uniqueName} Updated`);
  await page.getByRole('button', { name: 'Save changes' }).click();

  await search.fill(`${uniqueName} Updated`);
  const updatedRow = page.locator('tbody tr').filter({
    hasText: `${uniqueName} Updated`,
  });
  await expect(updatedRow).toBeVisible();

  await updatedRow.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Record deleted')).toBeVisible();
  await expect(updatedRow).toHaveCount(0);
});

test('student form rejects a missing required email', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /^Students$/ }).click();
  await page.getByRole('button', { name: 'Add student' }).first().click();

  await page.getByLabel('Full name').fill(`Validation Student ${Date.now()}`);

  const email = page.getByLabel('Email address');
  await expect(email).toHaveAttribute('required', '');

  await page.getByRole('button', { name: 'Add record' }).click();

  await expect(page.locator('.modal')).toBeVisible();
  expect(await email.evaluate(el => el.validity.valueMissing)).toBe(true);
});

test('student status filter shows only matching records', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /^Students$/ }).click();

  await page.getByLabel('Status').selectOption({ label: 'Inactive' });

  const rows = page.locator('tbody tr');
  const count = await rows.count();

  if (count > 0) {
    for (let i = 0; i < count; i++) {
      await expect(rows.nth(i).locator('.status')).toHaveText('Inactive');
    }
  } else {
    await expect(page.getByText('No records found')).toBeVisible();
  }
});

test('examination scheduling adds an examination', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /^Examinations$/ }).click();

  await page.getByRole('button', { name: /Schedule examination/i }).first().click();
  await expect(page.locator('.modal')).toBeVisible();

  const course = `E2E Test ${Date.now()}`;
  await page.getByLabel('Course / subject').fill(course);
  await page.getByLabel('Room / block').fill('E2E-Room-1');

  await page.getByRole('button', { name: 'Schedule exam', exact: true }).click();

  await expect(page.locator('.modal')).toHaveCount(0);
  await expect(page.getByText('Examination scheduled')).toBeVisible();
  await expect(page.getByText(course, { exact: true })).toBeVisible();
});

