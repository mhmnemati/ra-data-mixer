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
import mixerProvider from "ra-data-mixer";

import { PostList } from "./posts";

const App = () => (
    <Admin dataProvider={mixerProvider("http://path.to.my.api/")}>
        <Resource name="posts" list={PostList} />
    </Admin>
);

export default App;
```

---

## Contributors

-   [KoLiBer](https://www.linkedin.com/in/mohammad-hosein-nemati-665b1813b/)

## License

This project is licensed under the [MIT license](LICENSE.md).  
Copyright (c) KoLiBer (koliberr136a1@gmail.com)
