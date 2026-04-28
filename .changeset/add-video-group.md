---
"@voyantjs/cloud-sdk": minor
---

Add `video` group to `@voyantjs/cloud-sdk`. The new surface covers video
uploads (`videos.createUpload`, `videos.createFromUrl`), playback and
lifecycle (`videos.list`, `videos.get`, `videos.update`, `videos.delete`,
`videos.enableDownload`, `videos.mintToken`), captions
(`videos.captions.{list, upload, generate, delete}`), and watermark
profiles (`watermarks.{list, create, delete}`).
