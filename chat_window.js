var Message;
Message = function (arg) {
    this.text = arg.text, this.message_side = arg.message_side;
    this.avatar_path = arg.avatar_path;
    this.draw = function (_this) {
        return function () {
            var $message;
            $message = $($('.message_template').clone().html());
            $message.addClass(_this.message_side).find('.text').html(_this.text);
            $message.find('.avatar').css('background-image', 'url(\"'+_this.avatar_path+'\")');
            $('.messages').append($message);
            return setTimeout(function () {
                return $message.addClass('appeared');
            }, 0);
        };
    }(this);
}

function getMemeSize(meme_path) {
    if (meme_path === "raw_resources/alfred_out.gif") {
        return [120, 90];
    } else if (meme_path === "raw_resources/draw_bath.gif") {
        return [120, 100];
    } else if (meme_path === "raw_resources/say_draw_bath.gif") {
        return [120, 100];
    } else if (meme_path === "raw_resources/too_old2care.gif") {
        return [120, 100];
    } else if (meme_path === "raw_resources/shake_head.gif") {
        return [120, 100];
    } else if (meme_path === "raw_resources/sum_total.gif") {
        return [120, 110];
    }
}

function sendMessage(text, avatar_path, side="left") {

    if (text.trim() === '') {
        console.log("[chat_window]: unable to send message without text");
        return;
    }

    if (!avatar_path) {
        console.log("[chat_window]: unable to send message without avatar");
        return;
    }

    if (side !== "left" && side !== "right") {
        console.log("[chat_window]: unable to send message without side");
        return;
    }

    var $messages, message;
    $('.message_input').val('');
    $messages = $('.messages');
    message = new Message({
        text: text,
        message_side: side,
        avatar_path: avatar_path
    });
    message.draw();
    return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
}

function sendMeme(meme_path) {

    console.log("[sendMeme]");

    let size = getMemeSize(meme_path);
    let style = `style='width:${size[0]}px;height:${size[1]}px'`;
    let avatar_path = "raw_resources/alfred_head_mod_2e6f85.jpg";

    var $message;
    $message = $($('.message_template').clone().html());

    $message.addClass("right").find('.text').append(`<img src=${meme_path} ${style}>`);
    $message.find('.avatar').css('background-image', 'url(\"'+avatar_path+'\")');
    $('.messages').append($message);
    setTimeout(function () {
        return $message.addClass('appeared');
    }, 0);

    $messages = $('.messages');
    return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
}

// (function () {
//     var Message;
//     Message = function (arg) {
//         this.text = arg.text, this.message_side = arg.message_side;
//         this.avatar_path = arg.avatar_path;
//         this.draw = function (_this) {
//             return function () {
//                 var $message;
//                 $message = $($('.message_template').clone().html());
//                 $message.addClass(_this.message_side).find('.text').html(_this.text);
//                 $message.find('.avatar').css('background-image', 'url(\"'+_this.avatar_path+'\")');
//                 $('.messages').append($message);
//                 return setTimeout(function () {
//                         return $message.addClass('appeared');
//                 }, 0);
//             };
//         }(this);
//         return this;
//     };
//     $(function () {
//         var getMessageText, message_side, sendMessageRight;
//         message_side = 'right';
//         getMessageText = function () {
//             var $message_input;
//             $message_input = $('.message_input');
//             return $message_input.val();
//         };
//         // sendMessageRight = function (text, avatar_path) {
//         //     var $messages, message;
//         //     if (text.trim() === '') {
//         //             return;
//         //     }
//         //     $('.message_input').val('');
//         //     $messages = $('.messages');
//         //     // message_side = message_side === 'left' ? 'right' : 'left';
//         //     message_side = 'right';
//         //     message = new Message({
//         //             text: text,
//         //             message_side: message_side,
//         //             avatar_path: avatar_path
//         //     });
//         //     message.draw();
//         //     console.log("scroll");
//         //     return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
//         // };
//         // sendMessageLeft = function (text, avatar_path) {
//         //     var $messages, message;
//         //     if (text.trim() === '') {
//         //             return;
//         //     }
//         //     $('.message_input').val('');
//         //     $messages = $('.messages');
//         //     // message_side = message_side === 'left' ? 'right' : 'left';
//         //     message_side = 'left';
//         //     message = new Message({
//         //             text: text,
//         //             message_side: message_side,
//         //             avatar_path: avatar_path
//         //     });
//         //     message.draw();
//         //     return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
//         // };
//         $('.send_message').click(function (e) {
//             sendMessage(getMessageText());

//         });
//         $('.message_input').keyup(function (e) {
//             if (e.which === 13) {
//                 sendMessage(getMessageText());
//             }
//         });

//         function sendMessage(str){
//             sendMessageRight(str, "lsl.png");
//             /*
//             var xhttp;
//             xhttp = new XMLHttpRequest();
//             xhttp.onreadystatechange = function() {
//                 if (this.readyState == 4 && this.status == 200) {
//                     sendMessageLeft(this.responseText);
//                 }
//             };
//             xhttp.open("GET", "getreply.php?message="+str, true);
//             xhttp.send();
//             */
//         }
//     });
// }.call(this));