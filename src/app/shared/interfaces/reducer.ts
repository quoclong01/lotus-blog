export interface IAction {
  type: string,
  payload: any
};

export interface IStateCommon {
  data: any;
  isLoading: boolean;
  error: string;
}
