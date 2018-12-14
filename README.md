# e-statics
Module for express statics, returns
```js
{
"GET": 0,
"POST": 0,
"PUT": 0,
"DELETE": 0,
"TOTAL": 0,
"LAST_MS": 0,
"AVG_MS": 0,
"MIN_MS": 0,
"MAX_MS": 0,
"TOTAL_MS": 0
}
```

### Installation
npm install e-statics --save

### Usage
e-statics adds automatically get route(/e-statics) to your routes.
```js

const express = require("express");
const app = express();
const eStatics = require("e-statics")(app);
app.use(eStatics.counter);
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(8080, () => console.log(`Example app listening on port ${port}!`))
```

If you dont want to use this route just dont add app to e-statics

```js

const express = require("express");
const app = express();
const eStatics = require("e-statics")();
app.use(eStatics.counter);
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/my-stats-route', (req, res) => res.send(eStatics.stats))
app.listen(8080, () => console.log(`Example app listening on port ${port}!`))
```
