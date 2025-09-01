export interface Project {
  id: number;
  title: string;
  description: string | null;
  category: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectRequest {
  title: string;
  description?: string;
  category?: string;
  imageUrl?: string;
}

export interface UpdateProjectRequest {
  title?: string;
  description?: string;
  category?: string;
  imageUrl?: string;
}
