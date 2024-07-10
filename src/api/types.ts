export type RegisterType = {
  email: string;
  password: string;
  name: string;
};


export type LoginType = Omit<RegisterType, "name">;