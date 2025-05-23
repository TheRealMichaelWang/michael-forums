import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useGetCurrentUserQuery } from './../../generated/graphql';
import { useUserStore } from './../../userStore';

export const useUserFetcher = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { data, error } = useGetCurrentUserQuery({
    skip: !isLoaded || !isSignedIn,
  });

  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    if (isSignedIn) {
      if (error) {
        console.error('Error fetching user data:', error);
        clearUser();
      } else if (data?.userQuery?.me) {
        setUser({
          id: data.userQuery.me.id,
          isAdmin: data.userQuery.me.isAdmin || false, // Default to false if isAdmin is not available
        });
      }
    } else {
      clearUser();
    }
  }, [isSignedIn, data, error, setUser, clearUser]);
};