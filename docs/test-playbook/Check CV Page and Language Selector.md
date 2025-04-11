# Test Case Document

## Test Case Name
Check CV Page and Language Selector

## Every Stpes

Screenshot every steps to prove the test results are successful.

   - Save the screenshot photo in the `playwright-report` directory of this project.

## Test Steps

1. Open the browser and navigate to https://lung-yu.github.io
2. Click the Curriculum Vitae tab
3. Click the language selector and select English
4. Check for the existence of the following sections:
   - Skills
   - Experience
   - Education
   - Conferences
5. Click the language selector and select Traditional Chinese (TW)
6. Click Expand All and Collapse All


## Expected Results
- runnable playwright test file and save in tests directory of this project.
- execute 'npx playwright test'

