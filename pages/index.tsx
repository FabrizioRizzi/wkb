import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Document as DocumentType } from ".prisma/client";
import { useEffect, useState } from "react";
import { fetchGet } from "../lib/fetchUtils";
import DocumentRow from "../components/documentRow";

const Home = () => {
  const { data: session, status } = useSession();
  const [docs, setDocs] = useState<DocumentType[]>([]);
  const size = "1";

  const loadDocs = async () => {
    setDocs(
      await fetchGet(
        "http://localhost:3000/api/document?" +
          new URLSearchParams({
            size,
          })
      )
    );
  };

  const prevPage = async () => {
    setDocs(
      await fetchGet(
        "http://localhost:3000/api/document?" +
          new URLSearchParams({
            size,
            firstCursor: docs[0].id.toString(),
          })
      )
    );
  };

  const nextPage = async () => {
    setDocs(
      await fetchGet(
        "http://localhost:3000/api/document?" +
          new URLSearchParams({
            size,
            lastCursor: docs[docs.length - 1].id.toString(),
          })
      )
    );
  };

  useEffect(() => {
    loadDocs();
  }, []);

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
            {docs.map((doc) => (
              <DocumentRow key={doc.id} document={doc} />
            ))}
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
