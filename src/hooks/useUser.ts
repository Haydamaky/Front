'use client';
import { useAppSelector } from './store';
export function useUser() {
  const { data, loading } = useAppSelector(state => state.user);
  return { data, loading };
}
