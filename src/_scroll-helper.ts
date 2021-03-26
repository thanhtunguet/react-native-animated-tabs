import { width } from './_consts';

export function getTabPaneScrollIndex(offset: number): number {
  return Math.floor(offset / width);
}
