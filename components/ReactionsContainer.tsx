import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { ReactionData } from '@utilities/reactionData';

interface ReactionsContainerProps {
    reactionButtonPosition: { x: number; y: number };
    screenSpacePercentage: { left: number; above: number };
}

const ReactionsContainer: React.FC<ReactionsContainerProps> = ({
    reactionButtonPosition,
    screenSpacePercentage,
}) => {

    return (
        <View style={[styles.reactionsContainer, {
            top: screenSpacePercentage.above > 20 ? reactionButtonPosition.y - hp(8) : reactionButtonPosition.y + hp(8),
            left: screenSpacePercentage.left < 35 ? reactionButtonPosition.x + wp(8) : reactionButtonPosition.x - wp(16),
        }]}>
            {ReactionData.map((reaction) => (
                reaction.reactionID !== 1 && reaction.reactionID !== 7 && <Image
                    key={reaction.reactionID}
                    style={{
                        flex: 1,
                        width: wp(10),
                        height: wp(10),
                    }}
                    source={reaction.reactionGif}
                    contentFit="contain"
                    contentPosition="left"
                />
            ))}
        </View>
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
    },
});

export default ReactionsContainer;
