import { describe, it, expect } from 'vitest';
import { getFormDataFromInputs, getPostDataForDelete } from '../../../src/frontend/formHandler';
import { blogPostFormSubmitType } from '../../../src/constants';

describe('formHandler', () => {
    describe('getFormDataFromInputs', () => {
        it('should return a valid blogpostformdata when inputs are valid', () => {
            const result = getFormDataFromInputs(
                "123",
                "This is a valid blog title",
                "Some text",
                blogPostFormSubmitType.create
            );

            expect(result).not.toBeNull();
            expect(result?.blogTitle).toBe("This is a valid blog title");
        });

        it('should return null if title is too short', () => {
            const result = getFormDataFromInputs(
                "123",
                "Short",
                "Valid text",
                blogPostFormSubmitType.create
            );

            expect(result).toBeNull();
        });
    });

    describe('getPostDataForDelete', () => {
        it('should return a valid object structured for delete', () => {
            const postId = "999";
            const result = getPostDataForDelete(postId);

            expect(result.blogId).toBe("999");
            expect(result.submitType).toBe(blogPostFormSubmitType.delete);
            expect(result.blogTitle).toBe("delete");
        });
    });
});
