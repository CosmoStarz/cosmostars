import { HTTPMethods } from "@/shared/api/types";
import { getErrorReason } from "@/shared/api/utils";
import { yandexApi } from "@/shared/api/yandexApi";
import { TOPICS_API_ENDPOINT } from "@/shared/constants/forum";
import { AddTopicMutation } from "./types";

const topicsApi = yandexApi.injectEndpoints({
  endpoints: builder => ({
    addTopic: builder.mutation<undefined, AddTopicMutation>({
      query: topicData => ({
        url: `/${TOPICS_API_ENDPOINT}`,
        method: HTTPMethods.POST,
        body: topicData,
      }),
      transformErrorResponse(response) {
        return getErrorReason(response);
      },
    }),
  }),
});

export const { useAddTopicMutation } = topicsApi;
