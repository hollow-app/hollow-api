# hollow-api

Type definitions for creating plugins for Hollow. This package provides interfaces and types that help developers integrate seamlessly with Hollow's plugin system.

## Installation

Install the package using npm:

```bash
npm install hollow-api
```

---

## Usage

Import the types into your TypeScript project:

```ts
import { IPlugin, ICard, HollowEvent, DataBase } from "hollow-api";

class MyPlugin implements IPlugin {
    async onCreate(card_name: string, db: DataBase): Promise<boolean> {
        const result = await db.putData(card_name, { value: 42 });
        return result;
    }

    async onDelete(card_name: string, db: DataBase): Promise<boolean> {
        const result = await db.deleteData(card_name);
        return result;
    }

    async onLoad(card_info: ICard): Promise<boolean> {
        console.log(`Card loaded: ${card_info.name}`);
        const data = await card_info.db.getData(card_name);
        // load the plugin
        return true;
    }
}
```

-   more details available in the [sample plugin repo](https://github.com/hollow-app/hollow-sample-plugin).

### Available Types

#### `IPlugin`

Interface for creating a plugin.

#### `ICard`

Details of a card provided to plugins.

#### `HollowEvent`

Event system for state communication between the app, plugins and cards.
