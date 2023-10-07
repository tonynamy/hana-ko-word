import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { Fetch } from "react-request";

export type Word = {
  ko: string;
  jp: string;
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
    <Fetch<Word[]> url="/api/words/">
      {({ fetching, failed, data, doFetch }) => (
        <WordsContext.Provider
          value={{
            words: data ?? [],
            checkWord(id, checked) {
              axios
                .patch(`/api/words/check/${id}`, {
                  checked,
                })
                .then(() => doFetch());
            },
            setMemo(id, memo) {
              axios
                .patch(`/api/words/memo/${id}`, {
                  memo,
                })
                .then(() => doFetch());
            },
            deleteWord(id) {
              axios.delete(`/api/words/${id}`).then(() => doFetch());
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
