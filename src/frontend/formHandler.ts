import { validateBlogTitle } from "../../utils/validate";
import type { BlogPostFormData, BlogPostFormSubmitType } from "../types/bitkrets";

export function getFormDataFromInputs(
    blogId: string,
    blogTitle: string,
    blogText: string,
    submitType: BlogPostFormSubmitType
): BlogPostFormData | null {
    
    // validate title
    const isValid = validateBlogTitle(blogTitle);

    if (!isValid) {
        return null;
    }

    return {
        blogId,
        blogTitle,
        blogText,
        submitType
    };
}
export function getPostDataForDelete(blogId: string):any{
    return {}; // logic inc
}
