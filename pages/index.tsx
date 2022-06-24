import {
  Box,
  Button,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { Document as DocumentType } from "@prisma/client";
import { fetchGet } from "../lib/fetchUtils";
import DocumentRow from "../components/documentRow";

const Home = () => {
  const { status } = useSession();
  const [docs, setDocs] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const size = "1";

  const loadDocsTagsAndCategories = useCallback(async () => {
    setLoading(true);
    const newDocs = await fetchGet(
      `http://localhost:3000/api/document?${new URLSearchParams({ size })}`
    );
    setDocs(newDocs);
    setLoading(false);
  }, []);

  const prevPage = async () => {
    setLoading(true);
    const newDocs = await fetchGet(
      `http://localhost:3000/api/document?${new URLSearchParams({
        size,
        firstCursor: docs[0].id.toString(),
      })}`
    );
    setDocs(newDocs);
    setLoading(false);
  };

  const nextPage = async () => {
    setLoading(true);
    const newDocs = await fetchGet(
      `http://localhost:3000/api/document?${new URLSearchParams({
        size,
        lastCursor: docs[docs.length - 1].id.toString(),
      })}`
    );
    setDocs(newDocs);
    setLoading(false);
  };

  useEffect(() => {
    loadDocsTagsAndCategories();
  }, [loadDocsTagsAndCategories]);

  return status !== "loading" ? (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>URL</Th>
              <Th>Tags</Th>
              <Th>Category</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td>
                  <SkeletonText noOfLines={1} />
                </Td>
                <Td>
                  <SkeletonText noOfLines={1} />
                </Td>
                <Td>
                  <SkeletonText noOfLines={1} />
                </Td>
                <Td>
                  <SkeletonText noOfLines={1} />
                </Td>
                <Td>
                  <SkeletonText noOfLines={1} />
                </Td>
              </Tr>
            ) : (
              docs.map((doc) => <DocumentRow key={doc.id} document={doc} />)
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <Button onClick={prevPage}>Prova1</Button>
      <Button onClick={nextPage}>Prova</Button>
    </Box>
  ) : (
    <div>Loading</div>
  );
};

export default Home;
