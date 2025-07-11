export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTodoDTO = Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'> & {
  completed?: boolean;
};

export type UpdateTodoDTO = Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>;

export interface PaginationOptions {
  limit?: number;
  offset?: number;
}

export interface TodoResponse {
  data: Todo | null;
  message: string;
  success: boolean;
}