export type GroceryItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  boughtAt: string; // Date em ISO string (formatado como string no frontend)
  userId: number;
};

export type GroceryItemHistory = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  boughtAt: string;
  userId: number;
  itemId: number;
  createdAt: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  items: GroceryItem[];
  groceryItemHistory: GroceryItemHistory[];
};

export type Stats = {
  total: number;
  visits: number;
  average: number;
};
