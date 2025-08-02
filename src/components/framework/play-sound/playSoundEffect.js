import SoundPlayer from 'react-native-sound-player';

export const playSoundEffect = ({ file, extension }) => {

    try {
        SoundPlayer.playSoundFile(file, extension);
    } catch (e) {
        console.log(`Cannot play the sound file`, e);
    }
};
