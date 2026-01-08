import { blogTitleLength,  blogPostFormSubmitType } from "../src/constants"

import type {
    BlogPostFormSubmitType,
    BlogPostFormData,
    CreateBlogPostFormData,
    EditBlogPostFormData,
    DeleteBlogPostFormData,
}   from "../src/types/bitkrets";

export function validateBlogPostFormData(formData: BlogPostFormData) {
  const blogTitle = formData.blogTitle;
  const blogText = formData.blogText;

  if (typeof blogTitle === "string" && typeof blogText === "string") {
    return blogTitle.length > 0 && blogText.length > 0;
  }

  return false;
}

// email
export function validateEmailAddressStructure(emailAddress: string) {
  const validEmailStructure =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return validEmailStructure.test(emailAddress);
}

// password
export function validatePassword(password: string) {
  const validPasswordStrength =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{16,}$/;
  return validPasswordStrength.test(password);
}

// blog id
export function validateBlogIdIsNumber(blogId: string) {
  if (!blogId || blogId.trim() === "") return false;
  return Number.isInteger(Number(blogId));
}

export function validateBlogId(blogId: string) {
  return validateBlogIdIsNumber(blogId);
}

// blog title
export function validateBlogTitleIsString(blogTitle: string) {
  return typeof blogTitle === "string";
}

export function validateBlogTitleLength(blogTitle: string) {
  return (
    blogTitle.length > blogTitleLength.minLength &&
    blogTitle.length < blogTitleLength.maxLength
  );
}

export function validateBlogTitle(blogTitle: string) {
  return (
    validateBlogTitleIsString(blogTitle) &&
    validateBlogTitleLength(blogTitle)
  );
}

// blog text
export function validateBlogTextIsString(blogText: string) {
  return typeof blogText === "string";
}

export function validateBlogTextLength(blogText: string) {
  return blogText.length > 0 && blogText.length <= 1000;
}

export function validateBlogText(blogText: string) {
  return (
    validateBlogTextIsString(blogText) &&
    validateBlogTextLength(blogText)
  );
}

// submit type
export function validateSubmitType(
  submitType: BlogPostFormSubmitType,
  expected: BlogPostFormSubmitType
) {
  return submitType === expected;
}

// create
export function validateCreateBlogPostFormData(
  createBlogPostFormData: CreateBlogPostFormData
) {
  const validBlogTitle = validateBlogTitle(createBlogPostFormData.blogTitle);
  const validBlogText = validateBlogText(createBlogPostFormData.blogText);
  const validSubmitType = validateSubmitType(
    createBlogPostFormData.submitType,
    blogPostFormSubmitType.create
  );

  return validBlogTitle && validBlogText && validSubmitType;
}

// edit
export function validateEditBlogPostFormData(
  editBlogPostFormData: EditBlogPostFormData
) {
  const validBlogId = validateBlogId(editBlogPostFormData.blogId);
  const validBlogTitle = validateBlogTitle(editBlogPostFormData.blogTitle);
  const validBlogText = validateBlogText(editBlogPostFormData.blogText);
  const validSubmitType = validateSubmitType(
    editBlogPostFormData.submitType,
    blogPostFormSubmitType.edit
  );

  return validBlogId && validBlogTitle && validBlogText && validSubmitType;
}

// delete
export function validateDeleteBlogPostFormData(
  deleteBlogPostFormData: DeleteBlogPostFormData
) {
  return false;
}