import { Alert, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Reaction } from '@interfaces/reaction';
import { PlaySound } from '@utilities/playSound';
import { Audio } from 'expo-av';
import { AnimateSelectedEmoji } from '@animations/animateSelectedEmoji';

export const SelectReaction = async (
    reaction: Reaction,
    setReaction: React.Dispatch<React.SetStateAction<Reaction>>,
    isMutedRef: React.RefObject<boolean | null>,
    sound: React.RefObject<Audio.Sound>,
    setShowReactionContainer: React.Dispatch<React.SetStateAction<boolean>>,
    scales: React.MutableRefObject<{ id: number; scale: Animated.Value }[]>,
    emojiTranslationsY: React.MutableRefObject<{ id: number; translateY: Animated.Value }[]>,
    emojiTranslationsX: React.MutableRefObject<{ id: number; translateX: Animated.Value }[]>,
    reactionButtonPosition: { x: number; y: number },
    gifPositions: { x: number, y: number, id: number }[],
    emojiOpacities: React.MutableRefObject<{ id: number; opacity: Animated.Value }[]>,
) => {
    try {
        if (scales && emojiTranslationsY) {
            AnimateSelectedEmoji(
                reaction.reactionID,
                scales,
                emojiTranslationsY,
                emojiTranslationsX,
                reactionButtonPosition,
                gifPositions,
                emojiOpacities
            );
        }
        if (isMutedRef.current) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        else {
            await PlaySound(sound);
        }
        setTimeout(() => {
            setShowReactionContainer(false);
            setReaction(reaction);
        }, 500);
    }
    catch (error) {
        Alert.alert('Error', 'Oops! Something went wrong');
    }
}
