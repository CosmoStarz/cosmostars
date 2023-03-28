import { internalApi } from "@/shared/api/internalApi";
import { HTTPMethods, InternalTags } from "@/shared/api/types";
import { getErrorReason } from "@/shared/api/utils";
import { TOPICS_API_ENDPOINT } from "@/shared/constants/forum";

import { AddTopicMutation } from "./types";

const topicsApi = internalApi.injectEndpoints({
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
      invalidatesTags: [InternalTags.TOPICS],
    }),
  }),
});

export const { useAddTopicMutation } = topicsApi;
