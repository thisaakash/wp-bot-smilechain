const fs = require("fs");
const {
  Client,
  LocalAuth,
  Buttons,
  MessageMedia,
  optionsButtonMessage,
  List,
} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const axios = require("axios");
const http = require("http");
const figlet = require("figlet");
const https = require("https");

const client = new Client({ 
   puppeteer: { 
     headless: true, 
     executablePath: '/usr/bin/google-chrome-stable', 
   }, 
   authStrategy: new LocalAuth() 
 });

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  if (message.type == "buttons_response") {
    if (message.selectedButtonId == "one") {
      let button = new Buttons(
        "*",
        [
          { id: "node", body: "Node Api" },
          { id: "php", body: "Php Api" },
          { id: "back1", body: "Back" },
        ],
        "Which Api Status ?",
        "Smilechain"
      );
      await client.sendMessage(message.from, button);
    }

    if (message.selectedButtonId == "two") {
      const apiUrl = "http://3.110.195.26";
      axios
        .get(`${apiUrl}/total`)
        .then((response) => {
          console.log("data>>>>", response.data);
          const urll = response.data.data.total_users;
          console.log(urll);

          let msg = "Hey Admin !! We Have Total " + urll + " Users";

          let button = new Buttons(
            msg,
            [{ id: "back1", body: "Back" }],
            "User Count !",
            "Smilechain"
          );
          client.sendMessage(message.from, button);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (message.selectedButtonId == "three") {
      client.sendMessage(message.from, "Enter Username {!user aakash}");
    }

    if (message.selectedButtonId == "back1") {
      let button = new Buttons(
        "*",
        [
          { id: "one", body: "Server Status" },
          { id: "two", body: "Total Users" },
          { id: "three", body: "Users" },
        ],
        "Welcome Admin!!!!",
        "Smilechain"
      );
      await client.sendMessage(message.from, button);
    }

    if (message.selectedButtonId == "back2") {
      let button = new Buttons(
        "*",
        [
          { id: "node", body: "Node Api" },
          { id: "php", body: "Php Api" },
          { id: "back1", body: "Back" },
        ],
        "Which Api Status ?",
        "Smilechain"
      );
      await client.sendMessage(message.from, button);
    }

    if (message.selectedButtonId.startsWith("!followers")) {
      const username = message.selectedButtonId.split("!followers ")[1];
      const apiUrl = "http://3.110.195.26";
      console.log("Username>", username);
      axios
        .get(`${apiUrl}/follower/?username=${encodeURIComponent(username)}`)
        .then(async (response) => {
          console.log(response.data.data);
          let userFriends = response.data.data.map(
            (friend) => friend.user_friends
          );

          // Create table
          let table =
            "+----------------------+\n" +
            "|      User Followers     |\n" +
            "+----------------------+\n";

          // Add each user friend to the table
          for (let i = 0; i < userFriends.length; i++) {
            table += "| " + userFriends[i].padEnd(30) + " |\n";
          }

          // Close table
          table += "+----------------------+";

          console.log(table);
          // Send table as message
          // const chatId = '919876543210@c.us'; // Replace with your own WhatsApp number
          client.sendMessage(message.from, table);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (message.selectedButtonId.startsWith("!followings")) {
      const username = message.selectedButtonId.split("!followings ")[1];
      const apiUrl = "http://3.110.195.26";
      console.log("Username>", username);
      axios
        .get(`${apiUrl}/following/?username=${encodeURIComponent(username)}`)
        .then(async (response) => {
          console.log(response.data.data);
          let userFriends = response.data.data.map(
            (friend) => friend.user_friends
          );

          // Create table
          let table =
            "+----------------------+\n" +
            "|      User Following     |\n" +
            "+----------------------+\n";

          // Add each user friend to the table
          for (let i = 0; i < userFriends.length; i++) {
            table += "| " + userFriends[i].padEnd(30) + " |\n";
          }

          // Close table
          table += "+----------------------+";

          console.log(table);
          // Send table as message
          // const chatId = '919876543210@c.us'; // Replace with your own WhatsApp number
          client.sendMessage(message.from, table);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  if (message.type == "list_response") {
    console.log(message.selectedRowId);
  }

  function one() {
    message.reply("pong");
  }

  function status() {
    let button = new Buttons(
      "*",
      [
        { id: "node", body: "Node Api" },
        { id: "php", body: "Php Api" },
        { id: "exit", body: "EXIT" },
      ],
      "Which Api Status ?",
      "Smilechain"
    );
    client.sendMessage(message.from, button);
  }

  function status_node() {
    axios
      .get("http://3.108.191.191")
      .then((response) => {
        t = response.status;
        if (t === 200) {
          const msg = "🟢 Live";
          let button = new Buttons(
            msg,
            [{ id: "back2", body: "Back" }],
            "Node Api Status !",
            "Smilechain"
          );
          client.sendMessage(message.from, button);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function status_php() {
    axios
      .get("http://3.110.195.26")
      .then((response) => {
        t = response.status;
        if (t === 200) {
          const msg = "🟢 Live";
          let button = new Buttons(
            msg,
            [{ id: "back2", body: "Back" }],
            "Php Api Status !",
            "Smilechain"
          );
          client.sendMessage(message.from, button);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function ban_email() {
    client.sendMessage(message.from, "Send Username TO Ban Send Email {!ban aakash}");
  }

  function exit_message() {
    client.sendMessage(message.from, "Exited Successfully 😃");
  }

  const restrictedNumber = "918866172310";
  if (message.from === `${restrictedNumber}@c.us`) 
  {
    if (message.body.startsWith("!ban")) {
      const username = message.body.split("!ban ")[1];
      const apiUrl = "http://3.110.195.26";
      axios
        .get(`${apiUrl}?username=${encodeURIComponent(username)}`)
        .then(async (response) => {
          const user_name = response.data.data[0].username;
          const email = response.data.data[0].email;
          const u = "http://3.108.191.191:3000/mail_report?email="+email+"&username="+user_name;
          console.log(u);
          axios.get(u);

          const u2 = "http://3.110.195.26/ban/add.php?username="+user_name;
          axios.get(u2);
          
          client.sendMessage(message.from," User Banned !");
         })
    }

    if (message.body.startsWith("!unban")) {
      const username = message.body.split("!unban ")[1];
      const apiUrl = "http://3.110.195.26";
      axios
        .get(`${apiUrl}?username=${encodeURIComponent(username)}`)
        .then(async (response) => {
          const user_name = response.data.data[0].username;
          const email = response.data.data[0].email;
          const u = "http://3.108.191.191:3000/mail_report?email="+email+"&username="+user_name;
          console.log(u);
          axios.get(u);

          const u2 = "http://3.110.195.26/ban/remove.php?username="+user_name;
          axios.get(u2);
          client.sendMessage(message.from," User Unbanned !");
          
         })
    }

    if (message.body.startsWith("!user")) {
      const username = message.body.split("!user ")[1];
      const apiUrl = "http://3.110.195.26";
      axios
        .get(`${apiUrl}?username=${encodeURIComponent(username)}`)
        .then(async (response) => {
          const table = [
            ["Username", response.data.data[0].username],
            ["Followers", response.data.followers],
            ["Following", response.data.following],
            ["NFT", response.data.nftcount],
            ["Name", response.data.data[0].name],
            ["Email", response.data.data[0].email],
            ["Bio", response.data.data[0].bio],
            ["Public Address", response.data.data[0].public_address],
            ["Joined", response.data.data[0].joined],
            [
              "User Verified?",
              response.data.data[0].emailVerified === "1" ? "💚" : "💔",
            ],
            [
              "User Banned?",
              response.data.data[0].isValid === "1" ? "💚" : "💔",
            ],
          ];

          let messageText = "```\n"; // start the message text with triple backticks for code formatting

          // iterate over each row in the table
          for (let i = 0; i < table.length; i++) {
            // add a horizontal line above the first row and after each row
            if (i === 0 || i === table.length - 1) {
              messageText += "-------------------------------\n";
            }
            // add the row data to the message text with a separator pipe character
            messageText += `| ${table[i][0]}: ${table[i][1]}\n`;
          }

          messageText += "```"; // end the message text with triple backticks

          // send the message using whatsappwebjs
          let fid = "!followers " + response.data.data[0].username;
          let foid = "!followings " + response.data.data[0].username;

          let button = new Buttons(
            messageText,
            [
              { id: fid, body: "User Followers" },
              { id: foid, body: "User Followings" },
              { id: "back1", body: "Back" },
            ],
            "User Info ",
            "Smilechain"
          );
          await client.sendMessage(message.from, button);
        })
        .catch((error) => {
          console.error(error);
        });
      // message.reply(username);
    }

    if (
      message.body.startsWith("!title") &&
      message.body.includes("!msg") &&
      message.body.includes("!img")
    ) {
      // Extract the title, message text, and image link from the message
      const parts = message.body.split("!title ")[1].split("!msg ");
      const title = parts[0].trim();
      const messageText = parts[1].split("!img ")[0].trim();
      const imageLink = parts[1].split("!img ")[1].trim();

      // Send the notification
      const fcmToken =
        "d32phRYnS_-nMr-B51cmcD:APA91bG6l7lyvhM-UeoTGFTXYqVMrDD8EjX-pzc4ju_QsGxdm-votkZqh9_8u8_fMr5FyXvuVSyYkM0wbOyc5d2HQWFVFt6MmFYkX1NZv03ZQEYJbvButKA5xnZ6kw85GjR5C5Au9lYf";

      const notification = {
        title: title,
        body: messageText,
        image: imageLink,
      };

      const options = {
        hostname: "fcm.googleapis.com",
        path: "/fcm/send",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer AAAA9O19Hsg:APA91bGu0UGwvMsN0C5KCSmlIiQrZeCrLFsAI_gEjuqiueos0O7ZeLNuIwfBeZzl5YuXTZghRFTyxKlDUFIHHEdXA_yqfPq6dZxSFgNuQBrj-zYENY8ZEOjbWy2QiQMInYRggG6zlbZU",
        },
      };

      const requestBody = {
        to: fcmToken,
        notification,
      };

      const request = https.request(options, (response) => {
        console.log("FCM response status code:", response.statusCode);

        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          const status = data.sucess ? "❌ Error " : " ✅ Sent Sucessfully";
          const formattedMessage = `*${status}*\n*${title}*\n${messageText}\n\n🖼️ Image: ${imageLink}`;
          client.sendMessage(message.from, formattedMessage);
        });
      });

      request.on("error", (error) => {
        console.error("Error sending FCM notification:", error);
      });

      request.write(JSON.stringify(requestBody));
      request.end();
    }

    if(message.body.startsWith)

    if (message.body === "!start") {
      var rows = [];
      rows.push({ id: "a1", title: "Server Status" });
      rows.push({ id: "a2", title: "Stats" });
      rows.push({ id: "a3", title: "User Info" });
      rows.push({ id: "b1", title: "Send BAN Email" });
      rows.push({ id: "n1", title: "Send Notification" });
      rows.push({ id: "a4", title: "User Followers" });
      rows.push({ id: "a5", title: "User Following" });
      rows.push({ id: "a6", title: "User NFT" });

      let obj = new List(
        "A",
        "B",
        [
          {
            title: "Options",
            rows,
          },
        ],
        "C"
      );
      await client.sendMessage(message.from, obj);
    }
    if (message.type == "list_response") {
      console.log("Res >>>>", message.selectedRowId);

      if (message.selectedRowId === "a1") {
        status();
      }
      if (message.selectedRowId === "b1") {
        ban_email();
      }
      if (message.selectedRowId === "n1") {
        status();
      }
    }

    if (message.type == "buttons_response") {
      console.log("Res >>>>", message.selectedButtonId);
      if (message.selectedButtonId === "exit") {
        exit_message();
      }
      if (message.selectedButtonId === "node") {
        status_node();
      }
      if (message.selectedButtonId === "php") {
        status_php();
      }
    }

    if (message.body === "!ping") {
      one();
    }

    if (message.body === "!btn") {
      let button = new Buttons(
        "textmsgfinal",
        [
          { id: "vN5UJq", body: "Boton1" },
          { id: "Qf8v0k", body: "Boton2" },
          { id: "MY7ZWP", body: "Boton3" },
        ],
        "Titulo",
        "Pie"
      );
      await client.sendMessage(message.from, button);
    }

    if (message.body === "!admin") {
      let button = new Buttons(
        "*",
        [
          { id: "one", body: "Server Status" },
          { id: "two", body: "Total Users" },
          { id: "three", body: "User Info" },
        ],
        "Welcome Admin!!!!",
        "Smilechain"
      );
      await client.sendMessage(message.from, button);
    }

    if (message.body === "!list") {
      var rows = [];
      rows.push({ id: "1", title: "⭐" });
      rows.push({ id: "2", title: "⭐⭐" });
      rows.push({ id: "3", title: "⭐⭐⭐" });
      rows.push({ id: "4", title: "⭐⭐⭐⭐" });
      rows.push({ id: "5", title: "⭐⭐⭐⭐⭐" });

      let obj = new List(
        "Select from here ",
        "Rate Us",
        [
          {
            title: "Rate Us",
            rows,
          },
        ],
        "Please rate our services ?"
      );
      await client.sendMessage(message.from, obj);
      console.log(message.type);
    }

    if (message.body === "!more") {
      var rows = [];
      rows.push({ id: "1", title: "User Nft" });
      rows.push({ id: "2", title: "User Report" });
      rows.push({ id: "3", title: "User Contact" });
      rows.push({ id: "4", title: "User Review" });
      let obj = new List(
        "Select from here ",
        "Select One",
        [
          {
            title: "Commands",
            rows,
          },
        ],
        "Smilechain"
      );
      await client.sendMessage(message.from, obj);
      console.log(message.type);
    }

    if (message.body.startsWith("!song")) {
      const apiUrl = "https://jiosaavn-api.vercel.app";
      // Extract the song name from the message
      const songName = message.body.split("!song ")[1];

      axios
        .get(`${apiUrl}/song?id=${encodeURIComponent(songName)}`)
        .then((response) => {
          //   console.log("Response Data >>>>",response.data.media_url);
          const urll = response.data.media_url;

          const asciiText = new Promise((resolve, reject) => {
            figlet.text("Hello World!", (error, data) => {
              if (error) {
                reject(error);
              } else {
                resolve(data);
              }
            });
          });
          const phoneNumber = "1234567890@c.us";

          // Send message with ASCII art to specified phone number
          client.sendMessage(phoneNumber, asciiText);

          message.reply(urll);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (message.body.startsWith("!status")) {
      axios
        .get("http://3.110.195.26")
        .then((response) => {
          const t = response.status;
          if (t === 200) {
            message.reply("🟢 PHP API LIVE");
          }
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .get("http://3.108.191.191")
        .then((response) => {
          t = response.status;
          if (t === 200) {
            message.reply("🟢 NODE API LIVE");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (message.body == "!tt") {
      message.dynamicReplyButtons("hi");
    }

    if (message.body.startsWith("!spics")) {
      const date = message.body.split("!spics ")[1];
      const apiUrl = "https://salangpurhanumanji.vercel.app/img";
      axios
        .get(`${apiUrl}?date=${encodeURIComponent(date)}`)
        .then(async (response) => {
          console.log(`${apiUrl}?date=${encodeURIComponent(date)}`);
          console.log("data>>>>", response.data[1]);
          const media = await MessageMedia.fromUrl(response.data[1]);
          await client.sendMessage(message.from, media);
          const media2 = await MessageMedia.fromUrl(response.data[2]);
          await client.sendMessage(message.from, media2);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (message.body === "!total") {
  const apiUrl = "http://3.110.195.26";
  axios
    .get(`${apiUrl}/total`)
    .then((response) => {
      console.log("data>>>>", response.data);
      const totalUsers = response.data.data.total_users;
      const lastFiveUsers = response.data.data.last_five_users;

      // Create a table with the last 5 users

       let border = "```"; // Add triple backticks to create a code block in WhatsApp
      let table = `╔═════════════════════╦══════════════════════╗\n`;
         table += `║  Username           ║      Joined          ║\n`;
         table += `╠═════════════════════╬══════════════════════╣\n`;

      lastFiveUsers.forEach((user) => {
        let joinedDate = new Date(user.joined);
        let currentDate = new Date();
        let timeDiff = Math.abs(currentDate.getTime() - joinedDate.getTime());
        let diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        let diffHours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
        let diffMinutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
        let diffSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        let joinedString =
          diffDays > 0
            ? diffDays + " day" + (diffDays > 1 ? "s" : "") + " ago"
            : diffHours > 0
            ? diffHours + " hour" + (diffHours > 1 ? "s" : "") + " ago"
: diffMinutes > 0
? diffMinutes + " minute" + (diffMinutes > 1 ? "s" : "") + " ago"
: diffSeconds + " second" + (diffSeconds > 1 ? "s" : "") + " ago";

table += `║  ${user.username.padEnd(17)}  ║  ${joinedString.padEnd(20)}║\n`;
  });

  table += `╚═════════════════════╩══════════════════════╝`;

  // Send the message with the total number of users and the last 5 users table
  client.sendMessage(
    message.from,
    `${border}\nTotal users: ${totalUsers}\n\nLast 5 users:\n${table}\n${border}`
  );
})
.catch((error) => {
  console.log(error);
  client.sendMessage(
    message.from,
    "Error getting the total number of users. Please try again later."
  );
});
    }


    if (message.body.startsWith("!user")) {
      const username = message.body.split("!user ")[1];
      const apiUrl = "http://3.110.195.26";
      axios
        .get(`${apiUrl}?username=${encodeURIComponent(username)}`)
        .then(async (response) => {
          // const response2 = await axios.get(response.data.data[0].img, { responseType: 'arraybuffer' });
          // const imageBuffer = Buffer.from(response2.data, 'binary');
          // const message2= new MessageMedia('image/png', imageBuffer);
          // client.sendMessage(message.from, message2);
          const table = [
            ["Username", response.data.data[0].username],
            ["Followers", response.data.followers],
            ["Following", response.data.following],
            ["NFT", response.data.nftcount],
            ["Name", response.data.data[0].name],
            ["Email", response.data.data[0].email],
            ["Bio", response.data.data[0].bio],
            ["Public Address", response.data.data[0].public_address],
            ["Joined", response.data.data[0].joined],
            [
              "User Verified?",
              response.data.data[0].emailVerified === "1" ? "💚" : "💔",
            ],
          ];

          let messageText = "```\n"; // start the message text with triple backticks for code formatting

          // iterate over each row in the table
          for (let i = 0; i < table.length; i++) {
            // add a horizontal line above the first row and after each row
            if (i === 0 || i === table.length - 1) {
              messageText += "-------------------------------\n";
            }
            // add the row data to the message text with a separator pipe character
            messageText += `| ${table[i][0]}: ${table[i][1]}\n`;
          }

          messageText += "```"; // end the message text with triple backticks

          // send the message using whatsappwebjs
          let fid = "!followers " + response.data.data[0].username;
          let foid = "!followings " + response.data.data[0].username;

          let button = new Buttons(
            messageText,
            [
              { id: fid, body: "User Followers" },
              { id: foid, body: "User Followings" },
              { id: "back1", body: "Back" },
            ],
            "User Info ",
            "Smilechain"
          );
          await client.sendMessage(message.from, button);
        })
        .catch((error) => {
          console.error(error);
        });
      // message.reply(username);
    }

    // if(message.body.startsWith("!u")){
    //   let button = new Buttons(
    //     '*',
    //     [
    //         { id: 'us1', body: 'User Info'},
    //         { id: 'us2', body: 'User Followers' },
    //         { id: 'us3', body: 'User Followings' },
    //         { id: 'us4', body: 'User NFT' },
    //         { id: 'us5', body: 'User Contact Record' }
    //     ],
    //     'Please Select ',
    //     'Smilechain');
    //   await client.sendMessage(message.from, button);
    // }

    // if (message.body.startsWith("!u")) {
    //   const username = message.body.split("!u ")[1];
    //   const apiUrl = "http://3.110.195.26";
    //   axios
    //     .get(`${apiUrl}?username=${encodeURIComponent(username)}`)
    //     .then(async (response) => {
    //       // const response2 = await axios.get(response.data.data[0].img, { responseType: 'arraybuffer' });
    //       // const imageBuffer = Buffer.from(response2.data, 'binary');
    //       // const message2= new MessageMedia('image/png', imageBuffer);
    //       // client.sendMessage(message.from, message2);
    //       const table = [
    //         ["Username", response.data.data[0].username],
    //         ["Followers", response.data.followers],
    //         ["Following", response.data.following],
    //         ["NFT", response.data.nftcount],
    //         ["Name", response.data.data[0].name],
    //         ["Email", response.data.data[0].email],
    //         ["Bio", response.data.data[0].bio],
    //         ["Public Address", response.data.data[0].public_address],
    //         ["Joined", response.data.data[0].joined],
    //         [
    //           "User Verified?",
    //           response.data.data[0].emailVerified === "1" ? "💚" : "💔",
    //         ],
    //       ];

    //       let messageText = "```\n"; // start the message text with triple backticks for code formatting

    //       // iterate over each row in the table
    //       for (let i = 0; i < table.length; i++) {
    //         // add a horizontal line above the first row and after each row
    //         if (i === 0 || i === table.length - 1) {
    //           messageText += "-------------------------------\n";
    //         }
    //         // add the row data to the message text with a separator pipe character
    //         messageText += `| ${table[i][0]}: ${table[i][1]}\n`;
    //       }

    //       messageText += "```"; // end the message text with triple backticks

    //       let fid = '!followers '+response.data.data[0].username;
    //       let foid = '!followings '+response.data.data[0].username;

    //       let button = new Buttons(
    //         messageText,
    //         [
    //             { id: fid, body: 'Followers' },
    //             { id: foid, body: 'Following' }
    //         ],
    //         'User Info',
    //         'SmileChain');
    //       await client.sendMessage(message.from, button);

    //       // send the message using whatsappwebjs
    //       // client.sendMessage(message.from, messageText);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    //   // message.reply(username);
    // }

    if (message.body.startsWith("!followers ")) {
      const username = message.body.split("!followers ")[1];
      const apiUrl = "http://3.110.195.26";
      axios
        .get(`${apiUrl}/follower/?username=${encodeURIComponent(username)}`)
        .then(async (response) => {
          let userFriends = response.data.data.map(
            (friend) => friend.user_friends
          );

          // Create table
          let table =
            "+----------------------+\n" +
            "|      User Followers     |\n" +
            "+----------------------+\n";

          // Add each user friend to the table
          for (let i = 0; i < userFriends.length; i++) {
            table += "| " + userFriends[i].padEnd(30) + " |\n";
          }

          // Close table
          table += "+----------------------+";

          console.log(table);
          // Send table as message
          // const chatId = '919876543210@c.us'; // Replace with your own WhatsApp number
          client.sendMessage(message.from, table);
        })
        .catch((error) => {
          console.error(error);
        });
      // message.reply(username);
    }

    if (message.body.startsWith("!followings ")) {
      const username = message.body.split("!followings ")[1];
      const apiUrl = "http://3.110.195.26";
      axios
        .get(`${apiUrl}/following/?username=${encodeURIComponent(username)}`)
        .then(async (response) => {
          console.log(response);
          let userFriends = response.data.data.map(
            (friend) => friend.user_friends
          );

          // Create table
          let table =
            "+----------------------+\n" +
            "|      User Followings     |\n" +
            "+----------------------+\n";

          // Add each user friend to the table
          for (let i = 0; i < userFriends.length; i++) {
            table += "| " + userFriends[i].padEnd(30) + " |\n";
          }

          // Close table
          table += "+----------------------+";

          console.log(table);
          // Send table as message
          // const chatId = '919876543210@c.us'; // Replace with your own WhatsApp number
          client.sendMessage(message.from, table);
        })
        .catch((error) => {
          console.error(error);
        });
      // message.reply(username);
    }
  }
});

client.initialize();
