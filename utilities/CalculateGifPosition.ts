import { ViewRefsScaleGifs } from '@interfaces/viewRefsScaleGifs';

export const CalculateGifPosition = (
    id: number,
    viewRefsScaleGifs: React.MutableRefObject<{[key: number]: ViewRefsScaleGifs | null}>,
    setGifPositions: React.Dispatch<React.SetStateAction<{ x: number, y: number, id: number }[]>>,
) => {
    if (viewRefsScaleGifs.current[id]) {
        viewRefsScaleGifs.current[id].measureInWindow((x: number, y: number) => {
            setGifPositions(prev => {
                const filtered = prev.filter(p => p.id !== id);
                return [...filtered, { x, y, id }];
            });
        });
    }
}
