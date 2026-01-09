import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response } from 'express';
import { createBlogPost, editBlogPost, deleteBlogPost, getBlogPost, getAllBlogPosts } from '../../../src/backend/controllers/dashboardController';
import { blogPostFormSubmitType } from '../../../src/constants';
import { collections } from '../../../src/backend/db';

describe('Dashboard Controller', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        vi.resetAllMocks();
        mockRequest = {};
        mockResponse = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn(),
            json: vi.fn().mockReturnThis(),
        } as unknown as Response;
    });

    it('should pass a dummy test to ensure it works', () => {
        expect(true).toBe(true);
    });

    describe('createBlogPost', () => {
        it('should return 200 when creating a valid post', async () => {
             // Arrange
             mockRequest.body = {
                 blogTitle: "Test Title",
                 blogText: "Test Text",
                 submitType: blogPostFormSubmitType.create
             };

             
             await createBlogPost(mockRequest as Request, mockResponse as Response);

             
             expect(mockResponse.status).toHaveBeenCalledWith(200);
        });
    });

    describe('editBlogPost', () => {
        it('should return 200 when updating a valid post', async () => {
             mockRequest.body = {
                 blogId: "65e6d8a3a9b9a8b1a8b1a8b1", // Example ObjectId
                 blogTitle: "Updated Title",
                 blogText: "Updated Text",
                 submitType: blogPostFormSubmitType.edit
             };

             await editBlogPost(mockRequest as Request, mockResponse as Response);

             expect(mockResponse.status).toHaveBeenCalledWith(200);
        });
    });

    describe('deleteBlogPost', () => {
        it('should return 200 when deleting a post', async () => {
            
             mockRequest.body = {
                 blogId: "123",
                 submitType: blogPostFormSubmitType.delete
             };

             await deleteBlogPost(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });
    });
    describe('getBlogPost', () => {
        it ('should return 404 when post does not exist', async () => {
            mockRequest.params = {
                blogId:'123'
            }

            await getBlogPost(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
        })
    })
    describe('getAllBlogPosts', () => {
        it("should return 200 and a list of posts", async () => {
    
            collections.blogPosts = {
                find: vi.fn().mockReturnThis(),
                toArray: vi.fn().mockResolvedValue([{ title: 'Test Post' }])
            } as any;

            await getAllBlogPosts(mockRequest as Request, mockResponse as Response);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        it("should return 204 if no posts are found", async () => {
            collections.blogPosts = undefined;

            await getAllBlogPosts(mockRequest as Request, mockResponse as Response);
            expect(mockResponse.status).toHaveBeenCalledWith(204);
        });
    });
});

