export interface IDragDropColumn {
  source: number;
  destination: number;
}

export interface IDragDropTask {
  sourceColumnId: string;
  destinationColumnId: string;
  sourceIndex: number;
  destinationIndex: number;
}
