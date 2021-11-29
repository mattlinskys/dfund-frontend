import { Interface } from "@ethersproject/abi";
import factoryAbi from "abi/Factory.json";
import profileAbi from "abi/Profile.json";
import projectAbi from "abi/Project.json";

export const factory = new Interface(factoryAbi);
export const profile = new Interface(profileAbi);
export const project = new Interface(projectAbi);
