'use client';
import { getUserInfo } from '@/store/slices/user';
import { useEffect } from 'react';
import { useAppDispatch } from './store';
import { useUser } from './useUser';
export function useDispatchUser() {
  const dispatch = useAppDispatch();
  const { data } = useUser();
  useEffect(() => {
    if (!data) {
      dispatch(getUserInfo());
    }
  }, [dispatch, data]);
  return { isInitialized: !!data };
}
