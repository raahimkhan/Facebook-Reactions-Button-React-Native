import { Dimensions, LayoutChangeEvent } from 'react-native';

const percentageHorizontal = (x: number) => {
    const totalScreenWidth = Dimensions.get("window").width;
    const spaceLeft = x;
    const percentageHorizontal = (spaceLeft / totalScreenWidth) * 100;
    return percentageHorizontal;
}

const percentageVertical = (y: number) => {
    const totalScreenHeight = Dimensions.get("window").height;
    const spaceAbove = y;
    const percentageVertical = (spaceAbove / totalScreenHeight) * 100;
    return percentageVertical;
}

export const CalculateReactionButtonPosition = (
    event: LayoutChangeEvent,
    setReactionButtonPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
    setScreenSpacePercentage: React.Dispatch<React.SetStateAction<{ left: number; above: number }>>,
) => {
    const { x, y } = event.nativeEvent.layout;
    setReactionButtonPosition({ x, y });
    event.target.measureInWindow((x, y) => {
        const left = percentageHorizontal(x);
        const above = percentageVertical(y);
        setScreenSpacePercentage({ left, above });
    });
}
