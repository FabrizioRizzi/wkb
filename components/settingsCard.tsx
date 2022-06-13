import { Box, Button, Flex, Input, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import { useState } from "react";

const SettingsCard = ({title, elements, onLoad, onAdd, onDelete}) => {
  const [name, setName] = useState<string>('');
  
  const handleChange = (event) => setName(event.target.value);

  return (
    <Box boxSize="sm" bgColor="gray.100" padding={3} borderRadius={10}>
        <Box>{title}</Box>
        <Button onClick={onLoad}>Load</Button>
        <Flex gap={2} wrap="wrap">
          {elements.map((element) => (
            <Tag colorScheme="purple" key={element.id} width="min-content">
              <TagLabel>{element.name}</TagLabel>
              <TagCloseButton onClick={() => onDelete(element.id)} />
            </Tag>
          ))}
        </Flex>
        <Input
          value={name}
          onChange={handleChange}
          placeholder="Here is a sample placeholder"
          size="sm"
        />
        <Button onClick={() => onAdd(name)}>Insert</Button>
      </Box>
  );
};

export default SettingsCard;
