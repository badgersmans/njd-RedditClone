import { atom } from 'jotai';
import { Group } from './types/types';

export const selectedSubredditAtom = atom<Group | null>(null);