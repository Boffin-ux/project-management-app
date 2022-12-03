import { IColumn, IColumnSet } from 'interfaces/columns';
import { IDragedSet } from 'interfaces/dragdrop';
import { ITask, ITasksSet } from 'interfaces/task';

export const getNewColumnsSet = (columns: IColumn[]): IColumnSet[] => {
  const b = columns.map((column, index) => {
    return {
      _id: column._id,
      order: index,
    };
  });
  return b;
};

export const setOrderingSets = (columns: IColumn[]): IDragedSet => {
  const orderingSet: IDragedSet = {
    columns: [],
    tasks: [],
  };

  columns.forEach((column) => {
    orderingSet.columns.push({ _id: column._id, order: column.order });
    column.tasks.forEach((task) =>
      orderingSet.tasks.push({
        _id: task._id,
        order: task.order,
        columnId: task.columnId,
      })
    );
  });

  return orderingSet;
};

export const setOrderTasks = (tasks: ITask[]): ITasksSet[] => {
  return tasks.map((task) => ({ _id: task._id, order: task.order, columnId: task.columnId }));
};

export const setOrderColumns = (columns: IColumn[]): IColumnSet[] => {
  return columns.map((column) => ({ _id: column._id, order: column.order }));
};
