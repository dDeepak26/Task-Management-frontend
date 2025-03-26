export type tasksType = {
  _id?: string;
  title: string;
  description?: string;
  completed?: boolean;
};

export type onUpdateType = () => void;
export type onCompleteType = () => void;
export type onDeleteType = () => void;
