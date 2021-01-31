# ra-data-mixer

![Travis (.org) branch](https://img.shields.io/travis/ckoliber/ra-data-mixer/master)
![npm](https://img.shields.io/npm/v/ra-data-mixer)
![npm bundle size](https://img.shields.io/bundlephobia/min/ra-data-mixer)
![GitHub](https://img.shields.io/github/license/ckoliber/ra-data-mixer)

React Admin DataProvider Mixer

## Installation

```bash
npm i --save ra-data-mixer
```

## Usage

```tsx
// in src/App.tsx
import React from "react";
import { Admin, Resource } from "react-admin";
import mixerProvider, { Mixer } from "ra-data-mixer";

import { PostList } from "./posts";

const provider1 = ...;
const provider2 = ...;

const mixer: Mixer = (resource) =>
    (({
        posts: provider1,
        users: provider2,
    } as any)[resource]);

const App = () => (
    <Admin dataProvider={mixerProvider(mixer)}>
        <Resource name="posts" list={PostList} />
    </Admin>
);

export default App;
```

---

## Filter

You can mix same resources with different filters on different names:

```tsx
// in src/App.tsx
import mixerProvider, { Mixer } from "ra-data-mixer";

const myProvider = ...;

const mixer: Mixer = (resource) =>
    (({
        managers: [myProvider, "users", (filter) => ({
            ...filter,
            role: "manager"
        })],
        reporters: [myProvider, "users", (filter) => ({
            ...filter,
            role: "reporter"
        })],
    } as any)[resource]);
```

In this example, `managers` and `reporters` resources are using a same resource named `users` with different filters

---

## Contributors

-   [KoLiBer](https://www.linkedin.com/in/mohammad-hosein-nemati-665b1813b/)

## License

This project is licensed under the [MIT license](LICENSE.md).  
Copyright (c) KoLiBer (koliberr136a1@gmail.com)
