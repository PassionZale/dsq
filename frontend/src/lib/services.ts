import request from "./request";

export interface SingleEntry<T = any> {
  id: number;
  attribute: T;
}

export type CollectionEntry<T = any> = SingleEntry<T>[];

export interface System {
  name: string;
}

export function getSystems() {
  return request.get<CollectionEntry<System>>("/systems");
}
