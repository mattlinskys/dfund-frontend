import { useContractCall, useContractCalls, useEthers } from "@usedapp/core";
import { post, project } from "app/abis";
import { useCallback, useState } from "react";
import { Post } from "types/post";
import { utils, BigNumber } from "ethers";

const usePosts = (address?: string, pageSize = BigNumber.from(10)) => {
  // const [posts, setPosts] = useState<Post[] | null>(null);
  const [page, setPage] = useState<BigNumber>(BigNumber.from(1));

  const [postCount] = (useContractCall(
    address && {
      abi: project,
      address,
      method: "postCount",
      args: [],
    }
  ) ?? []) as (BigNumber | undefined)[];

  const canFetchNextPosts =
    postCount && postCount.gt(page.mul(pageSize).sub(pageSize));

  const [postAddresses] = (useContractCall(
    address &&
      canFetchNextPosts && {
        abi: project,
        address,
        method: "getPaginatiedPosts",
        args: [page, pageSize],
      }
  ) ?? []) as (string[] | undefined)[];

  const posts = useContractCalls(
    postAddresses
      ? postAddresses.map((postAddress) => ({
          abi: post,
          address: postAddress,
          method: "content",
          args: [],
        }))
      : []
  );

  console.log(postCount, postAddresses, posts);

  const fetchNextPosts = useCallback(() => {
    setPage(page.add(BigNumber.from(1)));
  }, [page]);

  return {
    posts,
    total: postCount,
    canFetchNextPosts,
    fetchNextPosts,
  };
};

export default usePosts;
