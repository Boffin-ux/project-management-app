import { IColumn, IColumnSet } from 'interfaces/columns';
import { IDragDropColumn, IDragDropTask, IDragedSet } from 'interfaces/dragdrop';
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

export const setOrderTasks = (tasks: ITask[]): ITasksSet[] => {
  return tasks.map((task) => ({ _id: task._id, order: task.order, columnId: task.columnId }));
};

export const setOrderColumns = (columns: IColumn[]): IColumnSet[] => {
  return columns.map((column) => ({ _id: column._id, order: column.order }));
};

export const updateTaskOrder = (tasks: ITask[]): ITask[] => {
  return tasks.map((task, index) => ({ ...task, order: index }));
};

export const updateColumnOrder = (columns: IColumn[]): IColumn[] => {
  return columns.map((column, index) => ({ ...column, order: index }));
};

export const movingTask = (
  tasks: ITask[],
  { sourceColumnId, destinationColumnId, sourceIndex, destinationIndex }: IDragDropTask
): ITask[] => {
  if (destinationColumnId === sourceColumnId) {
    const columnTasks: ITask[] = [];
    const otherTasks: ITask[] = [];
    tasks.forEach((task) => {
      if (task.columnId === sourceColumnId) {
        columnTasks.push(task);
      } else {
        otherTasks.push(task);
      }
    });
    const [newOrder] = columnTasks.splice(sourceIndex, 1);
    columnTasks.splice(destinationIndex, 0, newOrder);
    return [...otherTasks, ...updateTaskOrder(columnTasks)];
  } else {
    const sourceTasks: ITask[] = [];
    const destTasks: ITask[] = [];
    const otherTasks: ITask[] = [];
    tasks.forEach((task) => {
      if (task.columnId === sourceColumnId) {
        sourceTasks.push(task);
      } else if (task.columnId === destinationColumnId) {
        destTasks.push(task);
      } else {
        otherTasks.push(task);
      }
    });
    let [newOrder] = sourceTasks.splice(sourceIndex, 1);
    newOrder = { ...newOrder, columnId: destinationColumnId };
    destTasks.splice(destinationIndex, 0, newOrder);
    return [...otherTasks, ...updateTaskOrder(sourceTasks), ...updateTaskOrder(destTasks)];
  }
};

export const movingColumn = (columns: IColumn[], { destination, source }: IDragDropColumn) => {
  const items = Array.from(columns);
  const [newOrder] = items.splice(source, 1);
  items.splice(destination, 0, newOrder);
  return updateColumnOrder(items);
};
