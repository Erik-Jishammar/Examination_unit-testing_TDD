import type { Request, Response } from "express";
import { collections } from "../db";
import type { BlogPostFormData } from "../../types/bitkrets";
import { validateBlogPostFormData } from "../../../utils/validate";
import { ObjectId } from "mongodb";
import { blogPostFormSubmitType } from "../../constants";

export async function getBlogPost(req: Request, res: Response) {
  
  try {
    const blogId = req.params.blogId;
    const post = await collections.blogPosts?.findOne({ _id: new ObjectId(blogId) });
    
    if (post) {
      return res.status(200).send(post);
    } else {
      return res.status(404).send("Blog post was not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Failed to get blog post");
  }
} 


export async function getAllBlogPosts(req: Request, res: Response) {
  try {
    const blogPosts = await collections.blogPosts?.find({}).toArray();
    if (blogPosts) {
      return res.status(200).send(blogPosts);
    } else {
      return res.status(204).send("There is not any blog posts to load");
    }
  } catch (error) {
    return res.status(500).send();
  }
}

export async function createBlogPost(req: Request, res: Response) {
  const formData: BlogPostFormData = req.body;
  
  if (!validateBlogPostFormData(formData)) {
    return res.status(400).send("Invalid form data!");
  }

  try {
    await collections.blogPosts?.insertOne(formData);
    console.log(`Created blogPost`);
    return res.status(200).send("created blog post");
  } catch (error) {
    return res.status(500).send("Failed to create blog post");
  }
}

export async function editBlogPost(req: Request, res: Response) {
  const formData: BlogPostFormData = req.body;

  if (!validateBlogPostFormData(formData)) {
    return res.status(400).send("Invalid form data!");
  }

  try {
    const filter = { _id: new ObjectId(formData.blogId) };
    const updateDoc = {
      $set: {
        blogTitle: formData.blogTitle,
        blogText: formData.blogText,
      },
    };
    
    await collections.blogPosts?.updateOne(filter, updateDoc);
    console.log(`Updated blogPost: ${formData.blogId}`);
    return res.status(200).send("updated blogPost to db");
  } catch (error) {
    return res.status(500).send("Failed to edit post");
  }
}

export async function deleteBlogPost(req: Request, res: Response) {
  const blogId = req.body.blogId;
  
  if (!blogId) {
     return res.status(400).send("Invalid form data!");
  }

  try {
    await collections.blogPosts?.deleteOne({ _id: new ObjectId(blogId) });
    console.log(`Deleted blogPost: ${blogId}`);
    return res.status(200).send("deleted blog post");
  } catch (error) {
    console.log(error);
    return res.status(500).send("failed to delete blog post");
  }
}

export async function dashboard(req: Request, res: Response) {
  const formData: BlogPostFormData = req.body;
  if (!validateBlogPostFormData(formData)) {
    return res.status(400).send("Invalid form data!");
  }
  if (formData.submitType === blogPostFormSubmitType.create) {
    try {
      await collections.blogPosts?.insertOne(formData);
      console.log(`Created blogPost`);
      return res.send("created blog post");
    } catch (error) {
      return res.send("Failed to create blog post");
    }
  } else if (formData.submitType === blogPostFormSubmitType.edit) {
    try {
      const filter = { _id: new ObjectId(formData.blogId) };
      const updateDoc = {
        $set: {
          blogTitle: formData.blogTitle,
          blogText: formData.blogText,
        },
      };
      await collections.blogPosts?.updateOne(filter, updateDoc);
      console.log(`Updated blogPost: ${formData.blogId}`);
      return res.send("updated to db");
    } catch (error) {
      return res.send("Failed to edit post");
    }
  } else if (formData.submitType === blogPostFormSubmitType.delete) {
    try {
      collections.blogPosts?.deleteOne({ _id: new ObjectId(formData.blogId) });
      res.status(200).send("deleted blog post");
    } catch (error) {
      return res.send("failed to delete blog post");
    }
  }
}
