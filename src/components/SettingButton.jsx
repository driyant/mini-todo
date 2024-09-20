import { Box } from "@chakra-ui/react";

const SettingButton = () => {
  return (
    <>
      <Box display="flex" gap="3px" marginLeft="1rem" cursor="pointer">
        <Box
          as="span"
          border="2px solid #757575"
          width="6px"
          height="6px"
          background="#757575"
          borderRadius="50%"
        ></Box>
        <Box
          as="span"
          border="2px solid #757575"
          width="6px"
          height="6px"
          background="#757575"
          borderRadius="50%"
        ></Box>
        <Box
          as="span"
          border="2px solid #757575"
          width="6px"
          height="6px"
          background="#757575"
          borderRadius="50%"
        ></Box>
      </Box>
    </>
  );
};

export default SettingButton;
