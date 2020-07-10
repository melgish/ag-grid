export type ContainerType = 'columnMenu' | 'contextMenu' | 'toolPanel';

export interface IAfterGuiAttachedParams {
    container: ContainerType;
    hidePopup?: () => void;
}