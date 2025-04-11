# Test Case Document

## Test Case Name
Check CV Page and Language Selector

## Every Stpes
   - Save the screenshot in the `tests-reports` directory of this project.
   - Include the script command used for execution in the `README.md` file.

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
- runnable playwright test file
- All specified sections should be present on the page.
- The language should successfully switch to Traditional Chinese (TW).
- If the above steps are successful, ensure that the saved test file can pass the test.

