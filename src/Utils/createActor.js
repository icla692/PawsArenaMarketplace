import { Actor, HttpAgent } from '@dfinity/agent';


export const createActor = (canisterId, idlFactory,agent) => {
  // const agent = new HttpAgent({ host: HOST });

  //   if (options.agent && options.agentOptions) {
  //     console.warn(
  //       'Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.',
  //     );
  //   }

  // Fetch root key for certificate validation during development
  // if (process.env.DFX_NETWORK !== 'ic') {
  //   agent?.fetchRootKey().catch((err) => {
  //     console.warn(
  //       'Unable to fetch root key. Check to ensure that your local replica is running',
  //     );
  //     console.error(err);
  //   });
  // }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};
