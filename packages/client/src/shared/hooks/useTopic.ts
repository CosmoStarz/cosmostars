import { useState } from "react";

import { useLazyGetCommentsQuery } from "@/entities/forum/comments/api";
import { CommentsDataRequest } from "@/entities/forum/comments/api/types";
import { useLazyGetOneTopicQuery } from "@/entities/forum/topics/api";
import { TopicItemDataRequest } from "@/entities/forum/topics/api/types";

export const useTopic = () => {
  const [currentTopic, setCurrentTopic] = useState<TopicItemDataRequest | null>(
    null
  );
  const [currentComments, setCurrentComments] =
    useState<CommentsDataRequest | null>(null);
  const [isLoadingTopic, setIsLoadingTopic] = useState<boolean>(false);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const loading = isLoadingTopic || isLoadingComments;
  const [getOneTopic] = useLazyGetOneTopicQuery();
  const [getComments] = useLazyGetCommentsQuery();

  const getCurrentTopic = async (topic: number, onError: () => void) => {
    setIsLoadingTopic(true);
    try {
      const { isSuccess, isError, data } = await getOneTopic(topic);
      if (isSuccess) {
        setCurrentTopic(data);
      }
      if (isError) {
        onError();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTopic(false);
    }
  };

  const getCurrentComments = async (topic: number) => {
    setIsLoadingComments(true);
    try {
      const { isSuccess, data } = await getComments(topic);
      if (isSuccess) {
        setCurrentComments(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  return {
    currentTopic,
    currentComments,
    getCurrentTopic,
    getCurrentComments,
    loading,
  };
};
