import { Flex } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { Category, Tag as TagType } from "@prisma/client";
import SettingsCard from "../components/settingsCard";
import { fetchDelete, fetchGet, fetchPost } from "../lib/fetchUtils";

const Settings = () => {
  const [tags, setTags] = useState<TagType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const loadTags = useCallback(async () => {
    setTags(await fetchGet("http://localhost:3000/api/tag"));
  }, []);

  const loadCategories = useCallback(async () => {
    setCategories(await fetchGet("http://localhost:3000/api/category"));
  }, []);

  const insertTag = (name: string) => {
    fetchPost("http://localhost:3000/api/tag", { name }).then(() => loadTags());
  };

  const deleteTag = (id: number) => {
    fetchDelete("http://localhost:3000/api/tag", { id }).then(() => loadTags());
  };

  const insertCategory = (name: string) => {
    fetchPost("http://localhost:3000/api/category", { name }).then(() =>
      loadCategories()
    );
  };

  const deleteCategory = (id: number) => {
    fetchDelete("http://localhost:3000/api/category", { id }).then(() =>
      loadCategories()
    );
  };

  useEffect(() => {
    loadTags();
    loadCategories();
  }, [loadTags, loadCategories]);

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
