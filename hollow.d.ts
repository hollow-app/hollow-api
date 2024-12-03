export interface IPlugin {
    onCreate(card_name: string, db?: DataBase): Promise<boolean>;
    onDelete(card_name: string, db?: DataBase): Promise<boolean>;
    onLoad(card: ICard): Promise<boolean>;
}

type SetState = (value: boolean | ((prevState: boolean) => boolean)) => void;

type Fetch = (url: string) => Promise<any>;

export interface ICard {
    name: string;
    containerID: string;
    stateEvent: HollowEvent;
    db?: DataBase;
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
export interface DataBase {
    putData<T>(key: string, value: T): Promise<boolean>;
    getData<T>(key: string): Promise<T | undefined>;
    deleteData(key: string): Promise<boolean>;
}
