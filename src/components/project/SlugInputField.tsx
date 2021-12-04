import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Input,
  InputProps,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/input";
import { Spinner } from "@chakra-ui/spinner";
import { useField } from "formik";
import { useContractCall } from "@usedapp/core";
import { factory } from "app/abis";
import { stringToBytes32 } from "utils/ethersUtils";
import { constants } from "ethers";
import { CheckIcon } from "@chakra-ui/icons";

export interface SlugInputFieldProps extends InputProps {
  name: string;
  currentSlug?: string;
}

const SlugInputField: React.FC<SlugInputFieldProps> = ({
  name,
  currentSlug,
  ...rest
}) => {
  const [{ value, onBlur, ...field }] = useField<string>(name);
  const [, , { setValue: setUniqueValue }] = useField<boolean>("isSlugUnique");
  const timeoutRef = useRef<ReturnType<Window["setTimeout"]>>(0);
  const [valueToCheck, setValueToCheck] = useState("");
  const checkValue = valueToCheck.trim() && valueToCheck !== currentSlug;

  const res = useContractCall(
    checkValue && {
      abi: factory,
      method: "projects",
      address: process.env.REACT_APP_FACTORY_ADDRESS,
      args: [stringToBytes32(valueToCheck.trim())],
    }
  );
  const status = useMemo(() => {
    let status: "idle" | "loading" | "unique" | "busy" = "idle";

    if (res) {
      if (res[0] === constants.AddressZero) {
        status = "unique";
      } else {
        status = "busy";
      }
    } else if (checkValue) {
      status = "loading";
    }

    return status;
  }, [res]);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>) => {
      window.clearTimeout(timeoutRef.current);
      setValueToCheck(value);
      onBlur(e);
    },
    [value, onBlur]
  );

  useEffect(() => {
    if (status === "unique") {
      setUniqueValue(true);
    } else if (status === "busy") {
      setUniqueValue(false);
    }
  }, [status]);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => setValueToCheck(value), 500);

    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, [value]);

  return (
    <InputGroup>
      <Input value={value} onBlur={handleBlur} {...field} {...rest} />
      {status === "loading" && (
        <InputRightElement
          children={<Spinner size="sm" colorScheme="brand" />}
        />
      )}
      {status === "unique" && (
        <InputRightElement children={<CheckIcon color="green" />} />
      )}
    </InputGroup>
  );
};

export default SlugInputField;
