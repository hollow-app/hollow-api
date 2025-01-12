// Represents a plugin with lifecycle methods that interact with cards and the app.
export interface IPlugin {
    /**
     * Called when a card is created.
     * @param name - The name of the card being created.
     * @param db - Optional database instance for the card.
     * @returns A promise that resolves to a boolean indicating success.
     */
    onCreate(name: string, db?: DataBase): Promise<boolean>;

    /**
     * Called when a card is deleted.
     * @param name - The name of the card being deleted.
     * @param db - Optional database instance for the card.
     * @returns A promise that resolves to a boolean indicating success.
     */
    onDelete(name: string, db?: DataBase): Promise<boolean>;

    /**
     * Called when a card is loaded.
     * @param card - The card object being loaded.
     * @param app - The HollowEvent instance for interacting with the app.
     * @returns A promise that resolves to a boolean indicating success.
     */
    onLoad(card: ICard, app: HollowEvent): Promise<boolean>;

    /**
     * Called when a card is unloaded.
     * Cleans up resources or state as necessary.
     */
    onUnload(): void;
}

// A type for setting a boolean state, often used for UI interactions.
type SetState = (value: boolean | ((prevState: boolean) => boolean)) => void;

/**
 * Defines the possible response types for an HTTP request.
 * - "json": Parse the response as JSON.
 * - "text": Read the response as plain text.
 * - "blob": Handle the response as a binary large object.
 */
type ResponseType = "json" | "text" | "blob";

/**
 * A type for making HTTP requests.
 * @param url - The URL to fetch.
 * @param options - Optional request configuration.
 * @param responseType - Determines how the response is processed. Defaults to `text` if not provided.
 * @returns A promise resolving to the processed response data.
 */
type IFetch = (url: string, options?: RequestInit, responseType?: ResponseType) => Promise<any>;

// Represents a card in the app, with properties and methods for interaction.
export interface ICard {
    /**
     * The name of the card.
     */
    name: string;

    /**
     * The ID of the container where the card resides.
     */
    containerID: string;

    /**
     * Optional database instance associated with the card.
     * Available only when `manifest.json` of the plugin has a the `DataBaseVersion`.
     */
    db?: DataBase;

    /**
     * Function to manage the elevation state of the card.
     * Used when the card needs to be at the highest z-index (e.g., brought to the front).
     */
    elevating: SetState;

    /**
     * Function to perform HTTP requests within the card.
     */
    fetch: IFetch;
}

// A type representing an event listener callback.
type Listener<T> = (data?: T) => void;

// Represents an event system for the app, allowing plugins to interact with events.
export interface HollowEvent {
    /**
     * Registers a listener for a specific event.
     * @param eventName - The name of the event.
     * @param listener - The callback to invoke when the event is emitted.
     */
    on<T>(eventName: string, listener: Listener<T>): void;

    /**
     * Unregisters a listener for a specific event.
     * @param eventName - The name of the event.
     * @param listener - The callback to remove.
     */
    off<T>(eventName: string, listener: Listener<T>): void;

    /**
     * Emits an event, optionally passing data to the listeners.
     * @param eventName - The name of the event.
     * @param data - Optional data to pass to the listeners.
     */
    emit<T>(eventName: string, data?: T): void;

    /**
     * Retrieves the current data for a specific event.
     * @param eventName - The name of the event.
     * @returns The current data associated with the event, or undefined.
     */
    getCurrentData<T>(eventName: string): T | undefined;

    /**
     * Clears all listeners for a specific event.
     * @param eventName - The name of the event to clear.
     */
    clear(eventName: string): void;

    /**
     * Toggles the boolean state of an event.
     * This is intended for events that store a boolean value, switching it between `true` and `false`.
     * If the event does not store a boolean, this method will have no effect.
     * @param eventName - The name of the event whose boolean state is to be toggled.
     */
    reverse(eventName: string): void;
}

// Represents a simple database interface for storing and retrieving data.
export interface DataBase {
    /**
     * Stores data in the database.
     * @param key - The key for the data.
     * @param value - The value to store.
     * @returns A promise that resolves to a boolean indicating success.
     */
    putData<T>(key: string, value: T): Promise<boolean>;

    /**
     * Retrieves data from the database.
     * @param key - The key for the data to retrieve.
     * @returns A promise that resolves to the data or undefined if not found.
     */
    getData<T>(key: string): Promise<T | undefined>;

    /**
     * Deletes data from the database.
     * @param key - The key for the data to delete.
     * @returns A promise that resolves to a boolean indicating success.
     */
    deleteData(key: string): Promise<boolean>;
}
