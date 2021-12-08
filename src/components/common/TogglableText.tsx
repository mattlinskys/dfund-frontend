import React, { useState, useLayoutEffect, useRef } from "react";
import { Button, Text, TextProps } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";

interface TogglableTextProps extends TextProps {}

const TogglableText: React.FC<TogglableTextProps> = ({
  noOfLines,
  ...rest
}) => {
  const [isClamped, setClamped] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const ref = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;

    if (el) {
      const clampedHeight = el.offsetHeight;

      el.style.setProperty("--chakra-line-clamp", "0");
      setClamped(el.offsetHeight > clampedHeight);
      if (noOfLines !== undefined) {
        el.style.setProperty("--chakra-line-clamp", noOfLines.toString());
      }
    }
  });

  return (
    <>
      <Text
        ref={ref}
        noOfLines={isExpanded ? undefined : noOfLines}
        {...rest}
      />
      {(isClamped || isExpanded) && (
        <Button
          onClick={() => setExpanded(!isExpanded)}
          variant="text"
          size="xs"
          fontSize="sm"
          p="0"
          color="brand.500"
          fontWeight="medium"
        >
          (
          <FormattedMessage
            id={isExpanded ? "common.showLess" : "common.showMore"}
          />
          )
        </Button>
      )}
    </>
  );
};

export default TogglableText;
