import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { Fetch } from "react-request";

export type Word = {
  ko_word: string;
  jp_word: string;
  memo: string;
  id: number;
  checked: boolean;
};

type WordsContextType = {
  words: Word[];
  checkWord: (id: number, checked: boolean) => void;
  deleteWord: (id: number) => void;
  setMemo: (id: number, memo: string) => void;
  doFetch: () => void;
};

const WordsContext = createContext<WordsContextType>({} as WordsContextType);

export const useWordsContext = () => useContext(WordsContext);

export const WordsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Fetch<Word[]> url="http://127.0.0.1:8000/words/">
      {({ fetching, failed, data, doFetch }) => (
        <WordsContext.Provider
          value={{
            words: data ?? [],
            checkWord(id, checked) {
              axios
                .patch(`http://127.0.0.1:8000/words/${id}`, {
                  checked,
                })
                .then(() => doFetch());
            },
            setMemo(id, memo) {
              axios
                .patch(`http://127.0.0.1:8000/words/${id}`, {
                  memo,
                })
                .then(() => doFetch());
            },
            deleteWord(id) {
              axios
                .delete(`http://127.0.0.1:8000/words/${id}`)
                .then(() => doFetch());
            },
            doFetch,
          }}
        >
          {children}
        </WordsContext.Provider>
      )}
    </Fetch>
  );
};

type WordConsumerProps = {
  children: (value: WordsContextType) => ReactNode;
};

export const WordsConsumer = ({ children }: WordConsumerProps) => (
  <WordsContext.Consumer>{children}</WordsContext.Consumer>
);
