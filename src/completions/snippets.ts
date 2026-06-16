export interface Snippet {
  label: string
  snippet: string
  description: string
  sortText: string
}

export const fxmlSnippets: Snippet[] = [
  {
    label: '!',
    snippet: `<?xml version="1.0" encoding="UTF-8"?>

<?import javafx.scene.Scene?>
<?import javafx.scene.layout.AnchorPane?>

<Scene width="800" height="600" xmlns:fx="http://javafx.com/fxml">
  <AnchorPane fx:id="root">
    $1
  </AnchorPane>
</Scene>`,
    description: 'FXML boilerplate (full)',
    sortText: '00'
  },
  {
    label: 'fxml',
    snippet: `<?xml version="1.0" encoding="UTF-8"?>

<?import javafx.scene.Scene?>
<?import javafx.scene.layout.AnchorPane?>

<Scene width="800" height="600" xmlns:fx="http://javafx.com/fxml">
  <AnchorPane fx:id="root">
    $1
  </AnchorPane>
</Scene>`,
    description: 'FXML boilerplate (full)',
    sortText: '00'
  },
  {
    label: 'scene',
    snippet: '<Scene width="$1" height="$2">\n\t$3\n</Scene>',
    description: 'Scene with dimensions',
    sortText: '01'
  },
  {
    label: 'anchor',
    snippet: '<AnchorPane fx:id="$1">\n\t$2\n</AnchorPane>',
    description: 'AnchorPane boilerplate',
    sortText: '01'
  },
  {
    label: 'border',
    snippet: '<BorderPane>\n\t<top>$1</top>\n\t<center>$2</center>\n\t<left>$3</left>\n\t<right>$4</right>\n\t<bottom>$5</bottom>\n</BorderPane>',
    description: 'BorderPane with all regions',
    sortText: '01'
  },
  {
    label: 'vbox',
    snippet: '<VBox spacing="$1">\n\t$2\n</VBox>',
    description: 'VBox with spacing',
    sortText: '01'
  },
  {
    label: 'hbox',
    snippet: '<HBox spacing="$1">\n\t$2\n</HBox>',
    description: 'HBox with spacing',
    sortText: '01'
  },
  {
    label: 'grid',
    snippet: '<GridPane fx:id="$1">\n\t$2\n</GridPane>',
    description: 'GridPane boilerplate',
    sortText: '01'
  },
  {
    label: 'dialog',
    snippet: '<DialogPane>\n\t<headerText>$1</headerText>\n\t<contentText>$2</contentText>\n\t$3\n</DialogPane>',
    description: 'DialogPane boilerplate',
    sortText: '01'
  },
  {
    label: 'table',
    snippet: '<TableView fx:id="$1">\n\t<columns>\n\t\t<TableColumn text="$2" prefWidth="$3" />\n\t\t<TableColumn text="$4" prefWidth="$5" />\n\t</columns>\n</TableView>',
    description: 'TableView with columns',
    sortText: '01'
  },
  {
    label: 'controller',
    snippet: '<?import $1?>',
    description: 'Controller import directive',
    sortText: '01'
  },
  {
    label: 'import',
    snippet: '<?import $1?>',
    description: 'Import directive',
    sortText: '01'
  },
  {
    label: 'include',
    snippet: '<fx:include source="$1"/>',
    description: 'Include another FXML file',
    sortText: '01'
  },
  {
    label: 'define',
    snippet: '<fx:define>$1</fx:define>',
    description: 'Define reusable objects',
    sortText: '01'
  },
  {
    label: 'root',
    snippet: '<fx:root>$1</fx:root>',
    description: 'Custom component root element',
    sortText: '01'
  },
  {
    label: 'script',
    snippet: '<fx:script>$1</fx:script>',
    description: 'Inline script block',
    sortText: '01'
  }
]
