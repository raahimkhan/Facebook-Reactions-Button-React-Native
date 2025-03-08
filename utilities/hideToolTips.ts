export const HideToolTips = (
    setToolTipVisible: React.Dispatch<React.SetStateAction<{ id: number, visible: boolean }[]>>,
) => {
    setToolTipVisible(prevState => 
        prevState.map(tooltip => ({
            ...tooltip,
            visible: false
        }))
    );
}
