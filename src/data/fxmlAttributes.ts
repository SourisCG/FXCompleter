export interface AttributeInfo {
  name: string
  description: string
  type: 'string' | 'boolean' | 'number' | 'enum' | 'color' | 'font' | 'url' | 'eventHandler' | 'id'
  values?: string[]
}

export const commonAttributes: AttributeInfo[] = [
  { name: 'fx:id', description: 'The unique identifier for this node', type: 'id' },
  { name: 'id', description: 'CSS ID selector for this node', type: 'string' },
  { name: 'style', description: 'CSS inline style string', type: 'string' },
  { name: 'styleClass', description: 'CSS style class(es)', type: 'string' },
  { name: 'stylesheets', description: 'CSS stylesheet URL(s) for the scene/parent', type: 'url' },
  { name: 'disable', description: 'Whether the node is disabled', type: 'boolean', values: ['true', 'false'] },
  { name: 'visible', description: 'Whether the node is visible', type: 'boolean', values: ['true', 'false'] },
  { name: 'managed', description: 'Whether the node is managed by parent layout', type: 'boolean', values: ['true', 'false'] },
  { name: 'opacity', description: 'Opacity value (0.0 to 1.0)', type: 'number' },
  { name: 'focusTraversable', description: 'Whether the node can receive focus', type: 'boolean', values: ['true', 'false'] },
  { name: 'xmlns:fx', description: 'FXML namespace declaration (use on root element)', type: 'url' },
  { name: 'blendMode', description: 'Blend mode for the node', type: 'enum', values: ['add', 'blue', 'color-burn', 'color-dodge', 'darken', 'difference', 'exclusion', 'green', 'hard-light', 'lighten', 'multiply', 'overlay', 'red', 'screen', 'soft-light', 'src-atop', 'src-in', 'src-out', 'src-over'] },
  { name: 'cursor', description: 'Mouse cursor type', type: 'enum', values: ['default', 'crosshair', 'hand', 'move', 'e-resize', 'h-resize', 'ne-resize', 'nw-resize', 'n-resize', 'se-resize', 'sw-resize', 's-resize', 'w-resize', 'v-resize', 'text', 'wait'] },
  { name: 'cache', description: 'Whether to cache the node', type: 'boolean', values: ['true', 'false'] },
  { name: 'cacheShape', description: 'Whether to cache the shape', type: 'boolean', values: ['true', 'false'] }
]

export const layoutAttributes: AttributeInfo[] = [
  { name: 'prefWidth', description: 'Preferred width', type: 'number' },
  { name: 'prefHeight', description: 'Preferred height', type: 'number' },
  { name: 'minWidth', description: 'Minimum width', type: 'number' },
  { name: 'minHeight', description: 'Minimum height', type: 'number' },
  { name: 'maxWidth', description: 'Maximum width', type: 'number' },
  { name: 'maxHeight', description: 'Maximum height', type: 'number' },
  { name: 'padding', description: 'Padding insets', type: 'string' },
  { name: 'GridPane.rowIndex', description: 'Row index in GridPane', type: 'number' },
  { name: 'GridPane.columnIndex', description: 'Column index in GridPane', type: 'number' },
  { name: 'GridPane.rowSpan', description: 'Row span in GridPane', type: 'number' },
  { name: 'GridPane.columnSpan', description: 'Column span in GridPane', type: 'number' },
  { name: 'GridPane.halignment', description: 'Horizontal alignment in GridPane cell', type: 'enum', values: ['left', 'center', 'right'] },
  { name: 'GridPane.valignment', description: 'Vertical alignment in GridPane cell', type: 'enum', values: ['top', 'center', 'bottom', 'baseline'] },
  { name: 'GridPane.hgrow', description: 'Horizontal grow priority', type: 'enum', values: ['always', 'never', 'som', 'always'] },
  { name: 'GridPane.vgrow', description: 'Vertical grow priority', type: 'enum', values: ['always', 'never', 'som', 'always'] },
  { name: 'GridPane.margin', description: 'Margin insets in GridPane', type: 'string' },
  { name: 'HBox.hgrow', description: 'Horizontal grow priority in HBox', type: 'enum', values: ['always', 'never', 'som', 'always'] },
  { name: 'HBox.margin', description: 'Margin insets in HBox', type: 'string' },
  { name: 'VBox.vgrow', description: 'Vertical grow priority in VBox', type: 'enum', values: ['always', 'never', 'som', 'always'] },
  { name: 'VBox.margin', description: 'Margin insets in VBox', type: 'string' },
  { name: 'AnchorPane.topAnchor', description: 'Anchor from top edge', type: 'number' },
  { name: 'AnchorPane.bottomAnchor', description: 'Anchor from bottom edge', type: 'number' },
  { name: 'AnchorPane.leftAnchor', description: 'Anchor from left edge', type: 'number' },
  { name: 'AnchorPane.rightAnchor', description: 'Anchor from right edge', type: 'number' },
  { name: 'BorderPane.alignment', description: 'Alignment in BorderPane region', type: 'enum', values: ['top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'] },
  { name: 'StackPane.alignment', description: 'Alignment in StackPane', type: 'enum', values: ['top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'] }
]

