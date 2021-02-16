export declare type ReduxDispatcherData = {
    type: string;
    [key: string]: unknown;
};
export declare type ReduxDispatcher = (dispatchData: ReduxDispatcherData) => any;
