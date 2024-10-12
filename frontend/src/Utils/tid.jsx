import { Principal } from '@dfinity/principal';

export function computeExtTokenIdentifier(index, principal) {
    let identifier = new Uint8Array([10, 116, 105, 100]);
  
    const principalBytes = Principal.fromText(principal).toUint8Array();
    identifier = new Uint8Array([...identifier, ...principalBytes]);
  
    let rest = index;
    for (let i = 3; i >= 0; i--) {
      const power2 = Math.pow(2, i * 8);
      const val = Math.floor(rest / power2);
      identifier = new Uint8Array([...identifier, val]);
      rest -= val * power2;
    }
  
    const finalPrincipal = Principal.fromUint8Array(identifier);
    return finalPrincipal.toText();
  }
