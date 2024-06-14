import { useState, useEffect } from "react";
import { api, User } from "../lbapi/lbapi";

function useUser(cache = 60) {
  const [user, setUser] = useState(api.user);

  useEffect(() => {
    api.GetUser(cache !== 0, cache).then(
      (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(new User(true, false, {}));
        }
      },
      (error) => {
        setUser(new User(true, false, {}));
      }
    );

    const onUserChange = (newUser) => setUser(newUser);

    api.onUserChange.push(onUserChange);

    return () => {
      api.onUserChange = api.onUserChange.filter((f) => f !== onUserChange);
    };
  });

  return user;
}

export default useUser;
