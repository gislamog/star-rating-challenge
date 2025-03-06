import { test, expect } from '@playwright/test';

// ===================== SINGULAR TESTS, COVERING SPECIFIC COMPONENTS AND FUNTIONALITIES 

test('First StarRating has 3 stars after selecting 3rd star, and becomes non-clickable', async ({ page }) => {
	await page.goto('/');

	// locate first StarRating
	const firstRating = page.locator('.star-rating').nth(0);

	// click 3rd star
	await firstRating.locator('button').nth(2).click();

	// ensure other stars are not clickable
	for (let i = 0; i < 5; i++) {
		const isDisabled = await firstRating.locator('button').nth(i).isDisabled();
		expect(isDisabled).toBe(true);
	}

	// check that 3rd star is clicked
	const output = firstRating.locator('.selected-rating');
	await expect(output).toHaveText('3');
});



test('First StarRating shows rating of null when no rating is given', async ({ page }) => {
	await page.goto('/');

	// find first StarRating
	const firstRating = page.locator('.star-rating').nth(0);

	// check for rating of null
	const output = firstRating.locator('.selected-rating');
	await expect(output).toHaveText('null');
});



test('First StarRating does not update rating when hovering over 4 stars', async ({ page }) => {
	await page.goto('/');

	// find first StarRating
	const firstRating = page.locator('.star-rating').nth(0);

	// hover over 4th star
	await firstRating.locator('button').nth(3).hover();

	// ensure rating is still null
	const output = firstRating.locator('.selected-rating');
	await expect(output).toHaveText('null');
});



test('Second StarRating has 2 stars after selecting 2nd star and becomes non-clickable', async ({ page }) => {
	await page.goto('/');

	// locate second StarRating
	const secondRating = page.locator('.star-rating').nth(1);

	// click 2nd star
	await secondRating.locator('button').nth(1).click();

	// ensure other stars are not clickable
	for (let i = 0; i < 5; i++) {
		const isDisabled = await secondRating.locator('button').nth(i).isDisabled();
		expect(isDisabled).toBe(true);
	}

	// check that 2nd star is clicked
	const output = secondRating.locator('.selected-rating');
	await expect(output).toHaveText('2');
});



test('Second StarRating correctly highlights first 3 stars gold and last 2 gray after clicking 3rd star', async ({ page }) => {
	await page.goto('/');

	// find second StarRating
	const secondRating = page.locator('.star-rating').nth(1);

	// select 3rd star
	await secondRating.locator('button').nth(2).click();

	// check first 3 stars are golden and last 2 are gray
	for (let k = 0; k < 5; k++) {
		const star = secondRating.locator('button').nth(k);

		if (k < 3) {
			// golden
			await expect(star).toHaveClass(/text-yellow-400/);
		} else {
			// gray
			await expect(star).toHaveClass(/text-gray-400/);
		}
	}
});



test('Second StarRating component contains exactly 5 stars', async ({ page }) => {
	await page.goto('/');

	// find second StarRating
	const secondRating = page.locator('.star-rating').nth(1);

	// count the number of stars/buttons
	const starCount = await secondRating.locator('button').count();

	// expect 5 stars
	expect(starCount).toBe(5);
});



test('Second StarRating does not change star colors on hover after rating 2 is selected', async ({ page }) => {
	await page.goto('/');

	// find second StarRating
	const secondRating = page.locator('.star-rating').nth(1);

	// select 2nd star
	await secondRating.locator('button').nth(1).click()

	// hover over 4th star
	await secondRating.locator('button').nth(3).hover();

	// ensure stars are correctly colored (first 2 are gold, last 3 are gray)
	for (let k = 0; k < 5; k++) {
		const star = secondRating.locator('button').nth(k);

		if (k < 2) {
			// golden
			await expect(star).toHaveClass(/text-yellow-400/);

		} else {
			// gray
			await expect(star).toHaveClass(/text-gray-400/);
		}
	}
});



test('Third StarRating starts with 5 gray stars', async ({ page }) => {
	await page.goto('/');

	// find third StarRating
	const thirdRating = page.locator('.star-rating').nth(2);

	// check all 5 stars are gray
	for (let i = 0; i < 5; i++) {
		await expect(thirdRating.locator('button').nth(i)).toHaveClass(/text-gray-400/);
	}
});



test('Third StarRating has 4 gold stars on hover over 4th star', async ({ page }) => {
	await page.goto('/');

	// find third StarRating
	const thirdRating = page.locator('.star-rating').nth(2);

	// hover over 4th star
	await thirdRating.locator('button').nth(3).hover();

	// check that first 4 stars are gold
	for (let i = 0; i < 4; i++) {
		await expect(thirdRating.locator('button').nth(i)).toHaveClass(/text-yellow-400/);
	}
});



test('Third StarRating shows rating of 5 after 5th star is clicked', async ({ page }) => {
	await page.goto('/');

	// find third StarRating
	const thirdRating = page.locator('.star-rating').nth(2);

	// select 5th star
	await thirdRating.locator('button').nth(4).click()

	// check for rating of 5
	const output = thirdRating.locator('.selected-rating');
	await expect(output).toHaveText('5');
});






// ===================== FULL USER INTERACTION TESTS:


