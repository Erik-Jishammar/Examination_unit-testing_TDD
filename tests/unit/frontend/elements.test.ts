import { describe, test, expect } from "vitest";
import { createBlogPostForm, createBlogPostList } from "../../../src/frontend/elements";

describe("createBlogPostForm", () => {
    test("returns a form with correct inputs and button", () => {
        const html = createBlogPostForm();
        
        // Basic element checks
        expect(html).toContain('<form');
        expect(html).toContain('id="blog-form"');
        
        // Input fields checks from original dashboard.ts
        expect(html).toContain('id="blog-id"');
        expect(html).toContain('id="blog-title"');
        expect(html).toContain('id="blog-text"');
        
        // Button check
        expect(html).toContain('id="submit-button"');
        expect(html).toContain('data-submit-type="create"');
    });
});

describe("createBlogPostList", () => {
   test("returns html for a list of blog posts", () => {
        const mockPosts = [
            { _id: "1", blogTitle: "Title 1", blogText: "Text 1" } as any,
            { _id: "2", blogTitle: "Title 2", blogText: "Text 2" } as any
        ];
        
        const html = createBlogPostList(mockPosts);
        
        // Check if both posts are rendered
        expect(html).toContain("Title 1");
        expect(html).toContain("Text 1");
        expect(html).toContain("Title 2");
        expect(html).toContain("Text 2");
        
        // Check for action buttons
        expect(html).toContain('data-edit="1"');
        expect(html).toContain('data-delete="1"');
   });
   
   test("returns empty string for empty list", () => {
       const html = createBlogPostList([]);
       expect(html).toBe("");
   });
});
