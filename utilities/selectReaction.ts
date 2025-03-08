import { Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Reaction } from '@interfaces/reaction';
import { PlaySound } from '@utilities/playSound';
import { Audio } from 'expo-av';

export const SelectReaction = async (
    reaction: Reaction,
    setReaction: React.Dispatch<React.SetStateAction<Reaction>>,
    isMutedRef: React.RefObject<boolean | null>,
    sound: React.RefObject<Audio.Sound>,
    setShowReactionContainer: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        setShowReactionContainer(false);
        if (isMutedRef.current) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        else {
            await PlaySound(sound);
        }
        setReaction(reaction);
    }
    catch (error) {
        Alert.alert('Error', 'Oops! Something went wrong');
    }
}
