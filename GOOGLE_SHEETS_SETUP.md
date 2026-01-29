# Google Sheets Integration Setup Guide

This guide explains how to set up the Vedabase Quiz app to fetch questions from a master Google Sheet instead of JSON files.

## Overview

The app can fetch quiz questions from a Google Sheet on each request. This allows you to:
- Update questions without redeploying the app
- Manage all quizzes in one place
- Scale to many quizzes easily

## Step 1: Create Your Master Google Sheet

1. Go to [Google Sheets](https://docs.google.com/spreadsheets/)
2. Create a new spreadsheet named "Vedabase Quiz Data" (or any name you prefer)
3. Copy the headers from [GOOGLE_SHEETS_TEMPLATE.csv](./GOOGLE_SHEETS_TEMPLATE.csv) into the first row
4. Populate with your quiz data following the structure below

### Sheet Structure

| Column | Description | Example |
|--------|-------------|---------|
| scriptureId | "bg" or "sb" | bg |
| audience | "adult", "teen", or "kids" | adult |
| chapter | BG chapter number (null for SB) | 1 |
| canto | SB canto number (null for BG) | (empty) |
| sbChapter | SB chapter number (null for BG) | (empty) |
| quizId | Unique quiz identifier | bg-1-adult |
| title | Quiz title | Bhagavad Gita - Chapter 1 \| Adult Quiz |
| difficulty | easy, medium, medium-hard, hard | medium-hard |
| publishedOn | Publication date (YYYY-MM-DD) | 2026-01-26 |
| questionId | Unique question ID | bg1-01 |
| prompt | Question text | In BG 1.1, where... |
| choice1 | First answer option | Hastinapura |
| choice2 | Second answer option | Kurukshetra |
| choice3 | Third answer option | Dvaraka |
| choice4 | Fourth answer option | Prayaga |
| correctIndex | Index of correct answer (0-3) | 1 |
| feedback | Explanation for the answer | Kurukshetra is described as dharma-ksetra... |
| verseLabel | Reference label | BG 1.1 |
| verseUrl | Link to verse | https://vedabase.io/en/library/bg/1/1/ |

### Important Notes

- **Sheet Name**: The sheet tab must be named `Quiz Data` (case-sensitive)
- **Multiple Questions**: Each question gets its own row, but quiz metadata (title, difficulty, publishedOn) can be repeated for multiple questions in the same quiz
- **One Row Per Question**: If a quiz has 25 questions, it needs 25 rows (all with the same quizId, title, etc.)

## Step 2: Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable the **Google Sheets API**:
   - In the search bar, type "Sheets API"
   - Click "Enable"
4. Create an **API Key**:
   - Go to Credentials → Create Credentials → API Key
   - Copy the generated key

## Step 3: Make Your Sheet Public

To use an API key (simpler setup):

1. In your Google Sheet, click "Share"
2. Change to "Anyone with the link" with "Viewer" access
3. Copy your sheet's ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add:
   ```env
   USE_GOOGLE_SHEETS=true
   GOOGLE_SHEETS_ID=your_sheet_id_here
   GOOGLE_API_KEY=your_api_key_here
   ```

3. Replace:
   - `your_sheet_id_here`: The ID from your Google Sheet URL
   - `your_api_key_here`: The API key from Google Cloud Console

## Step 5: Test Your Setup

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Navigate to a quiz page (e.g., `/bg/?audience=adult`)
3. Check browser console for any errors
4. If questions load, you're all set!

## Caching

The app caches Google Sheet data for **1 hour** to reduce API calls. To bust the cache:
- Restart the server
- Or wait 1 hour for automatic refresh

## Troubleshooting

### "Failed to fetch Google Sheet" error
- Verify `GOOGLE_SHEETS_ID` is correct
- Verify `GOOGLE_API_KEY` is correct
- Ensure sheet is public (shared with "Anyone with the link")
- Check that sheet tab is named `Quiz Data`

### "Google Sheet is empty" error
- Verify headers are in the first row
- Verify data is in subsequent rows

### Quiz not appearing
- Check that the `quizId` format matches expected pattern
- For BG: `bg-{chapter}-{audience}` (e.g., `bg-1-adult`)
- For SB: `sb-{canto}-{chapter}-{audience}` (e.g., `sb-1-1-adult`)
- Verify audience is one of: `adult`, `teen`, `kids`

### Data not updating
- Wait 1 hour for cache to expire, or restart server
- Check that changes were saved in Google Sheet
- Verify sheet name is exactly `Quiz Data`

## Switching Back to JSON

To use JSON files instead:
1. Set `USE_GOOGLE_SHEETS=false` in `.env.local`
2. Restart the server

## Example Google Sheet

An example sheet is available in [GOOGLE_SHEETS_TEMPLATE.csv](./GOOGLE_SHEETS_TEMPLATE.csv)

You can:
1. Download this CSV file
2. Import it into Google Sheets via "File → Import"
3. Customize with your questions

## Production Deployment

For Vercel/production:
1. Set environment variables in your hosting platform's settings
2. Add `GOOGLE_SHEETS_ID` and `GOOGLE_API_KEY` as secrets
3. Deploy normally

No changes to code are needed!
