import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen';

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
        </View>
    );
};

const styles = StyleSheet.create({
    reactionsContainer: {
        position: 'absolute',
        width: wp(50),
        height: hp(6),
        backgroundColor: 'red',
        borderRadius: 16,
    },
});

export default ReactionsContainer;
