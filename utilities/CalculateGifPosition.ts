export const CalculateGifPosition = (
    id: number,
    viewRefs: any,
    setGifPositions: React.Dispatch<React.SetStateAction<{ x: number, y: number, id: number }[]>>,
) => {
    if (viewRefs.current[id]) {
        viewRefs.current[id].measureInWindow((x: number, y: number) => {
            setGifPositions(prev => {
                const filtered = prev.filter(p => p.id !== id);
                return [...filtered, { x, y, id }];
            });
        });
    }
}
