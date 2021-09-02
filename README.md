# Watermarker Bot

Recently, Indonesian Ministry of Communication and Informatics release a <a href="https://twitter.com/kemkominfo/status/1432675008963170308" target="_blank">tweet</a> about how to anticipate unwanted party to misused our personal data.

<p align="center">
  <img src="https://user-images.githubusercontent.com/26041793/131439823-cbf631f9-685e-48d6-b2c2-104899386d7a.jpeg" width="600" height="600">
</p>


Seems much effort is needed (well, at least for me)

Being a programmer myself, I decide to work on something to make those steps easier (well again, at least for me personally).

## How It Works
- You send image of your personal identification document you want to bookmark to this bot
- This bot will ask for the text you want to use as the watermark text
- This bot will return the watermarked image to you
- This bot **will not** store any of your image you sent, **but** as how the Telegram chat server mechanism works, your image will still be saved in the **Telegram server**, **not mine**.
- This bot works with the same purpose on the tips given by the ministry, this watermarking image process **will not** guarantee that your personal data image is safe from being stolen by unwanted party. **But** this mechanism hopefully will make us know from which platform our data is stolen and hopefully making it less useful because of the watermark.

This explains how this bot works, use this at your own risk.

## Tech Stack
- Node.js
- Typescript
- Sharp (image processor library)
- Telegram Bot Api (Telegram Bot library)

## Thanks To:
- Indonesian Ministry of Communication and Informatics for inspiring me to made this simple bot