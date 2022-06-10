import {
  Box,
  Button,
  Flex,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Tag as TagType } from ".prisma/client";

const Home = () => {
  const { data: session, status } = useSession();
  const [tags, setTags] = useState<TagType[]>([]);
  const [tag, setTag] = useState("");

  const loadTags = async () => {
    const tags = await fetch("http://localhost:3000/api/tag");
    setTags(await tags.json());
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
    }).then(() => loadTags());;
  };

  const handleChange = (event) => setTag(event.target.value);

  useEffect(() => {
    loadTags();
  }, [loadTags]);

  return status !== "loading" ? (
    <Box>
      Home page
      <Button onClick={loadTags}>Load</Button>
      <Flex gap={2}>
        {tags.map((tag) => (
          <Tag colorScheme="purple" key={tag.id}>
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
  ) : (
    <div>Loading</div>
  );
};

export default Home;
