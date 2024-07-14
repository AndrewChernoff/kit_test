export type RegisterType = {
  email: string;
  password: string;
  name: string;
};


export type LoginType = Omit<RegisterType, "name">;

export type MediaItemType = {
  id: string;
  name: string;
  fileName: string;
  mimeType: string;
  url: string
  createdAt: string;
}

export type MediaUploadStatus = "initial" | "uploading" | "success" | "fail"

export type Nullable<T> = T | null
