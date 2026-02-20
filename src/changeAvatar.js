"use strict";

var utils = require("./utils");
// @MaybeXenos
/**
 * It posts an image to a Facebook profile
 * @param Api - The API object
 * @param BotID - The ID of the bot you want to post the image to.
 * @param form - The form data that you want to send.
 * @returns The JSON.parse(Data.split("for (;;);")[1]); is returning the following:
 * {"__ar":1,"payload":null,"jsmods":{"require":[["ImageUploader","uploadPhoto",[{"__m":"__elem_0"},{"__m":"__elem_1"},{"__m":"__elem_2"},{"__m":"__
 */
async function postImage(Api, BotID, form) {
    var Data = await Api.httpPostFormData(`https://www.facebook.com/profile/picture/upload/?profile_id=${BotID}&photo_source=57&av=${BotID}`, form);
    return JSON.parse(Data.split("for (;;);")[1]);
}

module.exports = function(defaultFuncs, api, ctx) {
/* Changing the profile picture of the bot. */
    return function changeAvt(link, caption, callback) {
        var resolveFunc = function() {};
        var rejectFunc = function() {};
        var returnPromise = new Promise(function(resolve, reject) {
            resolveFunc = resolve;
            rejectFunc = reject;
        });

        if (!callback) {
            callback = function(err, data) {
                if (err) return rejectFunc(err);
                resolveFunc(data);
            };
        }
        try {
            var Fetch = require('axios')
            Fetch.get(link, { 
                responseType: "arraybuffer",
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Referer': 'https://www.facebook.com/',
                    'Sec-Fetch-Dest': 'image',
                    'Sec-Fetch-Mode': 'no-cors',
                    'Sec-Fetch-Site': 'cross-site'
                }
            }).then(data => { 
                const imageBuffer = Buffer.from(data.data);
                const stream = require("stream");
                const bufferStream = new stream.PassThrough();
                bufferStream.end(imageBuffer);
                // @ts-ignore
                bufferStream.path = "avatar.jpg";
                
                postImage(api, ctx.userID, { "f_id": ctx.userID, "file": bufferStream }).then(data => {
                    if (!data || data.error || (data.payload && data.payload.error)) {
                        return callback(data || { error: "Upload failed" });
                    }
                    var form = {
                        av: ctx.userID,
                            fb_api_req_friendly_name: "ProfileCometProfilePictureSetMutation",
                            fb_api_caller_class: "RelayModern",
                            doc_id: "5066134240065849",
                            variables: JSON.stringify({
                                input: {
                                    caption: (caption || ""),
                                    existing_photo_id: data.payload.fbid,
                                    expiration_time: null,
                                    profile_id: ctx.userID,
                                    profile_pic_method: "EXISTING",
                                    profile_pic_source: "TIMELINE",
                                scaled_crop_rect: {
                                    height: 1,
                                    width: 1,
                                    x: 0,
                                    y: 0
                                },
                                skip_cropping: true,
                                actor_id: ctx.userID,
                                client_mutation_id: Math.round(Math.random() * 19).toString()
                                }
                        })
                    };
                    defaultFuncs
                        .post("https://www.facebook.com/api/graphql/", ctx.jar, form)
                        .then(utils.parseAndCheckLogin(ctx, defaultFuncs))
                        .then(function(resData) {
                            if (resData.errors || resData.error) return callback(resData.errors || resData.error);
                            return callback(null, true);
                        })
                        .catch(function(err) {
                            return callback(err);
                        });
                }).catch(err => callback(err));
            }).catch(err => callback(err));
        }
        catch (e) {
            callback(e);
        }
        return returnPromise;
    };

};
