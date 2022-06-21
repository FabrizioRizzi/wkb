import { Link, Tag, Td, Tr } from "@chakra-ui/react";

const DocumentRow = ({ document }) => (
  <Tr>
    <Td>{document.id}</Td>
    <Td>{document.title}</Td>
    <Td>
      <Link href={document.url} isExternal>
        {document.url}
      </Link>
    </Td>
    <Td>
      {document.tags.map((tag) => (
        <Tag size="sm" marginInlineEnd="1" color="teal">
          {tag.name}
        </Tag>
      ))}
    </Td>
    <Td>{document.category.name}</Td>
  </Tr>
);

export default DocumentRow;
