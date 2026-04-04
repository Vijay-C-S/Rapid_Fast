# SEO QA Checklist

Run this before publishing major updates.

## Quick Run

```powershell
pwsh -File .\seo-qa-check.ps1
```

## Manual Checks

1. Verify top pages have `title`, `meta description`, `canonical`, `viewport`.
2. Verify root pages have `og:image` and `twitter:image`.
3. Verify no malformed script starts like `<script src="` with missing URL.
4. Verify ad scripts from `highperformanceformat.com` and `profitablecpmratenetwork.com` use `async`.
5. Verify no `target="_blank"` links are missing `rel="noopener noreferrer"`.
6. Validate `robots.txt` and `sitemap.xml` are reachable and up to date.
7. Validate `JobPosting` schema on a sample job detail URL, e.g. `job-detail.html?id=mycaptain-campus-ambassador`.
8. Check mobile rendering at 375px, 576px, and 768px widths.
9. Confirm no horizontal overflow on key pages.
10. Spot-check social preview cards using Open Graph debugger tools.
