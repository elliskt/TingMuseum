import { providers } from "ethers";
import { Contract } from "ethers";
import abi from "./poap_vn_abi.json";
async function mintContract() {
  const contract_address = "0x130E79126EA562d0a069069B0021AE3b95D8fc0d";
  //   const provider = new providers.JsonRpcProvider(
  //     "https://polygon-mumbai.g.alchemy.com/v2/UJ9H__icMKmwl2W3QA3my2AC3T4DT1zs"
  //   );
  const provider = new providers.Web3Provider(window.ethereum);
  console.log("provider:", provider);
  const signer = await provider.getSigner();
  const contract = new Contract(contract_address, abi, signer);
  return { contract };
}
export { mintContract };
