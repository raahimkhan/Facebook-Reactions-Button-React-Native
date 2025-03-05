import { Audio } from 'expo-av';

export const PlaySound = async (sound: React.RefObject<Audio.Sound>) => {
    try {
        if (sound && sound.current) {
            await sound.current.unloadAsync();
            await sound.current.loadAsync(require("../assets/reactionAudios/toggleLikeSoundEffect.mp3"));
            await sound.current.playAsync();
        }
    } catch (error) {}
};
