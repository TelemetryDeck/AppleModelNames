# Apple Model Names for TelemetryDeck

A mapping of Apple model names to readable names. We're using this as the basis for [TelemetryDeck](https://telemetrydeck.com)'s device detection.

Help TelemetryDeck and the community by adding new devices or correcting existing ones. Just open a pull request. 🩵

## Type Definitions

`dataset.json` contains a single JSON object with the following structure:

```json
{
    "<apple model identifier>": {
        "deviceType": "<device type: Desktop|Laptop|Phone|Tablet|Set-Top Box|Wearable|Headset>",
        "processorFamily": "<processor family: Intel Core i5|Apple M1>",
        "processorType": "<processor type: Intel|Apple Silicon>",
        "readableName": "<readable name>"
    }
}
```

We then use `process.mjs` to generate individual JSON files for readableName, deviceType, processorType and processorFamily that will directly map from modelName to readableName/deviceType/processorType/processorFamily. These can then be used in TelemetryDeck as Lookup Tables.

## Example

`dataset.json`

```json
{
    "MacBookPro16,1": {
        "deviceType": "Laptop",
        "processorFamily": "Intel Core i5",
        "processorType": "Intel",
        "readableName": "MacBook Pro 13-inch (2019)"
    }
}
```

Will result in the following files:

`appleModelNames.json`

```json
{
    "MacBookPro16,1": "MacBook Pro 13-inch (2019)"
}
```

`deviceTypes.json`

```json
{
    "MacBookPro16,1": "Laptop"
}
```

`processorTypes.json`

```json
{
    "MacBookPro16,1": "Intel"
}
```

`processorFamilies.json`

```json
{
    "MacBookPro16,1": "Intel Core i5"
}
```
