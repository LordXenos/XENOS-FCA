<div align="center">

# XENOS-FCA

**The most advanced & reliable Facebook Messenger API for Node.js**  
Build powerful, real-time Messenger bots with enterprise-grade stability & rich features.

<br>


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br>

</div>

<div align="center">
  
## ✨ Why XENOS-FCA?

Modern • Fast • Reliable • Feature-rich

- Real-time messaging via **MQTT**
- Full support for **attachments, reactions, edits, mentions**
- Smart **auto-reconnect**, **proxy support**, **exponential backoff**
- Beautiful **plugin & middleware system**
- Webhook forwarding, custom logging, performance monitoring
- Thread customization, admin tools, story & comment interactions

<br>
</div>

<div align="center">

## 🚀 Quick Start in 60 seconds

1. **Install**

```bash
npm install xenos-fca
# or
bun add xenos-fca
# or
pnpm add xenos-fca
```

### *Export Facebook cookies*

**Use “EditThisCookie” or “Cookie-Editor”**
**export as JSON → save as appstate.json**

**Minimal bot example**
```
import fs from 'fs';
import { login } from 'xenos-fca';

const appState = JSON.parse(fs.readFileSync('appstate.json', 'utf8'));

login({ appState }, {
  online: true,
  listenEvents: true,
  autoMarkRead: true,
  selfListen: false
}, (err, api) => {
  if (err) return console.error('Login failed →', err);

  console.log('🚀 XENOS-FCA is online!');

  api.listenMqtt((err, event) => {
    if (err) return;

    if (event.type === 'message' && event.body?.trim()) {
      console.log(`[${event.senderID}] → ${event.body}`);

      if (event.body.toLowerCase() === '/ping') {
        api.sendMessage('🏓 Pong!', event.threadID);
      }
    }
  });
});

```
---

# 🌟 Feature Overview

**📨 Messaging Core**

- ### Real-time send/receive (MQTT)
- ### Edit sent messages
- ### Add/remove reactions
- ### Typing indicators
- ### Location sharing
- ### Rich mentions (@user)
- ### Images, videos, audio, stickers, files

______

**🧵 Thread & Group Controls**

- ### Thread info & participant list
- ### Message history
- ### Pin important messages
- ### Change group name, emoji, theme
- ### Add/remove members & admins
- ### Mute / unmute notifications
____

**⚡ Performance & Reliability**

- ### Smart caching layer
- ### Request debouncing
- ### Connection health monitoring
- ### Exponential backoff reconnect
- ### Auto session validation
- ### Proxy (HTTP/HTTPS/SOCKS) support
- ### Detailed performance metrics
____

**🔌 Extensibility**

- ### Powerful plugin system
- ### Middleware chain
- ### External webhook forwarding
- ### Advanced configurable logging
- ### Custom event filtering

____

**👥 Social & Discovery Features**

- ### Detailed user profiles
- ### Reply & react to Stories
- ### Comment on posts
- ### Share content to timeline
- ### Send / manage friend requests
- ### Follow / unfollow users

____

## 🛠️ Configuration (most used options)
```
login({ appState }, {
login({ appState }, {
  // Connection behavior
  online: true,
  selfListen: false,
  listenEvents: true,
  autoMarkRead: true,
  autoReconnect: true,

  // Proxy (optional)
  proxy: 'http://user:pass@1.2.3.4:8080',

  // Webhook (optional)
  webhook: {
    enabled: true,
    url: 'https://your-server.com/events',
    events: ['message', 'reaction', 'event'],
    secret: 'my-very-secret-key'
  },

  // Logging
  logger: customLoggerInstance
}, callback);

```
___

## 📚 Popular Snippets

### 🪝 Webhook forwarding
```
webhook: {
  enabled: true,
  url: 'https://your.app/webhook',
  events: ['message', 'reaction', 'typ', 'read_receipt'],
  secret: process.env.WEBHOOK_SECRET
}
```

### 📊 Custom colored & file logging
```
import { Logger } from 'xenos-fca';

const logger = new Logger({
  level: 'debug',
  enableFile: true,
  logFilePath: './logs/bot-2026.log',
  colorize: true,
  timestamp: true
});

login({ appState }, { logger }, ...);
```

### 🔌 Simple command plugin
```
const commandPlugin = {
  name: 'commands',
  commands: new Map(),
  addCommand(name, fn) { this.commands.set(name, fn); },
  async execute(message) {
    if (!message.body?.startsWith('/')) return;
    const [cmd, ...args] = message.body.slice(1).split(' ');
    const handler = this.commands.get(cmd);
    if (handler) await handler({ api, message, args });
  }
};

api.plugins.register('commands', commandPlugin);

commandPlugin.addCommand('help', ({ api, message }) => {
  api.sendMessage('Commands: /ping, /help, /info', message.threadID);
});

```


## 📖 Important API Methods
```
api.sendMessage("Hello world", threadID);
api.sendMessage({ body: "Image + text", attachment: fs.createReadStream("cat.jpg") }, threadID);

api.getThreadInfo(threadID, (err, info) => { ... });
api.getUserInfo(userID, (err, user) => { ... });

api.listenMqtt((err, event) => { ... });
```

</div>

___

<div align="center">
  <br>
  
##  📦 Made with ❤️ by XENOS
###  GitHub: @LordXenos
###  Repository: Xenos-Fca
###  Give it a ⭐ if it helps your project!
## MIT License © 2026 XENOS

<br>
</div>
