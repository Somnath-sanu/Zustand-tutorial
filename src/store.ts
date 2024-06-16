import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type CounterStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
  incrementAsync: () => Promise<void>;
};

export const useCounterStore = create<CounterStore>()(
  devtools(
    persist(
      (set, get) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set(() => ({ count: get().count - 1 })),
        incrementAsync: async () => {
          // console.log("Clicked");

          await new Promise((resolve) => setTimeout(resolve, 2000));
          set(() => ({ count: get().count + 1 }));
        },
      }),
      {
        name: "count-storage",
        storage: createJSONStorage(() => sessionStorage),
        //? (optional) by default, 'localStorage' is used
      }
    ),{
      anonymousActionType: "count-action",
      enabled: true
    }
  )
);
