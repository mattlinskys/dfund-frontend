import { Contract } from "ethers";
import factoryAbi from "abi/Factory.json";
import profileAbi from "abi/Profile.json";
import projectAbi from "abi/Project.json";
import postAbi from "abi/Post.json";
import customizableAbi from "abi/Customizable.json";

export const factory = Contract.getInterface(factoryAbi);
export const profile = Contract.getInterface(profileAbi);
export const project = Contract.getInterface(projectAbi);
export const post = Contract.getInterface(postAbi);
export const customizable = Contract.getInterface(customizableAbi);
