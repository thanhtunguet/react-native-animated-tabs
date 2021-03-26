import type { LayoutRectangle } from 'react-native';
import type { Reducer } from 'react';

export type TabReducerState = number[];

export enum TabReducerActionType {
  SET,
}

export interface TabReducerAction {
  type: TabReducerActionType;

  index: number;

  layout: LayoutRectangle;
}

export type TabReducer = Reducer<TabReducerState, TabReducerAction>;

export function tabReducer(
  state: TabReducerState,
  action: TabReducerAction
): TabReducerState {
  switch (action.type) {
    case TabReducerActionType.SET:
      state[action.index] = action.layout.width;
      return [...state];

    default:
      return state;
  }
}
