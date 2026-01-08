import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response } from 'express';
import { createBlogPost } from '../../../src/backend/controllers/dashboardController';
import { blogPostFormSubmitType } from '../../../src/constants';

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
});
