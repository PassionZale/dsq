import { create } from "zustand";
import { System } from "@/lib/services";

type SystemStore = {
  loading: boolean;
  items: System[];
  init: (payload: { loading: boolean; items: System[] }) => void;
};

const initialState = {
  loading: true,
  items: [],
};

const useOptionSets = create<SystemStore>()((set) => ({
  ...initialState,
  init: ({ loading, items }) => set(() => ({ loading, items })),
}));

export default useOptionSets;