test('Third StarRating behaves correctly (null initial state, hover 3rd star, click 3rd, lock rating)', async ({ page }) => {
	await page.goto('/');

	const thirdRating = page.locator('.star-rating').nth(2);
	const output = thirdRating.locator('.selected-rating');

	// check that all stars start gray
	for (let i = 0; i < 5; i++) {
		await expect(thirdRating.locator('button').nth(i)).toHaveClass(/text-gray-400/);
	}

	// check that hover turns 3 stars gold when hovering over 3rd star
	await thirdRating.locator('button').nth(2).hover();
	for (let i = 0; i <= 2; i++) {
		await expect(thirdRating.locator('button').nth(i)).toHaveClass(/text-yellow-400/);
	}

	// click 3rd star and check recorded rating
	await thirdRating.locator('button').nth(2).click();
	await expect(output).toHaveText('3');

	// try clicking other stars and verify locked state
	for (let i = 0; i < 5; i++) {
		await expect(thirdRating.locator('button').nth(i)).toBeDisabled();
	}
});






// ===================== MORE EXTENSIVE TESTS, COVERING ENTIRE FUNCTIONALITIES:

test('ALL components output the correct rating after clicking each star, including null', async ({ page }) => {
	await page.goto('/');

	// count how many StarRating components exist (in case more are added in the future)
	const starRatingCount = await page.locator('.star-rating').count();

	// iterate through each component
	for (let i = 0; i < starRatingCount; i++) {
		//console.log(`Testing StarRating #${i + 1}`);

		// iterate 6 times per component: null, then 1-5 stars
		for (let j = 0; j < 6; j++) {
			// reset page
			await page.reload();

			// locate current StarRating component
			const currentRating = page.locator('.star-rating').nth(i);
			
			// click star after null check
			if (j > 0) {
				await currentRating.locator('button').nth(j - 1).click();
				//console.log(`\tClicked star #${j}`)
			}

			// get output
			const output = page.locator('.selected-rating').nth(i);
			const expectedOutput = j === 0 ? 'null' : `${j}`;

			await expect(output).toHaveText(expectedOutput);
		}
	}
});

test('ALL components have five gray stars visible by default', async ({ page }) => {
	await page.goto('/');

	// count how many StarRating components exist
	const starRatingCount = await page.locator('.star-rating').count();

	// iterate through each component
	for (let i = 0; i < starRatingCount; i++) {

		// locate current StarRating component
		const currentRating = page.locator('.star-rating').nth(i);

		// check if all 5 stars are gray
		const grayStars = await currentRating.locator('.text-gray-400').count();
		await expect(grayStars).toBe(5);
	}
});

test('ALL components have correct stars turning gold on hover, and keeps others gray', async ({ page }) => {
	await page.goto('/');

	// count how many StarRating components exist
	const starRatingCount = await page.locator('.star-rating').count();

	// iterate through each component
	for (let i = 0; i < starRatingCount; i++) {

		// hover over each star and check correct behavior, including null
		for (let j = 0; j < 6; j++) {
			await page.reload();
			const currentRating = page.locator('.star-rating').nth(i);

			// hover over star after null check
			if (j > 0) {
				await currentRating.locator('button').nth(j - 1).hover();
			}

			// check that correct stars are golden and others are gray
			for (let k = 0; k < 5; k++) {
				if (k < j) {
					// golden
					const star = currentRating.locator('button').nth(k);
					await expect(star).toHaveClass(/text-yellow-400/);

				} else {
					// gray
					const star = currentRating.locator('button').nth(k);
					await expect(star).toHaveClass(/text-gray-400/);
				}
			}
		}
	}
});



test('ALL components are not clickable after a rating of 2 is selected', async ({ page }) => {
	await page.goto('/');

	// count how many StarRating components exist
	const starRatingCount = await page.locator('.star-rating').count();

	// iterate through each component
	for (let i = 0; i < starRatingCount; i++) {

		// select rating of 2
		const currentRating = page.locator('.star-rating').nth(i);
		await currentRating.locator('button').nth(1).click();


		// check if any buttons are clickable
		for (let j = 0; j < 5; j++) {
			const isDisabled = await currentRating.locator('button').nth(j).isDisabled();
			expect(isDisabled).toBe(true);
		}
	}
});



test('ALL components correctly highlight stars after clicking for each star', async ({ page }) => {
	await page.goto('/');

	// count how many StarRating components exist
	const starRatingCount = await page.locator('.star-rating').count();

	// iterate through each component
	for (let i = 0; i < starRatingCount; i++) {

		// hover over each star and check correct behavior, including null
		for (let j = 0; j < 6; j++) {
			await page.reload();
			const currentRating = page.locator('.star-rating').nth(i);

			// hover over star after null check
			if (j > 0) {
				await currentRating.locator('button').nth(j - 1).click();
			}

			// check that correct stars are golden and others are gray
			for (let k = 0; k < 5; k++) {
				if (k < j) {
					// golden
					const star = currentRating.locator('button').nth(k);
					await expect(star).toHaveClass(/text-yellow-400/);

				} else {
					// gray
					const star = currentRating.locator('button').nth(k);
					await expect(star).toHaveClass(/text-gray-400/);
				}
			}
		}
	}
});