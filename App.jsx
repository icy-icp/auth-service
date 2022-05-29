import React, { useState } from "react";
import { AuthClient } from "@dfinity/auth-client";

const init = () => {
  async function handleClick() {
    const [login, setLogin] = useState();
    const [username, setUsername] = useState("");
    const authClient = await AuthClient.create();

    async function signUp() {
      if (await authClient.isAuthenticated()) {
        const identity = client.getIdentity();
        const principal = identity.getPrincipal().toString();
        setSignedIn(true);
        setUsername(principal);
      } else {
        await authClient.login({
          identityProvider: "https://identity.ic0.app/#authorize",
          onSuccess: () => {
            const identity = client.getIdentity();
            const principal = identity.getPrincipal().toString();
            setLogin(true);
            setUsername(principal);
          },
        });
      }
    }
  }

  // async function handleAuthenticated(authClient) {
  //   const greeting = await main.greet(authClient.toText());
  //   setSayHello(greeting.toText());
  // }

  const logout = async () => {
    await client.logout();
    setLogin(false);
    setUsername("");
  };

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <div>
      {!login && client ? <span onClick={signUp}>Sign up</span> : null}

      {signedIn ? (
        <>
          <p>Signed in as: {username}</p>
          <button onClick={logout}>Sign out</button>
        </>
      ) : null}
    </div>
  );
};
