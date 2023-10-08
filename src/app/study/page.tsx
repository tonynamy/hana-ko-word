"use client";

import { Page } from "@/components";
import { Word, WordsProvider, useWordsContext } from "@/words";
import { ArrowBackIcon, ArrowForwardIcon, EditIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Card,
  Code,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FlexProps,
  Heading,
  IconButton,
  Input,
  Text,
  useEditableControls,
  useToast,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import "swiper/css";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";

type EditableMemoProps = {
  memo: string;
  editMemo: (memo: string) => void;
};

const EditableMemo = ({ memo, editMemo }: EditableMemoProps) => {
  const EditableControls = () => {
    const { isEditing, getEditButtonProps } = useEditableControls();

    return (
      <Flex direction="row" gap={1}>
        <EditablePreview as={Code} {...getEditButtonProps()} />
        <Input as={EditableInput} />
      </Flex>
    );
  };

  const EmptyEditableControls = () => {
    const { isEditing, getEditButtonProps } = useEditableControls();

    return (
      <Flex direction="row" gap={1}>
        <Input as={EditableInput} />
        {!isEditing && (
          <IconButton
            aria-label="Edit"
            size="sm"
            icon={<EditIcon />}
            {...getEditButtonProps()}
          />
        )}
      </Flex>
    );
  };

  return (
    <Editable
      textAlign="center"
      defaultValue={memo}
      fontSize="sm"
      isPreviewFocusable={false}
      onSubmit={(next) => editMemo(next)}
    >
      {memo ? <EditableControls /> : <EmptyEditableControls />}
    </Editable>
  );
};

type MemoProps = {
  memo: string;
  editMemo: (memo: string) => void;
} & Pick<FlexProps, "visibility">;

const Memo = ({ memo, editMemo, visibility }: MemoProps) => {
  return (
    <Flex direction="row" alignItems="center" gap={1} visibility={visibility}>
      <EditableMemo memo={memo} editMemo={editMemo} />
    </Flex>
  );
};

type WordCardProps = Word;

const WordCard = ({ id, ko, jp, memo, checked }: WordCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    if (!isFlipped) {
      setIsFlipped((prevIsFlipped) => !prevIsFlipped);
    }
  };

  const toast = useToast();
  const swiper = useSwiper();
  const slide = useSwiperSlide();
  const { checkWord, setMemo } = useWordsContext();

  return (
    <Card
      variant="elevated"
      height="300px"
      px={4}
      textAlign="center"
      boxShadow="lg"
      cursor="pointer"
      onClick={handleCardClick}
      transition="transform 0.6s"
      transform={isFlipped ? "scale(-1, 1)" : ""}
    >
      <Flex
        direction="row"
        height="100%"
        visibility={slide.isActive ? "visible" : "hidden"}
        transform={isFlipped ? "scale(-1, 1)" : ""}
      >
        <Flex
          direction="column"
          flexGrow={0}
          height="100%"
          justifyContent="center"
        >
          <IconButton
            aria-label="이전"
            flexGrow={0}
            icon={<ArrowBackIcon />}
            visibility={isFlipped ? "visible" : "hidden"}
            onClick={(e) => {
              e.stopPropagation();
              if (swiper.isBeginning) {
                toast.closeAll();
                toast({ title: "첫 카드에요.", status: "info" });
              } else {
                swiper.slidePrev();
              }
            }}
          />
        </Flex>
        <Flex direction="column" flexGrow={1} justifyContent="center">
          {slide.isActive && (
            <Flex direction="column" alignItems="center" gap={2}>
              {checked ? (
                <Badge
                  colorScheme="green"
                  visibility={isFlipped ? "visible" : "hidden"}
                >
                  쉬운 단어
                </Badge>
              ) : (
                <Badge
                  colorScheme="red"
                  visibility={isFlipped ? "visible" : "hidden"}
                >
                  어려운 단어
                </Badge>
              )}
              <Heading size="lg">{ko}</Heading>
              <Memo
                memo={memo}
                editMemo={(memo) => setMemo(id, memo)}
                visibility={isFlipped ? "visible" : "hidden"}
              />
              <Flex
                mt={2}
                direction="column"
                visibility={isFlipped ? "visible" : "hidden"}
                gap={5}
              >
                <Text decoration="gray">{jp}</Text>
                <Flex direction="row" gap={2} justifyContent="center">
                  <Button
                    onClick={(e) => {
                      toast.closeAll();
                      toast({
                        title: "쉬운 단어로 체크했어요.",
                        status: "success",
                        duration: 1500,
                      });
                      checkWord(id, true);
                      e.stopPropagation();
                    }}
                  >
                    쉬워요
                  </Button>
                  <Button
                    onClick={(e) => {
                      toast.closeAll();
                      toast({
                        title: "어려운 단어로 체크했어요.",
                        status: "error",
                        duration: 1500,
                      });
                      checkWord(id, false);
                      e.stopPropagation();
                    }}
                  >
                    어려워요
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>
        <Flex
          direction="column"
          flexGrow={0}
          height="100%"
          justifyContent="center"
        >
          <IconButton
            aria-label="다음"
            icon={<ArrowForwardIcon />}
            visibility={isFlipped ? "visible" : "hidden"}
            onClick={(e) => {
              e.stopPropagation();
              if (swiper.isEnd) {
                toast.closeAll();
                toast({ title: "마지막 카드에요.", status: "info" });
              } else {
                swiper.slideNext();
              }
            }}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

const WordsSwiper = () => {
  const { words } = useWordsContext();

  const slides = useMemo(() => {
    return words.map((word, index) => (
      <SwiperSlide key={index}>
        <WordCard key={index} {...word} />
      </SwiperSlide>
    ));
  }, [JSON.stringify(words)]);
  return (
    <Swiper
      modules={[EffectCards]}
      direction="horizontal"
      slidesPerView="auto"
      effect="cards"
      cardsEffect={{
        perSlideRotate: 2,
      }}
      navigation
    >
      {slides}
    </Swiper>
  );
};

export default function StudyPage() {
  return (
    <Page>
      <Flex>
        <WordsProvider>
          <WordsSwiper />
        </WordsProvider>
      </Flex>
    </Page>
  );
}
