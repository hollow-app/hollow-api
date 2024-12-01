export interface IPlugin {
    onCreate(card_name: string, db?: DataBase): Promise<boolean>;
    onDelete(card_name: string, db?: DataBase): Promise<boolean>;
    onLoad(card_info: ICard): Promise<boolean>;
}

type SetState = (value: boolean | ((prevState: boolean) => boolean)) => void;

type Fetch = (url: string) => Promise<string>;

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
export declare class DataBase {
    constructor(pluginName: string, version: number);
    public openDataBase(): Promise<IDBDatabase>;
    public putData<T>(key: string, value: T): Promise<boolean>;
    public getData<T>(key: string): Promise<T | undefined>;
    public deleteData(key: string): Promise<boolean>;
}
