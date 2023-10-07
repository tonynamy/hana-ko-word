"use client";

import { Page } from "@/components";
import { Word, WordsConsumer, WordsProvider, useWordsContext } from "@/words";
import { CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useState } from "react";

const useWordDeleteModal = (wordId: number) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteWord } = useWordsContext();
  const useRenderModal = useCallback(
    () => (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>단어 삭제</ModalHeader>
          <ModalCloseButton />
          <ModalBody>정말 이 단어를 삭제하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              닫기
            </Button>
            <Button variant="red" onClick={() => deleteWord(wordId)}>
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    ),
    []
  );
  return [useRenderModal, onOpen, onClose] as const;
};

const WordForm = () => {
  const [ko, setKo] = useState("");
  const [jp, setJp] = useState("");
  const [memo, setMemo] = useState("");

  const { doFetch } = useWordsContext();

  return (
    <FormControl>
      <FormLabel>KO</FormLabel>
      <Input type="text" value={ko} onChange={(e) => setKo(e.target.value)} />
      <FormLabel>JP</FormLabel>
      <Input type="text" value={jp} onChange={(e) => setJp(e.target.value)} />
      <FormLabel>MEMO</FormLabel>
      <Input
        type="text"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <Button
        onClick={() => {
          axios
            .post("/api/words/", {
              ko: ko,
              jp: jp,
              memo,
            })
            .then(() => {
              doFetch();
              setKo("");
              setJp("");
              setMemo("");
            });
        }}
      >
        생성
      </Button>
    </FormControl>
  );
};

const WordRow = ({ word: { id, ko, jp, memo, checked } }: { word: Word }) => {
  const { checkWord } = useWordsContext();
  const [renderModal, onOpen] = useWordDeleteModal(0);
  return (
    <Tr>
      <Td>{ko}</Td>
      <Td>{jp}</Td>
      <Td isNumeric>{0}</Td>
      <Td isNumeric>{0}</Td>
      <Td>{memo}</Td>
      <Td>
        <Flex direction="row" alignItems="center" gap={2}>
          {checked ? (
            <Badge colorScheme="green" marginRight={2}>
              Checked-In
            </Badge>
          ) : (
            <Badge colorScheme="red" marginRight={2}>
              Failing
            </Badge>
          )}
          <IconButton
            aria-label="check"
            icon={checked ? <CloseIcon /> : <CheckIcon />}
            onClick={() => {
              checkWord(id, !checked);
            }}
          />
          <IconButton
            aria-label="delete"
            icon={<DeleteIcon />}
            onClick={() => onOpen()}
          />
        </Flex>
      </Td>
      {renderModal()}
    </Tr>
  );
};

export default function Home() {
  return (
    <Page padding={[0, 10]} direction="column" justifyContent="center">
      <WordsProvider>
        <TableContainer>
          <Table colorScheme="teal">
            <Thead>
              <Tr>
                <Th>한국어</Th>
                <Th>일본어</Th>
                <Th isNumeric>한-일</Th>
                <Th isNumeric>일-한</Th>
                <Th>메모</Th>
                <Th>체크</Th>
              </Tr>
            </Thead>
            <Tbody>
              <WordsConsumer>
                {({ checkWord, words }) =>
                  words.map((word, index) => (
                    <WordRow key={index} word={word} />
                  ))
                }
              </WordsConsumer>
            </Tbody>
          </Table>
        </TableContainer>
        <WordForm />
      </WordsProvider>
    </Page>
  );
}
