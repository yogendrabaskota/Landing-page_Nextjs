export interface Project {
  id: number;
  title: string;
  description: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectRequest {
  title: string;
  description?: string;
  category?: string;
}

export interface UpdateProjectRequest {
  title?: string;
  description?: string;
  category?: string;
}
