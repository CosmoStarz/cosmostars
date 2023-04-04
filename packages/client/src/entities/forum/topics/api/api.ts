import { internalApi } from "@/shared/api/internalApi";
import { HTTPMethods, InternalTags } from "@/shared/api/types";
import { getErrorReason } from "@/shared/api/utils";
import { TOPICS_API_ENDPOINT } from "@/shared/constants/forum";

import { AddTopicMutation, TopicItemData, TopicsData } from "./types";

const topicsApi = internalApi.injectEndpoints({
  endpoints: builder => ({
    addTopic: builder.mutation<undefined, AddTopicMutation>({
      query: ({ title, description, authorId }) => ({
        url: `/${TOPICS_API_ENDPOINT}/`,
        method: HTTPMethods.POST,
        body: { title, description, author_id: authorId },
      }),
      transformErrorResponse(response) {
        return getErrorReason(response);
      },
      invalidatesTags: [InternalTags.TOPICS],
    }),
    getTopics: builder.query<TopicsData, void>({
      query: () => ({
        url: `/${TOPICS_API_ENDPOINT}/`,
      }),
      transformErrorResponse: response => getErrorReason(response),
      providesTags: [InternalTags.TOPICS],
    }),
    getOneTopic: builder.query<TopicItemData, number>({
      query: id => ({
        url: `/${TOPICS_API_ENDPOINT}/${id}/`,
      }),
      transformErrorResponse: response => getErrorReason(response),
    }),
  }),
});

export const {
  useAddTopicMutation,
  useGetTopicsQuery,
  useLazyGetOneTopicQuery,
} = topicsApi;
