export interface ITextFunction {
    text: string,
    imgPath?: string,
    function: (...args: any[]) => void
}