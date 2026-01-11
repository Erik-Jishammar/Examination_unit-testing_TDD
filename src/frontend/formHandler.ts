import { validateBlogTitle } from "../../utils/validate";
import type { BlogPostFormData, BlogPostFormSubmitType } from "../types/bitkrets";
import { blogPostFormSubmitType } from "../constants";
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
} // delete 
export function getPostDataForDelete(blogId: string):BlogPostFormData{
    return {
        blogId,
        blogTitle: "delete",
        blogText: "delete",
        submitType: blogPostFormSubmitType.delete
    };
}
