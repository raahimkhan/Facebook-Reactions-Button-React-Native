import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Animated,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { Reaction } from '@interfaces/reaction';
import { ReactionData } from '@utilities/reactionData';
import { SelectReaction } from '@utilities/selectReaction';
import { Audio } from 'expo-av';
import { CalculateGifPosition } from '@utilities/CalculateGifPosition';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { ViewRefsScaleGifs } from '@interfaces/viewRefsScaleGifs';
import {
    ToggleReactionsContainerInitialAnimation
} from '@animations/toggleReactionsContainerInitial';
import {
    ResetEmojisScaleAndTranslationAnimation
} from '@animations/resetEmojisScaleAndTranslation';
import {
    UpdateEmojiScaleAndTranslationAnimation
} from '@animations/updateEmojiScaleAndTranslation';
import {
    InstantResetEmojisScaleAndTranslation
} from '@animations/instantResetEmojisScaleAndTranslation';

interface ReactionsContainerProps {
    reactionButtonPosition: { x: number; y: number };
    screenSpacePercentage: { left: number; above: number };
    setReaction: React.Dispatch<React.SetStateAction<Reaction>>;
    isMutedRef: React.RefObject<boolean | null>;
    sound: React.RefObject<Audio.Sound>;
    setShowReactionContainer: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReactionsContainer: React.FC<ReactionsContainerProps> = ({
    reactionButtonPosition,
    screenSpacePercentage,
    setReaction,
    isMutedRef,
    sound,
    setShowReactionContainer
}) => {

    const [gifPositions, setGifPositions] = useState<{ x: number, y: number, id: number }[]>([]);

    const viewRefsScaleGifs = useRef<{[key: number]: ViewRefsScaleGifs | null}>({});

    const scales = useRef<{ id: number, scale: Animated.Value }[]>([
        { id: 2, scale: new Animated.Value(1) },
        { id: 3, scale: new Animated.Value(1) },
        { id: 4, scale: new Animated.Value(1) },
        { id: 5, scale: new Animated.Value(1) },
        { id: 6, scale: new Animated.Value(1) },
        { id: 8, scale: new Animated.Value(1) },
    ]);

    const emojiTranslationsY = useRef<{ id: number, translateY: Animated.Value }[]>([
        { id: 2, translateY: new Animated.Value(0) },
        { id: 3, translateY: new Animated.Value(0) },
        { id: 4, translateY: new Animated.Value(0) },
        { id: 5, translateY: new Animated.Value(0) },
        { id: 6, translateY: new Animated.Value(0) },
        { id: 8, translateY: new Animated.Value(0) },
    ]);

    const panStartY = useRef(0);
    const yThreshold = hp(10);

    const opacity = React.useRef(new Animated.Value(0)).current;
    const translateX = React.useRef(new Animated.Value(reactionButtonPosition.x)).current;
    const translateY = React.useRef(new Animated.Value(reactionButtonPosition.y)).current;

    const lastActiveEmojiRef = useRef<number | null>(null);

    const panGesture = Gesture.Pan().runOnJS(true)
    .onBegin((e) => {
        panStartY.current = e.absoluteY;
    })
    .onUpdate((e) => {
        const lowerBound = panStartY.current - yThreshold;
        const upperBound = panStartY.current + yThreshold;
        if (e.absoluteY < lowerBound || e.absoluteY > upperBound) {
            InstantResetEmojisScaleAndTranslation(
                scales,
                emojiTranslationsY
            )
            lastActiveEmojiRef.current = null;
            return;
        }
        UpdateEmojiScaleAndTranslationAnimation(
            scales,
            emojiTranslationsY,
            gifPositions,
            e.absoluteX,
            lastActiveEmojiRef
        );
    })
    .onTouchesDown((e) => {
        if (e.allTouches.length > 0) {
            UpdateEmojiScaleAndTranslationAnimation(
                scales,
                emojiTranslationsY,
                gifPositions,
                e.allTouches[0].absoluteX,
                lastActiveEmojiRef
            );
        }
    })
    .onTouchesUp((_) => {
        if (lastActiveEmojiRef.current !== null) {
            const selectedReaction = ReactionData.find(
                (reaction) => reaction.reactionID === lastActiveEmojiRef.current
            );
            if (selectedReaction) {
                SelectReaction(
                    selectedReaction,
                    setReaction,
                    isMutedRef,
                    sound,
                    setShowReactionContainer
                );
            }
        }
    })
    .onEnd((_) => {
        ResetEmojisScaleAndTranslationAnimation(
            scales,
            emojiTranslationsY
        );
        lastActiveEmojiRef.current = null;
        setShowReactionContainer(false);
    });

    useEffect(() => {
        ToggleReactionsContainerInitialAnimation(
            opacity,
            translateX,
            translateY,
            screenSpacePercentage,
            reactionButtonPosition
        );
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            ReactionData.forEach(reaction => {
                if (reaction.reactionID !== 1 && reaction.reactionID !== 7) {
                    CalculateGifPosition(reaction.reactionID, viewRefsScaleGifs, setGifPositions);
                }
            });
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View
                style={[
                    styles.reactionsContainer, {
                        opacity: opacity,
                        transform: [
                            { translateY },
                            { translateX }
                        ],
                    }
                ]}
            >
                {ReactionData.map((reaction) => (
                    reaction.reactionID !== 1 && reaction.reactionID !== 7 && (
                        <Animated.View
                            key={reaction.reactionID}
                            ref={ref => {
                                viewRefsScaleGifs.current[reaction.reactionID] = ref as unknown as ViewRefsScaleGifs;
                            }}
                            style={[styles.gifContainer, {
                                transform: [
                                    {
                                        scale: scales.current.find(scale => scale.id === reaction.reactionID)?.scale || new Animated.Value(0),
                                    },
                                    {
                                        translateY: emojiTranslationsY.current.find(trans => trans.id === reaction.reactionID)?.translateY || new Animated.Value(0),
                                    }
                                ]
                            }]}
                            onLayout={() => CalculateGifPosition(reaction.reactionID, viewRefsScaleGifs, setGifPositions)}
                            onStartShouldSetResponder={() => true}
                            onResponderRelease={() => SelectReaction(
                                    reaction,
                                    setReaction,
                                    isMutedRef,
                                    sound,
                                    setShowReactionContainer
                                )
                            }
                        >
                            <Image
                                style={styles.gifStyle}
                                source={reaction.reactionGif}
                                contentFit="contain"
                                contentPosition="center"
                            />
                        </Animated.View>
                    )
                ))}
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    reactionsContainer: {
        position: 'absolute',
        width: wp(53),
        backgroundColor: '#3b3c3e',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: hp(0.7),
        paddingLeft: wp(1),
        paddingRight: wp(1),
    },
    gifContainer: {
        flex: 1,
    },
    gifStyle: {
        flex: 1,
        width: wp(10),
        height: wp(10),
    },
});

export default ReactionsContainer;