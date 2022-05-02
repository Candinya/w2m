# W2M

> Webhook (on Cloudflare Workers) to Matrix instant messages

## Why this project?

1. I'm setting up notifications for my NAS;
2. It doesn't suppport native Matrix notifications;
3. The custom settings is not enough to handle such specific notification settings;
4. So I wrote this tiny middleware.

## Request structure

- Method: `POST`
- Content-Type: `application/json`
- Body:

``` json
{
  "homeserver": "YOUR_HOMESERVER_URL",
  "token": "YOUR_ACCESS_TOKEN",
  "room": "YOUR_ROOM_INTERNAL_ID",
  "msg": "MESSAGE_TO_SEND"
}
```

## Prerequisites

1. **DISABLE** encryption in your notification room cause it's too difficult for a bot to handle it :(
2. Use a bot account, rather than your own account, for safety concerns.
