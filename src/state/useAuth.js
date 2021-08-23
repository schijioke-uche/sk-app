//
// useAuth() - Authentication and Authorization state handler
//

import React, { createContext, useState, useEffect, useContext } from 'react';

const Ctx = createContext();

const noProfile = { roles: [] };

//
// _fetch() - simple json fetcher with (optional) Bearer Authorization
//
// To fetch data:
//
// await _fetch(url); // no access token
// await _fetch(url,null,accessToken); // with access token
//
// To post data:
// 
// await _fetch(url, { method: 'post', body:{ x: 100, y: 'abc' } }, accessToken );
//
const _fetch = (url, opts = {}, accessToken) => {
  if (typeof opts.body === 'object') {
    opts.body = JSON.stringify(opts.body);
  }
  return fetch(url, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      'Content-Type': 'application/json',
    },
    ...opts,
  }).then(async fetchResult => {
    if (!fetchResult.ok) {
      const error = new Error(fetchResult.statusText);
      error.status = fetchResult.status; // note: holding onto the status is important later!
      throw error;
    }
    return fetchResult.json();
  });
};

//
// Provider
//
export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(noProfile);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    // get to load the user's session here
    _fetch('/auth/profile', { credentials: 'include' })
      .then(data => {
        // console.log(data);
        if (data.ok) {
          setProfile(data.profile);
          setAccessToken(data.accessToken);
        } else {
          console.log(data);
          setProfile(noProfile);
          setAccessToken(null);
        }
      })
      .catch(err => {
        console.error(err);
        setError(err);
      })
      .then(() => setLoading(false));
  }, []);

  //
  // hasRole() - convenience function for authorization lookup
  //
  // usage:
  //
  //   const { hasRole } = useAuth();
  //   if (hasRole('ADMIN')) {
  //     console.log('you are an administrator...');
  //   }
  //
  const hasRole = (roleOrRoles, successValue = true, failValue = null) => {
    if (typeof roleOrRoles === 'string') {
      // we got a single role
      if (profile.roles.includes(roleOrRoles)) {
        return successValue;
      }
    } else {
      // got got an array of acceptable roles
      if (profile.roles.find(role => roleOrRoles.includes(role))) {
        return successValue;
      }
    }
    // role wasn't found
    return failValue;
  };

  //
  // apiFetch - fetch JSON data from the app's api, using the current
  //            accessToken, if that token has expired attempt to
  //            get a new accessToken and try again.
  //
  // usage:
  //
  //   const { apiFetch } = useAuth();
  //   apiFetch('/api/version')
  //     .then( data => console.log(data.version) )
  //     .catch( err => console.error(`unable to get version: ${err.message}`));
  //
  const apiFetch = async (url, opts = {}) =>
    _fetch(url, opts, accessToken).catch(err => {
      if (!accessToken || err.status !== 401) throw error;
      return _fetch('/auth/refresh-token', {
        credentials: 'include',
      }).then(data => {
        const { ok, accessToken: newAccessToken } = data;
        if (!ok) throw new Error('session has expired');
        setAccessToken(newAccessToken);
        return _fetch(url, opts, newAccessToken);
      });
    });

  return (
    <Ctx.Provider
      value={{
        isAuthenticated: !!accessToken,
        profile,
        loading,
        error,
        hasRole,
        apiFetch,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

//
// Consumer
//
const useAuth = () => {
  return useContext(Ctx);
};

export default useAuth;
