// Represents a plugin with lifecycle methods that interact with cards and the app.
export interface IPlugin {
	/**
	 * Called when a card is created.
	 * @param name - The name of the card being created.
	 * @returns A promise that resolves to a boolean indicating success.
	 */
	onCreate(name: string): Promise<boolean>;

	/**
	 * Called when a card is deleted.
	 * @param name - The name of the card being deleted.
	 * @returns A promise that resolves to a boolean indicating success.
	 */
	onDelete(name: string): Promise<boolean>;

	/**
	 * Called when a card is loaded.
	 * @param card - The card object being loaded.
	 * @param app - The HollowEvent instance for interacting with the app.
	 * @returns A promise that resolves to a boolean indicating success.
	 */
	onLoad(card: ICard, app: HollowEvent): Promise<boolean>;

	/**
	 * Called when a card is unloaded.
	 * @param name - The name of the card being unloaded.
	 * Cleans up resources or state as necessary.
	 */
	onUnload(name: string): void;

}


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
	* The HollowEvent instance for cards of the same tool to interacting with each other.
	*/
	toolEvent: HollowEvent;
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


/*
 * Represents a group of context menu buttons emitted to Hollow's context menu.
 * This allows extending the menu with custom functionality based on the item triggered.
 */
export type ContextMenuItem = {
	/**
	 * A unique identifier for the context menu group.
	 */
	id: string;

	/**
	 * The group title displayed above the list of menu items.
	 */
	header: string;

	/** 
	 * An array of buttons to be displayed in the context menu under this group.
	 */
	items: ContextMenuItemButton[];
};

type ContextMenuItemButton = {
	/**
	 * The name of the icon from lucide.dev in PascalCase format.
	 */
	icon: string;

	/** 
	 * The text label displayed on the button.
	 */
	label: string;

	/**
	 * Function to be called when the button is clicked.
	 * Should not be provided if `children` are defined.
	 */
	onclick?: () => void;

	/** 
	 * A submenu of buttons that appears when this button is hovered over.
	 */
	children?: Omit<ContextMenuItemButton, "children">[];
};


/**
 * Represents a notification that can be displayed in Hollow.
 */
export type NotifyType = {
	/**
	 * A unique identifier for the notification.
	 */
	id: string;

	/**
	 * Title of the notification.
	 */
	title: string;

	/**
	 * Main message content of the notification.
	 */
	message: string;

	/**
	 * Optional attachment URL or identifier.
	 */
	attachment?: string;

	/**
	 * ISO timestamp of when the notification was submitted.
	 */
	submitted_at: string;

	/**
	 * ISO timestamp of when the notification should expire.
	 */
	expires_at: string;

	/**
	 * Category or type label.
	 */
	type: "achievement" | "reminder" | "error" | "info" | "warning" | "update";

};


/**
 * Represents a visual tag with a name and color scheme.
 */
export type TagType = {
	/**
	 * Name of the tag.
	 */
	name: string;

	/**
	 * Text color.
	 */
	foreground: string;

	/**
	 * Background color.
	 */
	background: string;
};


export type EntryData = {
	/**
	 * Unique identifier for this data entry (within the tool).
	 */
	id: string;

	/**
	 * The tool and its corresponding card that hosts this data.
	 */
	source: {
		tool: string;
		card: string;
		icon?: string;
	};

	/**
	 * Optional human-readable title or label.
	 */
	title?: string;

	/**
	 * The primary content or body of the data.
	 * Used as the main value in Radarite.
	 */
	content?: string;

	/**
	 * Tags used for categorization or filtering across tools.
	 */
	tags?: string[];

	/**
	 * Optional metadata specific to the tool or context.
	 */
	meta?: Record<string, any>;
};



/**
 * A map of all supported input types and their configuration options.
 * These are used for both tool settings and form entries.
 */
export type TypedOptionMap = {
	text: { placeholder?: string };
	longtext: { placeholder?: string };
	number: { min?: number; max?: number };
	boolean: {};
	button: {};
	color: {};
	emoji: {};
	dropdown: { options: string[] };
	file: { accept?: string };
	range: { min: number; max: number; step?: number };
	keywords: { placeholder?: string };
};
/**
 * Base configuration shared across all option types.
 *
 * @template T  The string key of the input type (from TypedOptionMap).
 * @template Extra  The additional config for that input type.
 */
export type BaseOption<T extends string, Extra = {}> = {
	type: T;
	label: string;
	description?: string;
	optional?: boolean;
} & Extra;



type ToolOptionBase = {
	/**
	 * Current value of the setting.
	 */
	value: any;

	/**
	 * Called whenever the setting value changes.
	 */
	onChange: (v: any) => void;
};



/**
 * The full object a tool submits when requesting its settings to be rendered in Hollow.
 */
export type ToolOptions = {
	/**
	 * Tool name that is requesting settings rendering.
	 */
	tool: string;

	/**
	 * Card name the settings are linked to.
	 */
	card: string;

	/**
	 * Called to persist/save any changes made to the settings.
	 */
	save: () => void;

	/**
	 * List of editable options or settings.
	 */
	options: ToolOption[];
};


/**
 * Represents a setting option submitted by a tool to be displayed
 * and edited in Hollow’s settings system.
 *
 * Tools can use predefined field types (from TypedOptionMap), or render
 * a completely custom element.
 */
export type ToolOption =
	| (ToolOptionBase &
		{
			[K in keyof TypedOptionMap]: BaseOption<K, TypedOptionMap[K]>;
		}[keyof TypedOptionMap])
	| {
		type: "custom";

		/**
		 * Render function for fully custom settings components.
		 */
		render: () => Element;
	};







/**
 * Represents a form submission request
 */
export type FormType = {
	/**
	 * Unique ID for the form instance.
	 */
	id: string;

	/**
	 * Title displayed at the top of the form.
	 */
	title: string;

	/**
	 * Callback triggered with the full form values once submitted.
	 */
	submit: (submission: any) => void;

	/**
	 * List of input fields the user can interact with.
	 */
	options: FormOption[];

	/**
	 * Optional: if true, the form is used to update existing data rather than create new data.
	 */
	update?: boolean;
};

/**
 * A single input field in a form, used when a tool requests a user to fill in information.
 */
export type FormOption = {
	/**
	 * Unique key identifying the option within the form submission.
	 */
	key: any;

	/**
	 * Conditional visibility:
	 * This field will only be shown if the option with the matching key
	 * has one of the values listed in `conditions`.
	 */
	dependsOn?: { key: string; conditions: any[] };

	/**
	 * Pre-filled value.
	 */
	value?: any;
} & {
	[K in keyof TypedOptionMap]: BaseOption<K, TypedOptionMap[K]>;
}[keyof TypedOptionMap];
