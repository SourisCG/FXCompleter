export interface Variant {
  label: string
  snippet: string
  sortText: string
  description?: string
}

export interface FxmlComponent {
  tag: string
  importPath: string
  description: string
  categories: string[]
  attributes: string[]
  variants?: Variant[]
  isContainer?: boolean
}

export const fxmlComponents: FxmlComponent[] = [
  // ===== LAYOUT PANES =====
  {
    tag: 'AnchorPane',
    importPath: 'javafx.scene.layout.AnchorPane',
    description: 'Anchor pane lays out children at constrained positions relative to the edges',
    categories: ['Layout'],
    attributes: ['fx:id', 'style', 'styleClass', 'prefWidth', 'prefHeight', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight'],
    isContainer: true,
    variants: [
      { label: 'AnchorPane (with children)', snippet: '<AnchorPane>\n\t$1\n</AnchorPane>', sortText: '01', description: 'Container with children' },
      { label: 'AnchorPane (self-closing)', snippet: '<AnchorPane $1/>', sortText: '02', description: 'Self-closing tag' },
      { label: 'AnchorPane (with fx:id)', snippet: '<AnchorPane fx:id="$1">\n\t$2\n</AnchorPane>', sortText: '03', description: 'With fx:id attribute' }
    ]
  },
  {
    tag: 'VBox',
    importPath: 'javafx.scene.layout.VBox',
    description: 'Vertical layout pane',
    categories: ['Layout'],
    attributes: ['fx:id', 'style', 'styleClass', 'spacing', 'alignment', 'fillWidth', 'prefWidth', 'prefHeight'],
    isContainer: true,
    variants: [
      { label: 'VBox (with children)', snippet: '<VBox>\n\t$1\n</VBox>', sortText: '01', description: 'Container with children' },
      { label: 'VBox (with spacing)', snippet: '<VBox spacing="$1">\n\t$2\n</VBox>', sortText: '02', description: 'With spacing attribute' },
      { label: 'VBox (self-closing)', snippet: '<VBox $1/>', sortText: '03', description: 'Self-closing tag' }
    ]
  },
  {
    tag: 'HBox',
    importPath: 'javafx.scene.layout.HBox',
    description: 'Horizontal layout pane',
    categories: ['Layout'],
    attributes: ['fx:id', 'style', 'styleClass', 'spacing', 'alignment', 'fillHeight', 'prefWidth', 'prefHeight'],
    isContainer: true,
    variants: [
      { label: 'HBox (with children)', snippet: '<HBox>\n\t$1\n</HBox>', sortText: '01', description: 'Container with children' },
      { label: 'HBox (with spacing)', snippet: '<HBox spacing="$1">\n\t$2\n</HBox>', sortText: '02', description: 'With spacing attribute' },
      { label: 'HBox (self-closing)', snippet: '<HBox $1/>', sortText: '03', description: 'Self-closing tag' }
    ]
  },
  {
    tag: 'GridPane',
    importPath: 'javafx.scene.layout.GridPane',
    description: 'Grid-based layout pane',
    categories: ['Layout'],
    attributes: ['fx:id', 'style', 'styleClass', 'hgap', 'vgap', 'alignment', 'prefWidth', 'prefHeight', 'gridLinesVisible'],
    isContainer: true,
    variants: [
      { label: 'GridPane (with children)', snippet: '<GridPane>\n\t$1\n</GridPane>', sortText: '01', description: 'Container with children' },
      { label: 'GridPane (with fx:id)', snippet: '<GridPane fx:id="$1">\n\t$2\n</GridPane>', sortText: '02', description: 'With fx:id attribute' },
      { label: 'GridPane (self-closing)', snippet: '<GridPane $1/>', sortText: '03', description: 'Self-closing tag' }
    ]
  },
  {
    tag: 'BorderPane',
    importPath: 'javafx.scene.layout.BorderPane',
    description: 'Layout pane with top, bottom, left, right, and center regions',
    categories: ['Layout'],
    attributes: ['fx:id', 'style', 'styleClass', 'prefWidth', 'prefHeight'],
    isContainer: true,
    variants: [
      { label: 'BorderPane (with regions)', snippet: '<BorderPane>\n\t<top>$1</top>\n\t<center>$2</center>\n\t<left>$3</left>\n\t<right>$4</right>\n\t<bottom>$5</bottom>\n</BorderPane>', sortText: '01', description: 'With all regions' },
      { label: 'BorderPane (with children)', snippet: '<BorderPane>\n\t$1\n</BorderPane>', sortText: '02', description: 'Container with children' },
      { label: 'BorderPane (self-closing)', snippet: '<BorderPane $1/>', sortText: '03', description: 'Self-closing tag' }
    ]
  },
  {
    tag: 'StackPane',
    importPath: 'javafx.scene.layout.StackPane',
    description: 'Stack of overlapping children',
    categories: ['Layout'],
    attributes: ['fx:id', 'style', 'styleClass', 'alignment', 'prefWidth', 'prefHeight'],
    isContainer: true,
    variants: [
      { label: 'StackPane (with children)', snippet: '<StackPane>\n\t$1\n</StackPane>', sortText: '01', description: 'Container with children' },
      { label: 'StackPane (self-closing)', snippet: '<StackPane $1/>', sortText: '02', description: 'Self-closing tag' }
    ]
  },
  {
    tag: 'FlowPane',
    importPath: 'javafx.scene.layout.FlowPane',
    description: 'Flow layout pane that wraps children',
    categories: ['Layout'],
    attributes: ['fx:id', 'style', 'styleClass', 'orientation', 'hgap', 'vgap', 'alignment', 'prefWidth', 'prefHeight'],
    isContainer: true,
    variants: [
      { label: 'FlowPane (with children)', snippet: '<FlowPane>\n\t$1\n</FlowPane>', sortText: '01', description: 'Container with children' },
      { label: 'FlowPane (self-closing)', snippet: '<FlowPane $1/>', sortText: '02', description: 'Self-closing tag' }
    ]
  },
  {
    tag: 'TilePane',
    importPath: 'javafx.scene.layout.TilePane',
    description: 'Grid of uniformly sized tiles',
    categories: ['Layout'],
    attributes: ['fx:id', 'style', 'styleClass', 'orientation', 'hgap', 'vgap', 'alignment', 'prefRows', 'prefColumns', 'prefTileWidth', 'prefTileHeight'],
    isContainer: true,
    variants: [
      { label: 'TilePane (with children)', snippet: '<TilePane>\n\t$1\n</TilePane>', sortText: '01', description: 'Container with children' },
      { label: 'TilePane (self-closing)', snippet: '<TilePane $1/>', sortText: '02', description: 'Self-closing tag' }
    ]
  },
  {
    tag: 'Pane',
    importPath: 'javafx.scene.layout.Pane',
    description: 'Base layout pane without automatic layout',
    categories: ['Layout'],
    attributes: ['fx:id', 'style', 'styleClass'],
    isContainer: true,
    variants: [
      { label: 'Pane (with children)', snippet: '<Pane>\n\t$1\n</Pane>', sortText: '01', description: 'Container with children' },
      { label: 'Pane (self-closing)', snippet: '<Pane $1/>', sortText: '02', description: 'Self-closing tag' }
    ]
  },
  {
    tag: 'Region',
    importPath: 'javafx.scene.layout.Region',
    description: 'Base region for layout panes and controls',
    categories: ['Layout'],
    attributes: ['fx:id', 'style', 'styleClass', 'prefWidth', 'prefHeight', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'padding', 'background', 'border'],
    isContainer: true,
    variants: [
      { label: 'Region (with children)', snippet: '<Region>\n\t$1\n</Region>', sortText: '01', description: 'Container with children' },
      { label: 'Region (self-closing)', snippet: '<Region $1/>', sortText: '02', description: 'Self-closing tag' }
    ]
  },

  // ===== CONTROLS =====
  {
    tag: 'Button',
    importPath: 'javafx.scene.control.Button',
    description: 'A button control',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'onAction', 'style', 'styleClass', 'prefWidth', 'prefHeight', 'disable', 'visible', 'managed', 'graphic', 'contentDisplay', 'alignment', 'textAlignment', 'underline', 'wrapText', 'font', 'textFill', 'tooltip'],
    variants: [
      { label: 'Button', snippet: '<Button $1/>', sortText: '01', description: 'Self-closing button' },
      { label: 'Button (with children)', snippet: '<Button>$1</Button>', sortText: '02', description: 'Button with children' },
      { label: 'Button (with text)', snippet: '<Button text="$1"/>', sortText: '03', description: 'Button with text attribute' },
      { label: 'Button (onAction)', snippet: '<Button text="$1" onAction="#$2"/>', sortText: '04', description: 'Button with event handler' }
    ]
  },
  {
    tag: 'Label',
    importPath: 'javafx.scene.control.Label',
    description: 'A label control',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'style', 'styleClass', 'prefWidth', 'prefHeight', 'alignment', 'textAlignment', 'wrapText', 'font', 'textFill', 'underline', 'graphic', 'contentDisplay', 'labelFor'],
    variants: [
      { label: 'Label (with text)', snippet: '<Label text="$1"/>', sortText: '01', description: 'Label with text attribute' },
      { label: 'Label (with children)', snippet: '<Label>$1</Label>', sortText: '02', description: 'Label with children' },
      { label: 'Label (self-closing)', snippet: '<Label $1/>', sortText: '03', description: 'Self-closing label' }
    ]
  },
  {
    tag: 'TextField',
    importPath: 'javafx.scene.control.TextField',
    description: 'Text input field',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'promptText', 'onAction', 'style', 'styleClass', 'prefWidth', 'prefHeight', 'disable', 'editable', 'visible', 'alignment', 'font'],
    variants: [
      { label: 'TextField (with fx:id)', snippet: '<TextField fx:id="$1"/>', sortText: '01', description: 'TextField with fx:id' },
      { label: 'TextField (with prompt)', snippet: '<TextField promptText="$1"/>', sortText: '02', description: 'TextField with prompt text' },
      { label: 'TextField (self-closing)', snippet: '<TextField $1/>', sortText: '03', description: 'Self-closing TextField' }
    ]
  },
  {
    tag: 'PasswordField',
    importPath: 'javafx.scene.control.PasswordField',
    description: 'Password input field',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'promptText', 'onAction', 'style', 'styleClass', 'prefWidth', 'disable', 'editable'],
    variants: [
      { label: 'PasswordField (with fx:id)', snippet: '<PasswordField fx:id="$1"/>', sortText: '01', description: 'PasswordField with fx:id' },
      { label: 'PasswordField', snippet: '<PasswordField $1/>', sortText: '02', description: 'Self-closing PasswordField' }
    ]
  },
  {
    tag: 'TextArea',
    importPath: 'javafx.scene.control.TextArea',
    description: 'Multi-line text input area',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'promptText', 'style', 'styleClass', 'prefWidth', 'prefHeight', 'prefColumnCount', 'prefRowCount', 'wrapText', 'disable', 'editable', 'scrollTop', 'scrollLeft'],
    variants: [
      { label: 'TextArea (with fx:id)', snippet: '<TextArea fx:id="$1"/>', sortText: '01', description: 'TextArea with fx:id' },
      { label: 'TextArea', snippet: '<TextArea $1/>', sortText: '02', description: 'Self-closing TextArea' }
    ]
  },
  {
    tag: 'CheckBox',
    importPath: 'javafx.scene.control.CheckBox',
    description: 'A checkbox control',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'selected', 'onAction', 'style', 'styleClass', 'disable', 'indeterminate', 'allowIndeterminate', 'alignment'],
    variants: [
      { label: 'CheckBox (with text)', snippet: '<CheckBox text="$1"/>', sortText: '01', description: 'CheckBox with text' },
      { label: 'CheckBox', snippet: '<CheckBox $1/>', sortText: '02', description: 'Self-closing CheckBox' },
      { label: 'CheckBox (selected)', snippet: '<CheckBox text="$1" selected="true"/>', sortText: '03', description: 'CheckBox pre-selected' }
    ]
  },
  {
    tag: 'RadioButton',
    importPath: 'javafx.scene.control.RadioButton',
    description: 'A radio button control',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'selected', 'toggleGroup', 'onAction', 'style', 'styleClass', 'disable', 'alignment'],
    variants: [
      { label: 'RadioButton (with text)', snippet: '<RadioButton text="$1"/>', sortText: '01', description: 'RadioButton with text' },
      { label: 'RadioButton', snippet: '<RadioButton $1/>', sortText: '02', description: 'Self-closing RadioButton' }
    ]
  },
  {
    tag: 'ToggleButton',
    importPath: 'javafx.scene.control.ToggleButton',
    description: 'A toggle button control',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'selected', 'toggleGroup', 'onAction', 'style', 'styleClass', 'disable', 'alignment'],
    variants: [
      { label: 'ToggleButton (with text)', snippet: '<ToggleButton text="$1"/>', sortText: '01', description: 'ToggleButton with text' },
      { label: 'ToggleButton', snippet: '<ToggleButton $1/>', sortText: '02', description: 'Self-closing ToggleButton' }
    ]
  },
  {
    tag: 'Hyperlink',
    importPath: 'javafx.scene.control.Hyperlink',
    description: 'A hyperlink control',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'visited', 'onAction', 'style', 'styleClass', 'disable', 'font', 'underline'],
    variants: [
      { label: 'Hyperlink (with text)', snippet: '<Hyperlink text="$1"/>', sortText: '01', description: 'Hyperlink with text' },
      { label: 'Hyperlink', snippet: '<Hyperlink $1/>', sortText: '02', description: 'Self-closing Hyperlink' }
    ]
  },
  {
    tag: 'ComboBox',
    importPath: 'javafx.scene.control.ComboBox',
    description: 'A combo box control',
    categories: ['Controls'],
    attributes: ['fx:id', 'value', 'promptText', 'editable', 'visibleRowCount', 'onAction', 'style', 'styleClass', 'prefWidth', 'disable'],
    variants: [
      { label: 'ComboBox', snippet: '<ComboBox $1/>', sortText: '01', description: 'Self-closing ComboBox' },
      { label: 'ComboBox (with fx:id)', snippet: '<ComboBox fx:id="$1"/>', sortText: '02', description: 'ComboBox with fx:id' }
    ]
  },
  {
    tag: 'ChoiceBox',
    importPath: 'javafx.scene.control.ChoiceBox',
    description: 'A choice box control',
    categories: ['Controls'],
    attributes: ['fx:id', 'value', 'onAction', 'style', 'styleClass', 'prefWidth', 'disable'],
    variants: [
      { label: 'ChoiceBox', snippet: '<ChoiceBox $1/>', sortText: '01', description: 'Self-closing ChoiceBox' },
      { label: 'ChoiceBox (with fx:id)', snippet: '<ChoiceBox fx:id="$1"/>', sortText: '02', description: 'ChoiceBox with fx:id' }
    ]
  },
  {
    tag: 'ColorPicker',
    importPath: 'javafx.scene.control.ColorPicker',
    description: 'A color picker control',
    categories: ['Controls'],
    attributes: ['fx:id', 'value', 'onAction', 'style', 'styleClass', 'editable', 'disable'],
    variants: [
      { label: 'ColorPicker', snippet: '<ColorPicker $1/>', sortText: '01', description: 'Self-closing ColorPicker' },
      { label: 'ColorPicker (with fx:id)', snippet: '<ColorPicker fx:id="$1"/>', sortText: '02', description: 'ColorPicker with fx:id' }
    ]
  },
  {
    tag: 'DatePicker',
    importPath: 'javafx.scene.control.DatePicker',
    description: 'A date picker control',
    categories: ['Controls'],
    attributes: ['fx:id', 'value', 'promptText', 'editable', 'showWeekNumbers', 'onAction', 'style', 'styleClass', 'prefWidth', 'disable'],
    variants: [
      { label: 'DatePicker', snippet: '<DatePicker $1/>', sortText: '01', description: 'Self-closing DatePicker' },
      { label: 'DatePicker (with fx:id)', snippet: '<DatePicker fx:id="$1"/>', sortText: '02', description: 'DatePicker with fx:id' }
    ]
  },
  {
    tag: 'ListView',
    importPath: 'javafx.scene.control.ListView',
    description: 'A list view control',
    categories: ['Controls'],
    attributes: ['fx:id', 'style', 'styleClass', 'prefWidth', 'prefHeight', 'orientation', 'fixedCellSize', 'placeholder'],
    variants: [
      { label: 'ListView', snippet: '<ListView $1/>', sortText: '01', description: 'Self-closing ListView' },
      { label: 'ListView (with fx:id)', snippet: '<ListView fx:id="$1"/>', sortText: '02', description: 'ListView with fx:id' }
    ]
  },
  {
    tag: 'TableView',
    importPath: 'javafx.scene.control.TableView',
    description: 'A table view control',
    categories: ['Controls'],
    attributes: ['fx:id', 'style', 'styleClass', 'prefWidth', 'prefHeight', 'editable', 'fixedCellSize', 'placeholder', 'tableMenuButtonVisible', 'columnResizePolicy'],
    variants: [
      { label: 'TableView', snippet: '<TableView $1/>', sortText: '01', description: 'Self-closing TableView' },
      { label: 'TableView (with fx:id)', snippet: '<TableView fx:id="$1"/>', sortText: '02', description: 'TableView with fx:id' },
      { label: 'TableView (with columns)', snippet: '<TableView fx:id="$1">\n\t<columns>\n\t\t<TableColumn text="$2" />\n\t</columns>\n</TableView>', sortText: '03', description: 'TableView with columns' }
    ]
  },
  {
    tag: 'TableColumn',
    importPath: 'javafx.scene.control.TableColumn',
    description: 'A table column',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'prefWidth', 'minWidth', 'maxWidth', 'editable', 'resizable', 'sortable', 'visible', 'cellValueFactory', 'cellFactory'],
    variants: [
      { label: 'TableColumn (with text)', snippet: '<TableColumn text="$1"/>', sortText: '01', description: 'TableColumn with text' },
      { label: 'TableColumn', snippet: '<TableColumn $1/>', sortText: '02', description: 'Self-closing TableColumn' }
    ]
  },
  {
    tag: 'TreeView',
    importPath: 'javafx.scene.control.TreeView',
    description: 'A tree view control',
    categories: ['Controls'],
    attributes: ['fx:id', 'style', 'styleClass', 'prefWidth', 'prefHeight', 'editable', 'fixedCellSize', 'root', 'showRoot'],
    variants: [
      { label: 'TreeView', snippet: '<TreeView $1/>', sortText: '01', description: 'Self-closing TreeView' },
      { label: 'TreeView (with fx:id)', snippet: '<TreeView fx:id="$1"/>', sortText: '02', description: 'TreeView with fx:id' }
    ]
  },
  {
    tag: 'ScrollPane',
    importPath: 'javafx.scene.control.ScrollPane',
    description: 'A scrolling viewport',
    categories: ['Controls'],
    attributes: ['fx:id', 'style', 'styleClass', 'prefWidth', 'prefHeight', 'hbarPolicy', 'vbarPolicy', 'pannable', 'fitToWidth', 'fitToHeight', 'content'],
    isContainer: true,
    variants: [
      { label: 'ScrollPane (with content)', snippet: '<ScrollPane>\n\t$1\n</ScrollPane>', sortText: '01', description: 'ScrollPane with content' },
      { label: 'ScrollPane (self-closing)', snippet: '<ScrollPane $1/>', sortText: '02', description: 'Self-closing ScrollPane' }
    ]
  },
  {
    tag: 'Slider',
    importPath: 'javafx.scene.control.Slider',
    description: 'A slider control',
    categories: ['Controls'],
    attributes: ['fx:id', 'min', 'max', 'value', 'orientation', 'showTickLabels', 'showTickMarks', 'majorTickUnit', 'minorTickCount', 'snapToTicks', 'style', 'styleClass', 'prefWidth', 'prefHeight'],
    variants: [
      { label: 'Slider', snippet: '<Slider $1/>', sortText: '01', description: 'Self-closing Slider' },
      { label: 'Slider (horizontal)', snippet: '<Slider min="$1" max="$2" value="$3"/>', sortText: '02', description: 'Horizontal slider with range' }
    ]
  },
  {
    tag: 'ProgressBar',
    importPath: 'javafx.scene.control.ProgressBar',
    description: 'A progress bar control',
    categories: ['Controls'],
    attributes: ['fx:id', 'progress', 'style', 'styleClass', 'prefWidth'],
    variants: [
      { label: 'ProgressBar', snippet: '<ProgressBar $1/>', sortText: '01', description: 'Self-closing ProgressBar' },
      { label: 'ProgressBar (with progress)', snippet: '<ProgressBar progress="$1"/>', sortText: '02', description: 'ProgressBar with progress value' }
    ]
  },
  {
    tag: 'ProgressIndicator',
    importPath: 'javafx.scene.control.ProgressIndicator',
    description: 'A progress indicator control',
    categories: ['Controls'],
    attributes: ['fx:id', 'progress', 'style', 'styleClass'],
    variants: [
      { label: 'ProgressIndicator', snippet: '<ProgressIndicator $1/>', sortText: '01', description: 'Self-closing ProgressIndicator' }
    ]
  },
  {
    tag: 'Spinner',
    importPath: 'javafx.scene.control.Spinner',
    description: 'A spinner control',
    categories: ['Controls'],
    attributes: ['fx:id', 'value', 'min', 'max', 'initialValue', 'step', 'editable', 'style', 'styleClass', 'prefWidth'],
    variants: [
      { label: 'Spinner', snippet: '<Spinner $1/>', sortText: '01', description: 'Self-closing Spinner' },
      { label: 'Spinner (with range)', snippet: '<Spinner min="$1" max="$2" initialValue="$3"/>', sortText: '02', description: 'Spinner with range' }
    ]
  },
  {
    tag: 'Separator',
    importPath: 'javafx.scene.control.Separator',
    description: 'A separator control',
    categories: ['Controls'],
    attributes: ['fx:id', 'orientation', 'style', 'styleClass', 'halignment', 'valignment'],
    variants: [
      { label: 'Separator', snippet: '<Separator $1/>', sortText: '01', description: 'Self-closing Separator' },
      { label: 'Separator (horizontal)', snippet: '<Separator orientation="horizontal"/>', sortText: '02', description: 'Horizontal separator' }
    ]
  },
  {
    tag: 'TabPane',
    importPath: 'javafx.scene.control.TabPane',
    description: 'A tab pane control',
    categories: ['Controls'],
    attributes: ['fx:id', 'side', 'tabClosingPolicy', 'tabMinWidth', 'tabMaxWidth', 'tabMinHeight', 'tabMaxHeight', 'rotateGraphic', 'style', 'styleClass', 'prefWidth', 'prefHeight'],
    isContainer: true,
    variants: [
      { label: 'TabPane (with tabs)', snippet: '<TabPane>\n\t$1\n</TabPane>', sortText: '01', description: 'TabPane with tabs' },
      { label: 'TabPane (self-closing)', snippet: '<TabPane $1/>', sortText: '02', description: 'Self-closing TabPane' }
    ]
  },
  {
    tag: 'Tab',
    importPath: 'javafx.scene.control.Tab',
    description: 'A tab inside a TabPane',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'closable', 'disable', 'content', 'graphic', 'tooltip', 'style'],
    isContainer: true,
    variants: [
      { label: 'Tab (with text)', snippet: '<Tab text="$1">\n\t$2\n</Tab>', sortText: '01', description: 'Tab with text and content' },
      { label: 'Tab (self-closing)', snippet: '<Tab text="$1"/>', sortText: '02', description: 'Self-closing Tab' }
    ]
  },
  {
    tag: 'TitledPane',
    importPath: 'javafx.scene.control.TitledPane',
    description: 'A titled pane control',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'expanded', 'animated', 'collapsible', 'style', 'styleClass', 'prefWidth', 'prefHeight'],
    isContainer: true,
    variants: [
      { label: 'TitledPane (with content)', snippet: '<TitledPane text="$1">\n\t$2\n</TitledPane>', sortText: '01', description: 'TitledPane with text and content' },
      { label: 'TitledPane (self-closing)', snippet: '<TitledPane $1/>', sortText: '02', description: 'Self-closing TitledPane' }
    ]
  },
  {
    tag: 'Accordion',
    importPath: 'javafx.scene.control.Accordion',
    description: 'An accordion control that contains multiple TitledPanes',
    categories: ['Controls'],
    attributes: ['fx:id', 'style', 'styleClass', 'prefWidth', 'prefHeight'],
    isContainer: true,
    variants: [
      { label: 'Accordion (with panes)', snippet: '<Accordion>\n\t$1\n</Accordion>', sortText: '01', description: 'Accordion with TitledPanes' },
      { label: 'Accordion', snippet: '<Accordion $1/>', sortText: '02', description: 'Self-closing Accordion' }
    ]
  },
  {
    tag: 'SplitPane',
    importPath: 'javafx.scene.control.SplitPane',
    description: 'A split pane control',
    categories: ['Controls'],
    attributes: ['fx:id', 'orientation', 'dividerPositions', 'style', 'styleClass', 'prefWidth', 'prefHeight'],
    isContainer: true,
    variants: [
      { label: 'SplitPane (with items)', snippet: '<SplitPane>\n\t$1\n</SplitPane>', sortText: '01', description: 'SplitPane with items' },
      { label: 'SplitPane (self-closing)', snippet: '<SplitPane $1/>', sortText: '02', description: 'Self-closing SplitPane' }
    ]
  },
  {
    tag: 'ToolBar',
    importPath: 'javafx.scene.control.ToolBar',
    description: 'A toolbar control',
    categories: ['Controls'],
    attributes: ['fx:id', 'orientation', 'style', 'styleClass'],
    isContainer: true,
    variants: [
      { label: 'ToolBar (with items)', snippet: '<ToolBar>\n\t$1\n</ToolBar>', sortText: '01', description: 'ToolBar with items' },
      { label: 'ToolBar (self-closing)', snippet: '<ToolBar $1/>', sortText: '02', description: 'Self-closing ToolBar' }
    ]
  },
  {
    tag: 'MenuBar',
    importPath: 'javafx.scene.control.MenuBar',
    description: 'A menu bar control',
    categories: ['Controls'],
    attributes: ['fx:id', 'useSystemMenuBar', 'style', 'styleClass'],
    isContainer: true,
    variants: [
      { label: 'MenuBar (with menus)', snippet: '<MenuBar>\n\t$1\n</MenuBar>', sortText: '01', description: 'MenuBar with menus' },
      { label: 'MenuBar (self-closing)', snippet: '<MenuBar $1/>', sortText: '02', description: 'Self-closing MenuBar' }
    ]
  },
  {
    tag: 'Menu',
    importPath: 'javafx.scene.control.Menu',
    description: 'A menu in a menu bar',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'disable', 'visible', 'graphic', 'style'],
    isContainer: true,
    variants: [
      { label: 'Menu (with items)', snippet: '<Menu text="$1">\n\t$2\n</Menu>', sortText: '01', description: 'Menu with menu items' },
      { label: 'Menu (self-closing)', snippet: '<Menu text="$1"/>', sortText: '02', description: 'Self-closing Menu' }
    ]
  },
  {
    tag: 'MenuItem',
    importPath: 'javafx.scene.control.MenuItem',
    description: 'A menu item',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'accelerator', 'onAction', 'disable', 'visible', 'graphic', 'style'],
    variants: [
      { label: 'MenuItem (with text)', snippet: '<MenuItem text="$1"/>', sortText: '01', description: 'MenuItem with text' },
      { label: 'MenuItem (with action)', snippet: '<MenuItem text="$1" onAction="#$2"/>', sortText: '02', description: 'MenuItem with action' }
    ]
  },
  {
    tag: 'CheckMenuItem',
    importPath: 'javafx.scene.control.CheckMenuItem',
    description: 'A checkable menu item',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'selected', 'onAction', 'disable', 'style'],
    variants: [
      { label: 'CheckMenuItem (with text)', snippet: '<CheckMenuItem text="$1"/>', sortText: '01', description: 'CheckMenuItem with text' },
      { label: 'CheckMenuItem (selected)', snippet: '<CheckMenuItem text="$1" selected="true"/>', sortText: '02', description: 'CheckMenuItem pre-selected' }
    ]
  },
  {
    tag: 'RadioMenuItem',
    importPath: 'javafx.scene.control.RadioMenuItem',
    description: 'A radio menu item',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'selected', 'toggleGroup', 'onAction', 'disable', 'style'],
    variants: [
      { label: 'RadioMenuItem (with text)', snippet: '<RadioMenuItem text="$1"/>', sortText: '01', description: 'RadioMenuItem with text' }
    ]
  },
  {
    tag: 'MenuButton',
    importPath: 'javafx.scene.control.MenuButton',
    description: 'A menu button control',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'onAction', 'style', 'styleClass', 'popupSide', 'disable'],
    isContainer: true,
    variants: [
      { label: 'MenuButton', snippet: '<MenuButton text="$1">\n\t$2\n</MenuButton>', sortText: '01', description: 'MenuButton with items' }
    ]
  },
  {
    tag: 'SplitMenuButton',
    importPath: 'javafx.scene.control.SplitMenuButton',
    description: 'A split menu button control',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'onAction', 'style', 'styleClass', 'disable'],
    isContainer: true,
    variants: [
      { label: 'SplitMenuButton', snippet: '<SplitMenuButton text="$1">\n\t$2\n</SplitMenuButton>', sortText: '01', description: 'SplitMenuButton with items' }
    ]
  },
  {
    tag: 'Pagination',
    importPath: 'javafx.scene.control.Pagination',
    description: 'A pagination control',
    categories: ['Controls'],
    attributes: ['fx:id', 'pageCount', 'currentPageIndex', 'maxPageIndicatorCount', 'style', 'styleClass', 'prefWidth', 'prefHeight'],
    variants: [
      { label: 'Pagination', snippet: '<Pagination $1/>', sortText: '01', description: 'Self-closing Pagination' }
    ]
  },
  {
    tag: 'DialogPane',
    importPath: 'javafx.scene.control.DialogPane',
    description: 'A dialog pane control',
    categories: ['Controls'],
    attributes: ['fx:id', 'headerText', 'contentText', 'expandableContent', 'expanded', 'style', 'styleClass', 'prefWidth', 'prefHeight'],
    isContainer: true,
    variants: [
      { label: 'DialogPane', snippet: '<DialogPane>\n\t$1\n</DialogPane>', sortText: '01', description: 'DialogPane with content' }
    ]
  },
  {
    tag: 'Tooltip',
    importPath: 'javafx.scene.control.Tooltip',
    description: 'A tooltip control',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'showDelay', 'showDuration', 'hideDelay', 'style', 'styleClass', 'font'],
    variants: [
      { label: 'Tooltip', snippet: '<Tooltip text="$1"/>', sortText: '01', description: 'Tooltip with text' }
    ]
  },
  {
    tag: 'HTMLEditor',
    importPath: 'javafx.scene.web.HTMLEditor',
    description: 'An HTML editor control',
    categories: ['Controls'],
    attributes: ['fx:id', 'htmlText', 'style', 'styleClass', 'prefWidth', 'prefHeight'],
    variants: [
      { label: 'HTMLEditor', snippet: '<HTMLEditor $1/>', sortText: '01', description: 'Self-closing HTMLEditor' }
    ]
  },

  // ===== SHAPES =====
  {
    tag: 'Rectangle',
    importPath: 'javafx.scene.shape.Rectangle',
    description: 'A rectangle shape',
    categories: ['Shapes'],
    attributes: ['fx:id', 'x', 'y', 'width', 'height', 'arcWidth', 'arcHeight', 'fill', 'stroke', 'strokeWidth', 'strokeType', 'smooth', 'style'],
    variants: [
      { label: 'Rectangle', snippet: '<Rectangle $1/>', sortText: '01', description: 'Self-closing Rectangle' },
      { label: 'Rectangle (dimensions)', snippet: '<Rectangle width="$1" height="$2"/>', sortText: '02', description: 'Rectangle with dimensions' }
    ]
  },
  {
    tag: 'Circle',
    importPath: 'javafx.scene.shape.Circle',
    description: 'A circle shape',
    categories: ['Shapes'],
    attributes: ['fx:id', 'centerX', 'centerY', 'radius', 'fill', 'stroke', 'strokeWidth', 'strokeType', 'smooth', 'style'],
    variants: [
      { label: 'Circle', snippet: '<Circle $1/>', sortText: '01', description: 'Self-closing Circle' },
      { label: 'Circle (with radius)', snippet: '<Circle radius="$1"/>', sortText: '02', description: 'Circle with radius' }
    ]
  },
  {
    tag: 'Ellipse',
    importPath: 'javafx.scene.shape.Ellipse',
    description: 'An ellipse shape',
    categories: ['Shapes'],
    attributes: ['fx:id', 'centerX', 'centerY', 'radiusX', 'radiusY', 'fill', 'stroke', 'strokeWidth', 'strokeType', 'smooth', 'style'],
    variants: [
      { label: 'Ellipse', snippet: '<Ellipse $1/>', sortText: '01', description: 'Self-closing Ellipse' }
    ]
  },
  {
    tag: 'Line',
    importPath: 'javafx.scene.shape.Line',
    description: 'A line shape',
    categories: ['Shapes'],
    attributes: ['fx:id', 'startX', 'startY', 'endX', 'endY', 'stroke', 'strokeWidth', 'strokeLineCap', 'smooth', 'style'],
    variants: [
      { label: 'Line', snippet: '<Line $1/>', sortText: '01', description: 'Self-closing Line' }
    ]
  },
  {
    tag: 'Text',
    importPath: 'javafx.scene.text.Text',
    description: 'A text shape',
    categories: ['Shapes'],
    attributes: ['fx:id', 'x', 'y', 'text', 'font', 'fill', 'stroke', 'strokeWidth', 'textAlignment', 'wrappingWidth', 'underline', 'strikethrough', 'style'],
    variants: [
      { label: 'Text (with content)', snippet: '<Text text="$1"/>', sortText: '01', description: 'Text with content' },
      { label: 'Text (positioned)', snippet: '<Text text="$1" x="$2" y="$3"/>', sortText: '02', description: 'Text positioned' }
    ]
  },
  {
    tag: 'ImageView',
    importPath: 'javafx.scene.image.ImageView',
    description: 'An image view',
    categories: ['Shapes'],
    attributes: ['fx:id', 'image', 'fitWidth', 'fitHeight', 'preserveRatio', 'smooth', 'style', 'x', 'y'],
    variants: [
      { label: 'ImageView (with image)', snippet: '<ImageView $1/>', sortText: '01', description: 'Self-closing ImageView' },
      { label: 'ImageView (fit)', snippet: '<ImageView fitWidth="$1" fitHeight="$2" preserveRatio="true"/>', sortText: '02', description: 'ImageView with fitting' }
    ]
  },

  // ===== CHARTS =====
  {
    tag: 'BarChart',
    importPath: 'javafx.scene.chart.BarChart',
    description: 'A bar chart',
    categories: ['Charts'],
    attributes: ['fx:id', 'title', 'data', 'legendSide', 'legendVisible', 'titleSide', 'animated', 'style', 'prefWidth', 'prefHeight', 'barGap', 'categoryGap'],
    isContainer: true,
    variants: [
      { label: 'BarChart', snippet: '<BarChart $1/>', sortText: '01', description: 'Self-closing BarChart' },
      { label: 'BarChart (with data)', snippet: '<BarChart fx:id="$1">\n\t<xAxis>\n\t\t<CategoryAxis side="bottom" />\n\t</xAxis>\n\t<yAxis>\n\t\t<NumberAxis side="left" />\n\t</yAxis>\n</BarChart>', sortText: '02', description: 'BarChart with axes' }
    ]
  },
  {
    tag: 'LineChart',
    importPath: 'javafx.scene.chart.LineChart',
    description: 'A line chart',
    categories: ['Charts'],
    attributes: ['fx:id', 'title', 'data', 'legendSide', 'legendVisible', 'titleSide', 'animated', 'style', 'prefWidth', 'prefHeight', 'createSymbols'],
    isContainer: true,
    variants: [
      { label: 'LineChart', snippet: '<LineChart $1/>', sortText: '01', description: 'Self-closing LineChart' },
      { label: 'LineChart (with axes)', snippet: '<LineChart fx:id="$1">\n\t<xAxis>\n\t\t<CategoryAxis side="bottom" />\n\t</xAxis>\n\t<yAxis>\n\t\t<NumberAxis side="left" />\n\t</yAxis>\n</LineChart>', sortText: '02', description: 'LineChart with axes' }
    ]
  },
  {
    tag: 'PieChart',
    importPath: 'javafx.scene.chart.PieChart',
    description: 'A pie chart',
    categories: ['Charts'],
    attributes: ['fx:id', 'title', 'data', 'legendSide', 'legendVisible', 'titleSide', 'animated', 'style', 'prefWidth', 'prefHeight', 'clockwise', 'pieLabelVisible', 'labelLineLength', 'startAngle'],
    isContainer: true,
    variants: [
      { label: 'PieChart', snippet: '<PieChart $1/>', sortText: '01', description: 'Self-closing PieChart' },
      { label: 'PieChart (with data)', snippet: '<PieChart fx:id="$1">\n\t$2\n</PieChart>', sortText: '02', description: 'PieChart with data' }
    ]
  },
  {
    tag: 'ScatterChart',
    importPath: 'javafx.scene.chart.ScatterChart',
    description: 'A scatter chart',
    categories: ['Charts'],
    attributes: ['fx:id', 'title', 'data', 'legendSide', 'legendVisible', 'titleSide', 'animated', 'style', 'prefWidth', 'prefHeight'],
    isContainer: true,
    variants: [
      { label: 'ScatterChart', snippet: '<ScatterChart $1/>', sortText: '01', description: 'Self-closing ScatterChart' }
    ]
  },
  {
    tag: 'AreaChart',
    importPath: 'javafx.scene.chart.AreaChart',
    description: 'An area chart',
    categories: ['Charts'],
    attributes: ['fx:id', 'title', 'data', 'legendSide', 'legendVisible', 'titleSide', 'animated', 'style', 'prefWidth', 'prefHeight'],
    isContainer: true,
    variants: [
      { label: 'AreaChart', snippet: '<AreaChart $1/>', sortText: '01', description: 'Self-closing AreaChart' }
    ]
  },
  {
    tag: 'BubbleChart',
    importPath: 'javafx.scene.chart.BubbleChart',
    description: 'A bubble chart',
    categories: ['Charts'],
    attributes: ['fx:id', 'title', 'data', 'legendSide', 'legendVisible', 'titleSide', 'animated', 'style', 'prefWidth', 'prefHeight'],
    isContainer: true,
    variants: [
      { label: 'BubbleChart', snippet: '<BubbleChart $1/>', sortText: '01', description: 'Self-closing BubbleChart' }
    ]
  },
  {
    tag: 'CategoryAxis',
    importPath: 'javafx.scene.chart.CategoryAxis',
    description: 'A category axis for charts',
    categories: ['Charts'],
    attributes: ['fx:id', 'side', 'label', 'style', 'tickLabelRotation', 'categories', 'startMargin', 'endMargin', 'gapStartAndEnd'],
    variants: [
      { label: 'CategoryAxis', snippet: '<CategoryAxis side="$1"/>', sortText: '01', description: 'Category axis' }
    ]
  },
  {
    tag: 'NumberAxis',
    importPath: 'javafx.scene.chart.NumberAxis',
    description: 'A number axis for charts',
    categories: ['Charts'],
    attributes: ['fx:id', 'side', 'label', 'style', 'autoRanging', 'lowerBound', 'upperBound', 'tickUnit', 'tickLabelFormatter'],
    variants: [
      { label: 'NumberAxis', snippet: '<NumberAxis side="$1"/>', sortText: '01', description: 'Number axis' }
    ]
  },

  // ===== MISC =====
  {
    tag: 'Scene',
    importPath: 'javafx.scene.Scene',
    description: 'The root scene',
    categories: ['Misc'],
    attributes: ['width', 'height', 'fill', 'stylesheets', 'cursor'],
    isContainer: true,
    variants: [
      { label: 'Scene (with dimensions)', snippet: '<Scene width="$1" height="$2">\n\t$3\n</Scene>', sortText: '01', description: 'Scene with width and height' },
      { label: 'Scene (self-closing)', snippet: '<Scene width="$1" height="$2" />', sortText: '02', description: 'Self-closing Scene' }
    ]
  },
  {
    tag: 'WebView',
    importPath: 'javafx.scene.web.WebView',
    description: 'A web view control',
    categories: ['Misc'],
    attributes: ['fx:id', 'prefWidth', 'prefHeight', 'style', 'fontScale', 'zoom'],
    variants: [
      { label: 'WebView', snippet: '<WebView $1/>', sortText: '01', description: 'Self-closing WebView' }
    ]
  },
  {
    tag: 'MediaView',
    importPath: 'javafx.scene.media.MediaView',
    description: 'A media view control',
    categories: ['Misc'],
    attributes: ['fx:id', 'mediaPlayer', 'fitWidth', 'fitHeight', 'preserveRatio', 'smooth', 'style', 'x', 'y'],
    variants: [
      { label: 'MediaView', snippet: '<MediaView $1/>', sortText: '01', description: 'Self-closing MediaView' }
    ]
  },
  {
    tag: 'Canvas',
    importPath: 'javafx.scene.canvas.Canvas',
    description: 'A canvas for drawing',
    categories: ['Misc'],
    attributes: ['fx:id', 'width', 'height', 'style'],
    variants: [
      { label: 'Canvas', snippet: '<Canvas $1/>', sortText: '01', description: 'Self-closing Canvas' }
    ]
  },
  {
    tag: 'Group',
    importPath: 'javafx.scene.Group',
    description: 'A group of nodes',
    categories: ['Misc'],
    attributes: ['fx:id', 'style'],
    isContainer: true,
    variants: [
      { label: 'Group (with children)', snippet: '<Group>\n\t$1\n</Group>', sortText: '01', description: 'Group with children' },
      { label: 'Group (self-closing)', snippet: '<Group $1/>', sortText: '02', description: 'Self-closing Group' }
    ]
  },
  {
    tag: 'SeparatorMenuItem',
    importPath: 'javafx.scene.control.SeparatorMenuItem',
    description: 'A separator menu item',
    categories: ['Misc'],
    attributes: [],
    variants: [
      { label: 'SeparatorMenuItem', snippet: '<SeparatorMenuItem />', sortText: '01', description: 'Menu separator' }
    ]
  },
  {
    tag: 'TreeItem',
    importPath: 'javafx.scene.control.TreeItem',
    description: 'A tree item',
    categories: ['Misc'],
    attributes: ['value', 'expanded', 'graphic'],
    isContainer: true,
    variants: [
      { label: 'TreeItem', snippet: '<TreeItem value="$1">\n\t$2\n</TreeItem>', sortText: '01', description: 'TreeItem with children' }
    ]
  },
  {
    tag: 'TreeTableView',
    importPath: 'javafx.scene.control.TreeTableView',
    description: 'A tree table view control',
    categories: ['Controls'],
    attributes: ['fx:id', 'style', 'styleClass', 'prefWidth', 'prefHeight', 'editable', 'showRoot', 'rootVisible', 'tableMenuButtonVisible', 'columnResizePolicy'],
    isContainer: true,
    variants: [
      { label: 'TreeTableView', snippet: '<TreeTableView $1/>', sortText: '01', description: 'Self-closing' },
      { label: 'TreeTableView (with columns)', snippet: '<TreeTableView fx:id="$1">\n\t<columns>\n\t\t<TreeTableColumn text="$2" />\n\t</columns>\n</TreeTableView>', sortText: '02', description: 'With columns' }
    ]
  },
  {
    tag: 'TreeTableColumn',
    importPath: 'javafx.scene.control.TreeTableColumn',
    description: 'A column in a TreeTableView',
    categories: ['Controls'],
    attributes: ['text', 'prefWidth', 'minWidth', 'maxWidth', 'sortable', 'editable', 'resizable', 'visible'],
    variants: [
      { label: 'TreeTableColumn', snippet: '<TreeTableColumn $1/>', sortText: '01', description: 'Self-closing' },
      { label: 'TreeTableColumn (with text)', snippet: '<TreeTableColumn text="$1"/>', sortText: '02', description: 'With text attribute' }
    ]
  },
  {
    tag: 'ContextMenu',
    importPath: 'javafx.scene.control.ContextMenu',
    description: 'A popup context menu',
    categories: ['Controls'],
    attributes: ['fx:id', 'style', 'styleClass', 'onAction', 'onShowing', 'onShown', 'onHiding', 'onHidden'],
    isContainer: true,
    variants: [
      { label: 'ContextMenu', snippet: '<ContextMenu>\n\t$1\n</ContextMenu>', sortText: '01', description: 'With items' },
      { label: 'ContextMenu (fx:id)', snippet: '<ContextMenu fx:id="$1">\n\t$2\n</ContextMenu>', sortText: '02', description: 'With fx:id' }
    ]
  },
  {
    tag: 'CustomMenuItem',
    importPath: 'javafx.scene.control.CustomMenuItem',
    description: 'A menu item with custom content',
    categories: ['Controls'],
    attributes: ['text', 'graphic', 'hideOnClick', 'disable', 'visible', 'style'],
    variants: [
      { label: 'CustomMenuItem', snippet: '<CustomMenuItem>\n\t$1\n</CustomMenuItem>', sortText: '01', description: 'With content' }
    ]
  },
  {
    tag: 'TableCell',
    importPath: 'javafx.scene.control.TableCell',
    description: 'A cell in a TableView',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'graphic', 'style'],
    isContainer: true,
    variants: [
      { label: 'TableCell', snippet: '<TableCell>\n\t$1\n</TableCell>', sortText: '01', description: 'With content' }
    ]
  },
  {
    tag: 'TableRow',
    importPath: 'javafx.scene.control.TableRow',
    description: 'A row in a TableView',
    categories: ['Controls'],
    attributes: ['fx:id', 'style'],
    isContainer: true,
    variants: [
      { label: 'TableRow', snippet: '<TableRow>\n\t$1\n</TableRow>', sortText: '01', description: 'With content' }
    ]
  },
  {
    tag: 'ListCell',
    importPath: 'javafx.scene.control.ListCell',
    description: 'A cell in a ListView',
    categories: ['Controls'],
    attributes: ['fx:id', 'text', 'graphic', 'style'],
    isContainer: true,
    variants: [
      { label: 'ListCell', snippet: '<ListCell>\n\t$1\n</ListCell>', sortText: '01', description: 'With content' }
    ]
  }
]

export const componentByTag = new Map<string, FxmlComponent>()

for (const c of fxmlComponents) {
  componentByTag.set(c.tag, c)
}
