import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Animated,
    Text,
    View,
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
import { CalculateGifPosition } from '@utilities/calculateGifPosition';
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
import { HideToolTips } from '@utilities/hideToolTips';

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

    const emojiTranslationsX = useRef<{ id: number, translateX: Animated.Value }[]>([
        { id: 2, translateX: new Animated.Value(0) },
        { id: 3, translateX: new Animated.Value(0) },
        { id: 4, translateX: new Animated.Value(0) },
        { id: 5, translateX: new Animated.Value(0) },
        { id: 6, translateX: new Animated.Value(0) },
        { id: 8, translateX: new Animated.Value(0) },
    ]);

    const emojiTranslationsY = useRef<{ id: number, translateY: Animated.Value }[]>([
        { id: 2, translateY: new Animated.Value(0) },
        { id: 3, translateY: new Animated.Value(0) },
        { id: 4, translateY: new Animated.Value(0) },
        { id: 5, translateY: new Animated.Value(0) },
        { id: 6, translateY: new Animated.Value(0) },
        { id: 8, translateY: new Animated.Value(0) },
    ]);

    const emojiOpacities = useRef<{ id: number, opacity: Animated.Value }[]>([
        { id: 2, opacity: new Animated.Value(1) },
        { id: 3, opacity: new Animated.Value(1) },
        { id: 4, opacity: new Animated.Value(1) },
        { id: 5, opacity: new Animated.Value(1) },
        { id: 6, opacity: new Animated.Value(1) },
        { id: 8, opacity: new Animated.Value(1) },
    ]);

    const panStartY = useRef(0);
    const yThreshold = hp(10);

    const opacity = React.useRef(new Animated.Value(0)).current;
    const translateX = React.useRef(new Animated.Value(reactionButtonPosition.x)).current;
    const translateY = React.useRef(new Animated.Value(reactionButtonPosition.y)).current;

    const lastActiveEmojiRef = useRef<number | null>(null);

    const [toolTipVisible, setToolTipVisible] = useState<{ id: number; visible: boolean }[]>(
        [
            { id: 2, visible: false },
            { id: 3, visible: false },
            { id: 4, visible: false },
            { id: 5, visible: false },
            { id: 6, visible: false },
            { id: 8, visible: false },
        ]
    );

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
            HideToolTips(setToolTipVisible);
            return;
        }
        UpdateEmojiScaleAndTranslationAnimation(
            scales,
            emojiTranslationsY,
            gifPositions,
            e.absoluteX,
            lastActiveEmojiRef,
            setToolTipVisible,
            screenSpacePercentage
        );
    })
    .onTouchesDown((e) => {
        if (e.allTouches.length > 0) {
            UpdateEmojiScaleAndTranslationAnimation(
                scales,
                emojiTranslationsY,
                gifPositions,
                e.allTouches[0].absoluteX,
                lastActiveEmojiRef,
                setToolTipVisible,
                screenSpacePercentage
            );
        }
    })
    .onEnd((_) => {
        let delay: boolean = false;
        if (lastActiveEmojiRef.current !== null) {
            const selectedReaction = ReactionData.find(
                (reaction) => reaction.reactionID === lastActiveEmojiRef.current
            );
            if (selectedReaction) {
                delay = true;
                SelectReaction(
                    selectedReaction,
                    setReaction,
                    isMutedRef,
                    sound,
                    setShowReactionContainer,
                    scales,
                    emojiTranslationsY,
                    emojiTranslationsX,
                    reactionButtonPosition,
                    gifPositions,
                    emojiOpacities
                );
            }
        }
        if (delay) {
            setTimeout(() => {
                ResetEmojisScaleAndTranslationAnimation(
                    scales,
                    emojiTranslationsY
                );
                lastActiveEmojiRef.current = null;
                setShowReactionContainer(false);
                HideToolTips(setToolTipVisible);
            }, 500);
        }
        else {
            ResetEmojisScaleAndTranslationAnimation(
                scales,
                emojiTranslationsY
            );
            lastActiveEmojiRef.current = null;
            setShowReactionContainer(false);
            HideToolTips(setToolTipVisible);
        }
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
                                    },
                                    {
                                        translateX: emojiTranslationsX.current.find(trans => trans.id === reaction.reactionID)?.translateX || new Animated.Value(0),
                                    }
                                ],
                                opacity: emojiOpacities.current.find(opacity => opacity.id === reaction.reactionID)?.opacity || new Animated.Value(1),
                            }]}
                            onLayout={() => CalculateGifPosition(reaction.reactionID, viewRefsScaleGifs, setGifPositions)}
                            onStartShouldSetResponder={() => true}
                            onResponderRelease={() => SelectReaction(
                                    reaction,
                                    setReaction,
                                    isMutedRef,
                                    sound,
                                    setShowReactionContainer,
                                    scales,
                                    emojiTranslationsY,
                                    emojiTranslationsX,
                                    reactionButtonPosition,
                                    gifPositions,
                                    emojiOpacities
                                )
                            }
                        >
                            <Image
                                style={styles.gifStyle}
                                source={reaction.reactionGif}
                                contentFit="contain"
                                contentPosition="center"
                            />
                            {toolTipVisible.find(tooltip => tooltip.id === reaction.reactionID && tooltip.visible) && (
                                <View style={[styles.toolTipContainer, {
                                    top: screenSpacePercentage.above > 20 ? -hp(1.5) : hp(4),
                                }]}>
                                    <Text style={styles.toolTipText}> {reaction.reactionName} </Text>
                                </View>
                            )}
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
    toolTipContainer: {
        position: 'absolute',
        backgroundColor: '#625e5f',
        width: wp(12),
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        paddingTop: hp(0.2),
        paddingBottom: hp(0.2),
    },
    toolTipText: {
        color: 'white',
        fontSize: wp(2.5),
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