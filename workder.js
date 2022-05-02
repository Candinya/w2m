const randStrSize = 20;

const passMsg2Matrix = async (homeserverUrl, accessToken, internalRoomId, msg) => {

  const randBuf = crypto.getRandomValues(new Int8Array(randStrSize));
  const randStr = encodeURIComponent(
      randBuf
        .toString("base64")
        .slice(0, randStrSize)
  );

  const roomId = encodeURIComponent(internalRoomId);
  
  const data = {
    body: JSON.stringify({
      "msgtype": "m.text",
      "body": msg
    }),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${accessToken}`,
    },
  };

  const response = await fetch(`${homeserverUrl}/_matrix/client/r0/rooms/${roomId}/send/m.room.message/${randStr}`, data);

  return response;
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method !== "POST") {
    return new Response("Should only be POST requests", {
      status: 400,
      statusText: "Invalid request method",
    });
  }
  try {
    const { homeserver, room, token, msg } = await request.json();
    return passMsg2Matrix(homeserver, token, room, msg);
  } catch (e) {
    return new Response("Invalid params", {
      status: 400,
      statusText: "Failed to parse params",
    });
  }
}
