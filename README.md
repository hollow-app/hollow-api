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
import { IPlugin, ICard, HollowEvent } from 'hollow-api';

class MyPlugin implements IPlugin {
    async onCreate(card_name: string): Promise<boolean> {
        console.log(`Card created: ${card_name}`);
        return true;
    }

    async onDelete(card_name: string): Promise<boolean> {
        console.log(`Card deleted: ${card_name}`);
        return true;
    }

    async onLoad(card_info: ICard): Promise<boolean> {
        console.log(`Card loaded: ${card_info.name}`);
        return true;
    }
}
```
- more details available in the [sample plugin repo](https://github.com/hollow-app/hollow-sample-plugin).

### Available Types

#### `IPlugin`

Interface for creating a plugin.

#### `ICard`

Details of a card provided to plugins.


#### `HollowEvent`

Event system for state communication between the app, plugins and cards.


