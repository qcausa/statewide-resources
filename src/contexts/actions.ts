"use server";

import Session from "~/lib/session";

export async function AuthContextTest() {
  const web3session = await Session.getSession();

  // Assuming web3session is a class instance or contains non-serializable values,
  // manually construct a plain object with only the needed data.
  const sessionData = {
    // Copy over only the serializable fields you need on the client side
    address: web3session.address,
    nonce: web3session.nonce,
    chainId: web3session.chainId,
    // Add other fields as necessary
  };

  return sessionData;
}
