import { Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Reaction } from '@interfaces/reaction';
import { ReactionData } from "@utilities/reactionData";
import { PlaySound } from '@utilities/playSound';
import { Audio } from 'expo-av';

export const ToggleLike = async (
    reaction: Reaction,
    setReaction: React.Dispatch<React.SetStateAction<Reaction>>,
    isMutedRef: React.RefObject<boolean | null>,
    sound: React.RefObject<Audio.Sound>,
) => {
    try {
        if (isMutedRef.current) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        else {
            await PlaySound(sound);
        }
        setReaction(reaction.reactionName === 'default' ? ReactionData[6] : ReactionData[0]);
    }
    catch (error) {
        Alert.alert('Error', 'Oops! Something went wrong');
    }
}
