# Envhanced-Config

Environment variables are universal and simple way to pass configuration
parameters to an application. However, they are not well suited for more complex
configurations for which a structured config file is more suited.

Enhanced-Config allows you to combine both approaches by allowing Environment
variables in JSON files.

## Example Envhanced Config File:

```
{
    "transport": {
        "net": {
            "port": ${PORT:80},
            "hostname": "${HOSTNAME:localhost}",
            "password": ${str(PASSWORD)}
        }
    }
}
```

## Parsing a file:

```
import envhanced from "./envhanced.ts";
const parsed = envhanced(config);
```
## Test 

See [test.js](test.js)