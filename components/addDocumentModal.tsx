import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Category, Tag } from "@prisma/client";
import { useEffect, useState } from "react";
import { FiPlus, FiSave } from "react-icons/fi";
import { fetchGet, fetchPost } from "../lib/fetchUtils";

const AddDocumentModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadTagsAndCategories = async () => {
    setLoading(true);
    const loadedTags = await fetchGet("http://localhost:3000/api/tag");
    const loadedCategories = await fetchGet(
      "http://localhost:3000/api/category"
    );
    setTags(loadedTags);
    setCategories(loadedCategories);
    setLoading(false);
  };
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);

  const saveDocument = () => {
    const request = {
      title,
      url,
    };
    console.log(request);

    fetchPost("http://localhost:3000/api/document", { title, url });
  };

  useEffect(() => {
    loadTagsAndCategories();
  }, []);

  return (
    <>
      <Button onClick={onOpen} leftIcon={<FiPlus />}>
        Add Document
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="url">URL</FormLabel>
              <Input
                id="url"
                type="text"
                value={url}
                onChange={handleUrlChange}
              />
            </FormControl>

            {!loading && tags.map((tag) => <div key={tag.id}>{tag.name}</div>)}
            {!loading &&
              categories.map((category) => (
                <div key={category.id}>{category.name}</div>
              ))}
          </ModalBody>

          <ModalFooter>
            <Button onClick={saveDocument} leftIcon={<FiSave />}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddDocumentModal;
