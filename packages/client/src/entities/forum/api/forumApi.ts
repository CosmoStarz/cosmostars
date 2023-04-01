import { baseForumApi } from "@/shared/api/baseForumApi";
import { Tags } from "@/shared/api/types";
import { getErrorReason } from "@/shared/api/utils";
import { FORUM_API_ENDPOINT } from "@/shared/constants/forum";

import { TopicData, TopicsData } from "./types/frontend";

const forumApi = baseForumApi.injectEndpoints({
  endpoints: builder => ({
    getTopics: builder.query<TopicsData, void>({
      query: () => ({
        url: `/${FORUM_API_ENDPOINT}`,
      }),
      transformErrorResponse: response => getErrorReason(response),
      providesTags: [Tags.FORUM],
    }),
    getOneTopic: builder.query<TopicData, number>({
      query: id => ({
        url: `/${FORUM_API_ENDPOINT}/${id}`,
      }),
      transformErrorResponse: response => getErrorReason(response),
    }),
  }),
});

export const { useGetTopicsQuery, useGetOneTopicQuery } = forumApi;
