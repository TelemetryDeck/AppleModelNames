import { readFileSync, writeFileSync, rmdirSync, mkdirSync } from 'fs'

const files = [
    'appletvs.json',
    'ipads.json',
    'iphones.json',
    'macs.json',
    'other.json',
    'wearables.json',
]

const keys = [
    'readableName',
    'deviceType',
    'processorType',
    'processorFamily',
    'systemFirstRelease',
    'systemLastRelease',
]

function prepare() {
    try {
        rmdirSync('./output', { recursive: true })
    } catch (err) {}

    mkdirSync('./output')
}

function getDataFromFiles(files, key) {
    var allFilesData = {}

    for (const file of files) {
        const data = readFileSync('./dataset/' + file, { encoding: 'utf8' })
        const json = JSON.parse(data)

        allFilesData = { ...allFilesData, ...json }
    }

    return allFilesData
}

function extractKey(data, key) {
    const extractedData = {}

    for (let device in data) {
        extractedData[device] = data[device][key]
    }

    return extractedData
}

function writeDataToFile(jsonData, fileName) {
    const data = JSON.stringify(jsonData)
    writeFileSync('./output/' + fileName, data)
}

function process(files, key) {
    const data = getDataFromFiles(files, key)
    const extractedData = extractKey(data, key)

    writeDataToFile(extractedData, key + '.json')
}

prepare()

for (const key of keys) {
    console.log('Processing ' + key + '...')
    process(files, key)
}
