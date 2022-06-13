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
import SettingsCard from "../components/settingsCard";

const Settings = () => {
  const [tags, setTags] = useState<TagType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const loadTags = async () => {
    const tags = await fetch("http://localhost:3000/api/tag");
    setTags(await tags.json());
  };

  const loadCategories = async () => {
    const categories = await fetch("http://localhost:3000/api/category");
    setCategories(await categories.json());
  };

  const insertTag = (name: string) => {
    fetch("http://localhost:3000/api/tag", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
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

  const insertCategory = (name: string) => {
    fetch("http://localhost:3000/api/category", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
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

  useEffect(() => {
    loadTags();
    loadCategories();
  }, [loadTags]);

  return (
    <Flex justifyContent="center" margin={5} gap={5} wrap="wrap">
      <SettingsCard
        title="Tags"
        elements={tags}
        onLoad={loadTags}
        onDelete={deleteTag}
        onAdd={insertTag}
      />

      <SettingsCard
        title="Categories"
        elements={categories}
        onLoad={loadCategories}
        onDelete={deleteCategory}
        onAdd={insertCategory}
      />
    </Flex>
  );
};

export default Settings;
