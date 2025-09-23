# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository maintains a comprehensive dataset of Apple device model identifiers mapped to human-readable names and metadata. It serves as the data source for TelemetryDeck's device detection system.

## Core Architecture

### Data Structure

- **Source Data**: Individual JSON files in `dataset/` directory organized by device type:
    - `iphones.json` - iPhone models
    - `ipads.json` - iPad models
    - `macs.json` - Mac models
    - `appletvs.json` - Apple TV models
    - `wearables.json` - Apple Watch and AirPods
    - `other.json` - Other Apple devices

- **Data Schema**: Each device entry contains:
    ```json
    {
        "ModelIdentifier": {
            "deviceType": "Desktop|Laptop|Phone|Tablet|Set-Top Box|Wearable|Headset",
            "processorFamily": "Apple M1|Intel Core i5|A15|etc",
            "processorType": "Apple Silicon|Intel",
            "readableName": "Human readable device name",
            "systemFirstRelease": "First OS release version",
            "systemLastRelease": "Last supported OS version"
        }
    }
    ```

### Processing Pipeline

- **Input**: Multiple JSON files in `dataset/`
- **Processor**: `process.mjs` script that merges all datasets and extracts individual lookup tables
- **Output**: Generated files in `output/` directory for each metadata field:
    - `readableName.json` - Model ID → readable name mapping
    - `deviceType.json` - Model ID → device type mapping
    - `processorType.json` - Model ID → processor type mapping
    - `processorFamily.json` - Model ID → processor family mapping
    - `systemFirstRelease.json` - Model ID → first release mapping
    - `systemLastRelease.json` - Model ID → last release mapping

## Development Commands

### Code Formatting

```bash
pnpm prettier . --check --config .prettierrc.json  # Check formatting
pnpm prettier . --write --config .prettierrc.json  # Fix formatting
```

### Data Processing

```bash
node process.mjs  # Generate lookup tables from dataset files
```

### Package Management

```bash
pnpm install  # Install dependencies (uses pnpm)
```

## CI/CD Pipeline

The GitHub Actions workflow (`build-pr.yml`) automatically:

1. **Lint**: Runs Prettier formatting checks
2. **Process**: Executes `process.mjs` to generate output files
3. **Release**: Creates automatic releases with generated JSON files (main branch only)

## Code Style

- Uses Prettier with custom configuration (`.prettierrc.json`)
- JSON files are automatically sorted recursively
- 4-space indentation, single quotes, no semicolons
- ES modules (`.mjs` extension for Node.js scripts)

## Data Sources for Updates

**Primary Sources:**

- **Apple Newsroom** - https://www.apple.com/newsroom/ (official announcements and device names)
- **adamawolf GitHub gist** - https://gist.github.com/adamawolf/3048717 (most up-to-date model identifiers like iPhone18,1)
- **AppleDB** - https://appledb.dev/ (comprehensive device database with SoC info)
- **EveryMac.com** - https://everymac.com/ (detailed technical specifications and processor families)

**Data Update Process:**
When asked to update data or check for updates:

1. **Cross-reference sources** - Check adamawolf GitHub gist and AppleDB for new model identifiers
2. **Verify official names** - Confirm device names and specs with Apple Newsroom
3. **Get technical details** - Use EveryMac.com for processor families and device classifications
4. **Update dataset files** in priority order:
    - `dataset/iphones.json` (highest priority)
    - `dataset/ipads.json`
    - `dataset/macs.json`
    - `dataset/wearables.json`
    - `dataset/appletvs.json`
    - `dataset/other.json`
5. **Process and format**:

    ```bash
    node process.mjs
    pnpm prettier . --write --config .prettierrc.json
    ```

6. **Verify changes and quality control**:

    ```bash
    git status                              # Check which files were modified
    git diff --name-status                  # See summary of all changes
    git diff dataset/                       # Review all dataset changes in detail
    git diff --stat                         # Get statistical summary of changes
    ```

    - **Review all changes carefully** - Ensure only intended additions/modifications were made
    - **Verify no devices were accidentally removed** - Check that existing entries are preserved
    - **Double-check technical accuracy** - Confirm processor families, device types, and naming conventions
    - **Cross-reference with 3rd source** - Optionally verify new entries with EveryMac.com or Apple Support docs
    - **Validate data consistency** - Ensure new entries follow the same schema and naming patterns as existing data

Always confirm at least 2 sources agree on device information before adding entries.
