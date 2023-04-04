import { internalApi } from "@/shared/api/internalApi";
import { HTTPMethods, InternalTags } from "@/shared/api/types";
import { getErrorReason } from "@/shared/api/utils";
import { COMMENTS_API_ENDPOINT } from "@/shared/constants/forum";

import { AddCommentMutation } from "./types";

const commentsApi = internalApi.injectEndpoints({
  endpoints: builder => ({
    addComment: builder.mutation<undefined, AddCommentMutation>({
      query: ({ comment, topicId, parentId, authorId }) => ({
        url: `/${COMMENTS_API_ENDPOINT}/`,
        method: HTTPMethods.POST,
        body: {
          comment,
          topic_id: topicId,
          author_id: authorId,
          parent_id: parentId ?? null,
        },
      }),
      transformErrorResponse(response) {
        return getErrorReason(response);
      },
      invalidatesTags: [InternalTags.COMMENTS],
    }),
  }),
});

export const { useAddCommentMutation } = commentsApi;