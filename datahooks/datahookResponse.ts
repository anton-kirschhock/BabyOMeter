export interface DataHookResponse<TEntity, TQueryEntity> {
    data: TEntity | undefined;
    loading: boolean;
    refresh: () => Promise<void>;
    setQuery: (query: TQueryEntity) => void;
    query: TQueryEntity;
}