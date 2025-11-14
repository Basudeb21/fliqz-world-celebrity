import { playSoundEffect } from "../components/framework/play-sound/playSoundEffect";

export function likePressSound() {
    playSoundEffect({ file: "react", extension: "mp3" });
}

export function subscibePressSound() {
    playSoundEffect({ file: "subscribe", extension: "mp3" });
}

export function followPressSounds() {
    playSoundEffect({ file: "follow", extension: "mp3" });
}

export function messageSendPressSounds() {
    playSoundEffect({ file: "sendmessage", extension: "mp3" });
}

export function paymentDoneSendPressSounds() {
    playSoundEffect({ file: "paymentdone", extension: "mp3" });
}

export function postDonePressSounds() {
    playSoundEffect({ file: "post", extension: "mp3" });
}