# Barcelona Bitcoin Only Homepage

Static homepage for Barcelona Bitcoin Only meetup.

## Setup

1. Edit `src/config.js` with Telegram, Meetup, service URLs, and Lightning address
2. Add logo as `src/logo.png`
3. Run `make build` to create distributable files in `dist/`
4. Run `make serve` to preview locally, or `make deploy` to deploy to remote server (configure `.env` first)

## Optional onchain address donations

You can optionally activate onchain donations on the page by adding an `address.txt` file next to the `index.html` wherever you are serving.

If you're happy with using a single address (dear god no) just put it there and that's it.

If you would like to iterate through addresses of an xpub as they get used, you could use [something like this](https://github.com/BcnBitcoinOnly/next-unused-address).
