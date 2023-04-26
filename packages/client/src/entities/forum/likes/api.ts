import { internalApi } from "@/shared/api/internalApi";
import { HTTPMethods, InternalTags } from "@/shared/api/types";
import { getErrorReason } from "@/shared/api/utils";
import { LIKES_API_ENDPOINT } from "@/shared/constants/forum";

const likesApi = internalApi.injectEndpoints({
  endpoints: builder => ({
    addLike: builder.mutation<undefined, number>({
      query: id => ({
        url: `/${LIKES_API_ENDPOINT}/`,
        method: HTTPMethods.POST,
        body: {
          comment_id: id,
        },
      }),
      transformErrorResponse: response => getErrorReason(response),
      invalidatesTags: [InternalTags.COMMENTS],
    }),
    deleteLike: builder.mutation<undefined, number>({
      query: id => ({
        url: `/${LIKES_API_ENDPOINT}/`,
        method: HTTPMethods.DELETE,
        body: {
          comment_id: id,
        },
      }),
      transformErrorResponse: response => getErrorReason(response),
      invalidatesTags: [InternalTags.COMMENTS],
    }),
  }),
});

export const { useAddLikeMutation, useDeleteLikeMutation } = likesApi;
