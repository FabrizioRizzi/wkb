import {
  Box,
  Button,
  Flex,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Category, Tag as TagType } from ".prisma/client";

const Settings = () => {
  const [tags, setTags] = useState<TagType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");
  
  const loadTags = async () => {
    const tags = await fetch("http://localhost:3000/api/tag");
    setTags(await tags.json());
  };

  const loadCategories = async () => {
    const categories = await fetch("http://localhost:3000/api/category");
    setCategories(await categories.json());
  };

  const insert = () => {
    fetch("http://localhost:3000/api/tag", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: tag }),
    }).then(() => loadTags());
  };

  const deleteTag = (id: number) => {
    fetch("http://localhost:3000/api/tag", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then(() => loadTags());
  };

  const insertCategory = () => {
    fetch("http://localhost:3000/api/category", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: category }),
    }).then(() => loadCategories());
  };

  const deleteCategory = (id: number) => {
    fetch("http://localhost:3000/api/category", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then(() => loadCategories());
  };

  const handleChange = (event) => setTag(event.target.value);
  const handleChangeCategory = (event) => setCategory(event.target.value);

  useEffect(() => {
    loadTags();
    loadCategories();
  }, [loadTags]);

  return (
    <Flex justifyContent="center" margin={5} gap={5} wrap="wrap">
      <Box boxSize="sm" bgColor="gray.100" padding={3} borderRadius={10}>
        <Box>Tags</Box>
        <Button onClick={loadTags}>Load</Button>
        <Flex gap={2} wrap="wrap">
          {tags.map((tag) => (
            <Tag colorScheme="purple" key={tag.id} width="min-content">
              <TagLabel>{tag.name}</TagLabel>
              <TagCloseButton onClick={() => deleteTag(tag.id)} />
            </Tag>
          ))}
        </Flex>
        <Input
          value={tag}
          onChange={handleChange}
          placeholder="Here is a sample placeholder"
          size="sm"
        />
        <Button onClick={insert}>Insert</Button>
      </Box>
      <Box boxSize="sm" bgColor="gray.100" padding={3} borderRadius={10}>
        <Box>Categories</Box>
        <Button onClick={loadTags}>Load</Button>
        <Flex gap={2} wrap="wrap">
          {categories.map((category) => (
            <Tag colorScheme="purple" key={category.id} width="min-content">
              <TagLabel>{category.name}</TagLabel>
              <TagCloseButton onClick={() => deleteCategory(category.id)} />
            </Tag>
          ))}
        </Flex>
        <Input
          value={category}
          onChange={handleChangeCategory}
          placeholder="Here is a sample placeholder"
          size="sm"
        />
        <Button onClick={insertCategory}>Insert</Button>
      </Box>
    </Flex>
  );
};

export default Settings;
