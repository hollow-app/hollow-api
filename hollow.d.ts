export interface IPlugin {
    onCreate(card_name: string): Promise<boolean>;
    onDelete(card_name: string): Promise<boolean>;
    onLoad(card_info: ICard): Promise<boolean>;
}

type SetState = (value: boolean | ((prevState: boolean) => boolean)) => void;

type Fetch = (url: string) => Promise<string>;

export interface ICard {
    name: string;
    containerID: string;
    stateEvent: HollowEvent;
    togglePopUp: SetState;
    fetch: Fetch;
}

// State communication between the app and the plugin and plugins between each other.
type Listener<T> = (data: T) => void;

export interface HollowEvent {
    on<T>(eventName: string, listener: Listener<T>): void;
    off<T>(eventName: string, listener: Listener<T>): void;
    emit<T>(eventName: string, data: T): void;
    getCurrentData<T>(eventName: string): T | undefined;
}

