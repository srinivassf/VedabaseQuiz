# Google Sheets Setup Checklist

## Step 1: Download the Template (✓ Already Done)
The template CSV is ready at: `GOOGLE_SHEETS_TEMPLATE.csv`

## Step 2: Create Google Sheet (TODO - You Do This)

1. Go to https://docs.google.com/spreadsheets/
2. Click "Create" → "Blank spreadsheet"
3. Name it "Vedabase Quiz Data"
4. Click "File" → "Import" → "Upload" → Select `GOOGLE_SHEETS_TEMPLATE.csv`
5. Choose "Replace current sheet"
6. Copy the Sheet tab name and paste it here: _______________
   - **Must be named exactly: `Quiz Data`** ⚠️
7. Add your quiz questions following the template structure

**After completing:** Copy your Sheet URL and extract the ID:
```
https://docs.google.com/spreadsheets/d/COPY_THIS_PART/edit
                                      ↑
                                  Sheet ID
```
Sheet ID: ___________________________________

## Step 3: Make Sheet Public (TODO - You Do This)

1. In your Google Sheet, click the "Share" button (top right)
2. Click "Change" (next to "Restricted")
3. Select "Anyone with the link" → "Viewer"
4. Click "Share"

✓ Sheet is now publicly accessible with the link

## Step 4: Create Google Cloud API Key (TODO - You Do This)

1. Go to https://console.cloud.google.com/
2. Sign in with your Google account
3. Create a new project (or select existing)
4. Search for "Google Sheets API" in the search bar
5. Click "Enable" button
6. Go to "Credentials" (left sidebar)
7. Click "Create Credentials" → "API Key"
8. Copy the generated API key

API Key: ___________________________________

## Step 5: Configure Environment Variables (TODO - You Do This)

1. Open `.env.local` in the project root
2. Replace the placeholder values:

```env
USE_GOOGLE_SHEETS=true
GOOGLE_SHEETS_ID=YOUR_SHEET_ID_HERE
GOOGLE_API_KEY=YOUR_API_KEY_HERE
```

3. Save the file

✓ Configuration complete!

## Step 6: Test the Setup (TODO - You Do This)

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000/bg/?audience=adult
3. You should see your quizzes from Google Sheets
4. Check browser console (F12) for any errors

## Troubleshooting

If you see errors:
- [ ] Check Sheet ID is correct
- [ ] Check API Key is correct  
- [ ] Check sheet tab is named "Quiz Data"
- [ ] Check sheet is publicly shared
- [ ] Check question data is formatted correctly
- [ ] Restart `npm run dev`

## Done! 🎉

Once working, you can:
- Update questions directly in Google Sheets
- Add new quizzes without redeploying
- Share the sheet with team members for editing
