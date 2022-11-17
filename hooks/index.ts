import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryOptions,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import { 
    QueryBalanceRequest,
    QueryBalanceResponse,
    QueryAllBalancesRequest,
    QueryAllBalancesResponse
 } from "interchain/types/codegen/cosmos/bank/v1beta1/query";

export interface ReactQueryParams<TResponse, TData = TResponse> {
    options?: UseQueryOptions<TResponse, Error, TData>;
}


// balance

export interface UseBalanceQuery<TData> extends ReactQueryParams<QueryBalanceResponse, TData> {
    querier: (request: QueryBalanceRequest) => Promise<QueryBalanceResponse>;
    args: QueryBalanceRequest
}

export function useBalanceQuery<TData = QueryBalanceResponse>({
    querier,
    args,
    options
}: UseBalanceQuery<TData>) {
    return useQuery<QueryBalanceResponse, Error, TData>(["queryBalance", querier, args], async () => {
        return await querier(args);
    }, options);
}

export interface UseAllBalanceQuery<TData> extends ReactQueryParams<QueryAllBalancesResponse, TData> {
    querier: (request: QueryAllBalancesRequest) => Promise<QueryAllBalancesResponse>;
    args: QueryAllBalancesRequest
}

export function useAllBalanceQuery<TData = QueryAllBalancesResponse>({
    querier,
    args,
    options
}: UseAllBalanceQuery<TData>) {
    return useQuery<QueryAllBalancesResponse, Error, TData>(["queryAllBalance", querier, args], async () => {
        return await querier(args);
    }, options);
}