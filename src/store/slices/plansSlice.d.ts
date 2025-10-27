export interface Plan {
    id: string;
    name: string;
    price: number;
    features: string[];
    popular?: boolean;
}
export interface PlansState {
    plans: Plan[];
    selectedPlan: Plan | null;
    isLoading: boolean;
    error: string | null;
}
export declare const fetchPlans: import("@reduxjs/toolkit").AsyncThunk<unknown, void, import("@reduxjs/toolkit").AsyncThunkConfig>;
export declare const selectPlan: import("@reduxjs/toolkit").ActionCreatorWithPayload<Plan, "plans/selectPlan">, clearError: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"plans/clearError">;
declare const _default: Reducer<State>;
export default _default;
