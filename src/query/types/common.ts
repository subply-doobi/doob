export interface IQueryOptions<Params = void> {
  enabled?: boolean;
  onSuccess?: Function;
  additionalQuerykey?: Array<string | number>;
}

export interface IMutationOptions {
  onSuccess?: Function;
}
