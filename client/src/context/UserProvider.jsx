import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { fetchAuthSession, getCurrentUser, signOut, deleteUser } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';


import { storage } from '../Storage';

export const UserContext = createContext({
  user: undefined,
  setUser: () => {},
  checkUser: async () => {},
  handleSignOut: async () => {},
  handleDeleteAccount: async () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);

  const checkUser = useCallback(async () => {
    try {
      // Warm tokens; if none, treat as signed-out (esp. during OAuth redirect)
      const session = await fetchAuthSession();
      if (!session || !session.tokens) {
        setUser(undefined);
        return;
      }
      const current = await getCurrentUser({ bypassCache: true });
      setUser(current);
      if (current && current.username) {
        storage.set('USERNAME', String(current.username));
      }
    } catch (e) {
      setUser(undefined);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
    } finally {
      setUser(undefined);
      storage.delete('USERNAME');
    }
  }, []);

  const handleDeleteAccount = useCallback(async () => {
    try {
      await deleteUser();
    } finally {
      setUser(undefined);
      storage.delete('USERNAME');
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  // Hub listener
  useEffect(() => {
    const unsub = Hub.listen('auth', async ({ payload: { event } }) => {
      if (event === 'signedIn' || event === 'tokenRefresh') {
        await checkUser();
      } else if (event === 'signedOut') {
        setUser(undefined);
        storage.delete('USERNAME');
      }
    });
    return () => unsub();
  }, [checkUser]);

  const value = useMemo(
    () => ({ user, setUser, checkUser, handleSignOut, handleDeleteAccount }),
    [user, checkUser, handleSignOut, handleDeleteAccount]
  );

  return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
  )
}