export const eventHandlerAttributes: AttributeInfo[] = [
  { name: 'onAction', description: 'Action event handler', type: 'eventHandler' },
  { name: 'onDragDetected', description: 'Drag detected event handler', type: 'eventHandler' },
  { name: 'onDragDone', description: 'Drag done event handler', type: 'eventHandler' },
  { name: 'onDragDropped', description: 'Drag dropped event handler', type: 'eventHandler' },
  { name: 'onDragEntered', description: 'Drag entered event handler', type: 'eventHandler' },
  { name: 'onDragExited', description: 'Drag exited event handler', type: 'eventHandler' },
  { name: 'onDragOver', description: 'Drag over event handler', type: 'eventHandler' },
  { name: 'onKeyPressed', description: 'Key pressed event handler', type: 'eventHandler' },
  { name: 'onKeyReleased', description: 'Key released event handler', type: 'eventHandler' },
  { name: 'onKeyTyped', description: 'Key typed event handler', type: 'eventHandler' },
  { name: 'onMouseClicked', description: 'Mouse clicked event handler', type: 'eventHandler' },
  { name: 'onMouseDragged', description: 'Mouse dragged event handler', type: 'eventHandler' },
  { name: 'onMouseEntered', description: 'Mouse entered event handler', type: 'eventHandler' },
  { name: 'onMouseExited', description: 'Mouse exited event handler', type: 'eventHandler' },
  { name: 'onMouseMoved', description: 'Mouse moved event handler', type: 'eventHandler' },
  { name: 'onMousePressed', description: 'Mouse pressed event handler', type: 'eventHandler' },
  { name: 'onMouseReleased', description: 'Mouse released event handler', type: 'eventHandler' },
  { name: 'onScroll', description: 'Scroll event handler', type: 'eventHandler' },
  { name: 'onInputMethodTextChanged', description: 'Input method text changed handler', type: 'eventHandler' },
  { name: 'onContextMenuRequested', description: 'Context menu requested handler', type: 'eventHandler' },
  { name: 'onZoom', description: 'Zoom event handler', type: 'eventHandler' },
  { name: 'onRotate', description: 'Rotate event handler', type: 'eventHandler' },
  { name: 'onSwipeUp', description: 'Swipe up event handler', type: 'eventHandler' },
  { name: 'onSwipeDown', description: 'Swipe down event handler', type: 'eventHandler' },
  { name: 'onSwipeLeft', description: 'Swipe left event handler', type: 'eventHandler' },
  { name: 'onSwipeRight', description: 'Swipe right event handler', type: 'eventHandler' },
  { name: 'onTouchPressed', description: 'Touch pressed event handler', type: 'eventHandler' },
  { name: 'onTouchReleased', description: 'Touch released event handler', type: 'eventHandler' },
  { name: 'onTouchMoved', description: 'Touch moved event handler', type: 'eventHandler' },
  { name: 'onTouchStationary', description: 'Touch stationary event handler', type: 'eventHandler' },
  { name: 'onScrollStarted', description: 'Scroll started event handler', type: 'eventHandler' },
  { name: 'onScrollFinished', description: 'Scroll finished event handler', type: 'eventHandler' },
  { name: 'onZoomStarted', description: 'Zoom started event handler', type: 'eventHandler' },
  { name: 'onZoomFinished', description: 'Zoom finished event handler', type: 'eventHandler' },
  { name: 'onRotateStarted', description: 'Rotate started event handler', type: 'eventHandler' },
  { name: 'onRotateFinished', description: 'Rotate finished event handler', type: 'eventHandler' },
  { name: 'onMenuValidation', description: 'Menu validation event handler', type: 'eventHandler' }
]

export const attributeMap = new Map<string, AttributeInfo>()

for (const attr of [...commonAttributes, ...layoutAttributes, ...eventHandlerAttributes]) {
  attributeMap.set(attr.name, attr)
}
