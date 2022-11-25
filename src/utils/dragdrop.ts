import { IColumn, IColumnSet } from 'interfaces/columns';

export const getNewColumnsSet = (columns: IColumn[]): IColumnSet[] => {
  const b = columns.map((column, index) => {
    return {
      _id: column._id,
      order: index,
    };
  });
  return b;
};
