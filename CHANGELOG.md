# Change Log

## [0.0.2] - 2026-06-16

### Fixed
- Unused import diagnostics changed from `Hint` to `Information` severity (now visible in Problems panel)
- Import line detection uses regex instead of `String.includes()` — tolerates extra whitespace
- Individual remove import code action now removes the trailing newline (no empty lines left behind)
- "Remove all unused imports" command now removes trailing newlines
- Added missing `executeCommandProvider` capability — commands now work reliably
- Removed broken CSS folding ranges, document colors, and color presentations (these don't apply to FXML)
- Removed unused variables in validator.ts (`workspaceRoot`, `selfClosingTags`, `closedTags`, `tagsWithClose`)
- Added `documents.onDidClose` handler to clean up `prevDocTags` memory on document close

### Added
- Extension icon (blue rounded square with `<>` and "FXML" text)
- `galleryBanner` colors in package.json for VS Code marketplace
- `Snippets` category for better marketplace discoverability

### Changed
- `executeCommandProvider` now properly advertises supported commands to the client
- Updated README.md with unused import detection documentation and updated limitations

## [0.0.1] - 2026-06-16

### Added
- FXML tag completion with multiple variants per component (71 components)
- Attribute completion: common, layout, event handler, component-specific
- Auto-import of `<?import ...?>` directives on tag insertion
- Missing import validation with quick-fix code actions
- "Fix all missing imports" command
- Unused import validation (information) with remove quick-fix
- "Remove all unused imports" command
- CSS inline style completion with 230+ JavaFX `-fx-*` properties
- CSS class selector and pseudo-class completions
- CSS stylesheet file path completions
- CSS hover documentation
- FXML boilerplate snippets (`!`, `fxml`, `scene`, etc.)
- Event handler method completion from controller classes
- Go to Definition for `fx:controller` and `stylesheets`
- Basic FXML indentation formatting
- Unknown component and unknown attribute warnings
- Sub-tag recognition (`<top>`, `<center>`, `<xAxis>`, `<yAxis>`, `<columns>`, etc.)
- FXML language configuration (syntax highlighting, auto-closing pairs, folding)

### Notes
- This is a **beta** release. Features are functional but may have rough edges.
- CSS data sourced from CSSFX project for JavaFX property coverage.
