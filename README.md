# FXCompleter

**Beta** — Full FXML autocomplete for JavaFX with auto-imports, CSS support and validation.

## Features

### FXML Autocomplete
- **Tag completion**: Start typing `<Button`, `<VBox`, `<TableView` and get suggestions with snippets
- **Multiple variants per tag**: Self-closing (`<Button/>`), container (`<Button>...</Button>`), and specialized forms
- **Attribute completion**: Common (`fx:id`, `style`), component-specific, layout constraints, and event handlers
- **Attribute values**: Boolean, enum, and specialized values for each attribute
- **Partial matching**: Type `<Anch` to get `AnchorPane` completions

### Auto-Imports
- **Automatic import insertion**: When you add a new tag, the corresponding `<?import ...?>` is added automatically
- **Quick-fix code actions**: Lightbulb or right-click a "Missing import" warning to add individual imports
- **Fix all missing imports** (`Ctrl+Shift+P` → `FXCompleter: Add all missing imports`): Adds all missing imports at once

### Unused Import Detection
- **Unused import hints**: Imports whose class is not used as a tag are shown as Information diagnostics in the Problems panel
- **Remove unused import**: Individual code action on each unused import hint
- **Remove all unused imports** (`Ctrl+Shift+P` → `FXCompleter: Remove all unused imports`): Removes all unused `<?import ...?>` directives at once

### CSS Support (compatible with CSSFX)
- **Inline style completions**: Inside `style="..."` attributes
- **CSS property completions**: 230+ JavaFX-specific `-fx-*` properties
- **Class selector completions**: `.button`, `.label`, `.text-field`, etc.
- **Pseudo-class support**: `:hover`, `:focused`, `:disabled`, etc.
- **Stylesheet file completions**: In `stylesheets="..."` attributes, searches workspace for `.css` and `.fx.css` files
- **CSS hover**: Documentation on hover for CSS properties

### Validation
- **Unknown component warnings**: Detects FXML tags that don't match any JavaFX class
- **Missing import warnings**: Detects when a component's import is missing
- **Unknown attribute warnings**: Detects invalid attributes for a component
- **Unused import hints**: Detects imports not used in the current file

### Controller Support
- **Event handler completion**: When typing `#` in an `onAction` attribute, suggests methods from the controller Java class
- **Go to Definition**: Jump from `fx:controller` to the controller Java file, or from `stylesheets` to the CSS file

### Snippets
- `!` or `fxml`: Full FXML boilerplate
- `scene`, `anchor`, `border`, `vbox`, `hbox`, `grid`, `dialog`, `table`: Common layout snippets
- `controller`, `import`: Quick import directives

## Requirements

- VS Code 1.85+
- Java 17+ (for JavaFX controller files)

## Usage

1. Open any `.fxml` file
2. Start typing `<` to trigger tag completions, or ` ` inside a tag for attribute completions
3. Accept a completion with `Tab` or `Enter`
4. The import is added automatically; if not, use the lightbulb or command palette

### Commands

| Command | Description |
|---------|-------------|
| `FXCompleter: Add all missing imports` | Adds all missing `<?import ...?>` directives |
| `FXCompleter: Remove all unused imports` | Removes all unused `<?import ...?>` directives |

## Known Limitations (Beta)

- **`fx:include`, `fx:define`, `fx:script`, `fx:root`**: Not yet supported for autocomplete
- **Resource bundles** (`%key`): Not yet resolved
- **Controller parsing**: Simple regex-based, may not handle complex Java generics or annotations
- **Performance**: Large files (>1000 lines) may show slower completions
- **Extension unbundled**: Contains 570 files; bundled version planned for future release

## Release Notes

See [CHANGELOG.md](CHANGELOG.md) for version history.

## License

MIT License — see [LICENSE](LICENSE) for details.
