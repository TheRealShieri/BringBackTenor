<div align="center">
  <h1>Bring Back Tenor</h1>
  <p>A BetterDiscord plugin that restores and enhances Tenor GIF search inside Discord.</p>

  [![BetterDiscord](https://img.shields.io/badge/BetterDiscord-Plugin-blue?style=for-the-badge&logo=discord)](https://betterdiscord.app/)
  [![Version](https://img.shields.io/badge/Version-1.0.0-success?style=for-the-badge)](https://github.com/TheRealShieri/BringBackTenor)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
</div>

<br />

## Overview

Are you tired of Discord's built-in GIF search being restricted, broken, or forcing you to use Giphy? **Bring Back Tenor** adds a dedicated, fully-functional Tenor GIF search panel directly into your Discord chat bar. 

It seamlessly integrates into the UI, and brings back the old Tenor that we used to love.

## Features

- **Direct Tenor Search**: Search Tenor's massive library of GIFs directly from the chat box.
- **Trending GIFs**: Automatically see trending GIFs when you open the panel.
- **Bypass Restrictions**: Uses internal Electron APIs to completely bypass CORS (Cross-Origin Resource Sharing) blocks that plague web-based GIF tools.
- **Auto-Embed Conversion**: Intelligently converts `.mp4` and `.webm` links back to `.gif` formats before sending, ensuring Discord automatically embeds the image rather than sending a video link.
- **Native Input Integration**: Uses Discord's rich text editor (Slate) via simulated clipboard pasting. This means GIFs send quickly, reliably, and without ghost text issues.
- **Auto-Updating**: Built-in support for BetterDiscord's plugin update system.

## Installation

1. Make sure you have [BetterDiscord](https://betterdiscord.app/) installed.
2. Download the latest `BringBackTenor.plugin.js` file from the [Releases](https://github.com/TheRealShieri/BringBackTenor/releases) or directly from the `main` branch.
3. Open Discord and go to **User Settings > Plugins**.
4. Click **Open Plugins Folder**.
5. Drop the `BringBackTenor.plugin.js` file into that folder.
6. Enable the plugin in your Discord Plugins settings.

## Usage

1. Look for the new **"GIF (T)"** button in your chat text area (next to the standard attachment/gift buttons).
2. Click it to toggle the Tenor Search Panel.
3. Type in a search term, or browse the initial trending results.
4. Click any GIF to instantly send it to the current channel.
   *(If direct sending fails, the plugin will automatically copy the link to your clipboard so you can just `Ctrl+V` and hit Enter).*

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/TheRealShieri/BringBackTenor/issues).

## License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

---
*Created by [TheRealShieri](https://github.com/TheRealShieri)*
