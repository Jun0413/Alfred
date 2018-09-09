let conv_handler = 0;

let sentences = [];

let lastTime;
let maxTime;

/*window.fbAsyncInit = function() {
    FB.init({
        appId            : '1291295337679065',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v3.1',
    });

    conv_handler = setInterval(_ => {
        FB.api(
            '/eventplanneralfred',
            'GET',
            {
                "fields":"conversations{messages{from,id,message,created_time}}",
                "access_token":'EAASWbRZCnCNkBAFJ5FBYZC7HfH6jtGSbMV5Yl6EbCKapcOJvYR6xDiYY92E4a5RM0Uimrge0g9cOfJ4SKpVyKQJnPgyyowA5FWZAc0MXcITE2cUZAWaAXyXpSkFsxGKIZCCZAhnTMiHTMjRHZAIcux8Lc0EZB4uIH1oGmxIeBpuZB7gZDZD'
            },
            function(response) {
                console.log("[page response]");
                console.log(response);

                while (sentences.length != 0) {
                    sentences.pop();
                }

                for (const conv of response.conversations.data) {
                    for (const data of conv.messages.data) {
                        let created_time = Date.parse(data.created_time);
                        if (created_time <= lastTime) {
                            continue;
                        }
                        if (created_time > maxTime) {
                            maxTime = created_time;
                        }
                        let from = data.from.name;
                        let message = data.message;
                        sentences.push({
                            created_time: data.created_time,
                            from: from,
                            message: message
                        });
                    }
                }

                console.log(sentences);

                lastTime = maxTime;

                for (const sentence of sentences) {

                    let from = sentence.from;
                    let message = sentence.message;

                    if (from === "Alfred") {
                        sendMessage(message, "raw_resources/alfred_head_mod_2e6f85.jpg", "right");
                    } else if (from === "Junhao Zeng") {
                        // sendMessage(message, "zjh.png");
                        sendMessage(message, "lsl.png");
                    } else if (from === "Jason Ren") {
                        // sendMessage(message, "rjw.png");
                        sendMessage(message, "lsl.png");
                    } else if (from === "Shi Ganyu") {
                        // sendMessage(message, "sgy.png");
                        sendMessage(message, "lsl.png");
                    } else if (from === "Huang Zhilin"){
                        // sendMessage(message, "hzl.png");
                        sendMessage(message, "lsl.png");
                    } else if (from === "Lanlan Lim") {
                        sendMessage(message, "lsl.png");
                    }
                }

                // let messages = response.conversations.data[0].messages.data;
            }
        );
    }, 2000);

    setTimeout(_ => {
        this.clearInterval(conv_handler);
        conv_handler = 0;
    }, 5 * 60 * 1000);

    lastTime = Date.now();
    console.log("[initTime]: ", lastTime);
    maxTime = lastTime;
};

(function(d, s, id){
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) {return;}
js = d.createElement(s); js.id = id;
js.src = "https://connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));*/