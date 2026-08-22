---
title: "rot"
description: "A feed for source material and comprehension checks."
inceptionDate: "2026-06-15"
homepageBlurb: "A feed for source material and comprehension checks."
projectUrl: "https://rot.now/"
projectLinkLabel: "Visit rot"
order: 1
---

I was consuming more papers and podcasts than I could absorb. I built rot to test whether they could share one interface—brainrot—and whether questions drawn from each source measured my understanding.

rot turns a source into a feed of short lessons, videos, and multiple-choice questions.

## Changelog

### August 15–21, 2026

- YouTube course generation is now more reliable: extraction uses bundled tooling, and temporary provider outages return a retryable error instead of marking a video as unsupported.

### July 18–24, 2026

- Added a course catalog and a vertical learning stream that adapts practice to progress, preserves the reading position, and explains answers.
- Course generation now supports larger source collections, document chunking, researched source material, and visuals extracted from PDFs.
- External agents can now estimate, create, monitor, cancel, repair, and read feeds through an OAuth-protected MCP connection or the REST API.
- Feed creation now reports costs before generation, preserves stable results across retries, and refunds failed items.
