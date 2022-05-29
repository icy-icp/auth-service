import React from "react";
import { AuthClient } from "@dfinity/auth-client";

const init = () => {
  async function handleClick() {
    const [sayHello, setSayHello] = useState();
    const authClient = await AuthClient.create();

    if (await authClient.isAuthenticated()) {
      handleAuthenticated(authClient);
    } else {
      await authClient.login({
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: () => {
          handleAuthenticated(authClient);
        },
      });
    }
  }

  async function handleAuthenticated(authClient) {
    const greeting = await main.greet(authClient.toText());
    setSayHello(greeting.toText());
  }

  return <span onClick={handleClick}>{sayHello}</span>;
};
