import { test, expect, describe } from "vitest";
import { blogTitleLength,blogPostFormSubmitType } from "../../src/constants";
import {
  validateBlogPostFormData,
  validateEmailAddressStructure,
  validatePassword, 
  validateBlogIdIsNumber, 
  validateBlogTitleLength,
  validateCreateBlogPostFormData,
  validateEditBlogPostFormData,
  validateDeleteBlogPostFormData,
  
} from "../../utils/validate";


/*

// Old test...
test("test validate formData is string", () => {
  expect(
    validateBlogPostFormData({
      blogId: "fakeID",
      blogTitle: "asd",
      blogText: "asd",
      submitType: "create",
    })
  ).toBe(true);
});

*/

describe("validateEmailAddressStructure", () => {
  test("returns false for invalid email", () => {
    expect(validateEmailAddressStructure("asd@asd")).toBe(false);
  });
  test("returns true for valid email", () => {
    expect(validateEmailAddressStructure("asd@asd.se")).toBe(true);
  });
});

describe("validatePassword", () => {
  test("returns false for weak passwords", () => {
    expect(validatePassword("not-16-chars")).toBe(false);
    expect(validatePassword("ONLY-UPPER-CASE1")).toBe(false);
    expect(validatePassword("NOT-aNY-NUMBER!")).toBe(false);
    expect(validatePassword("notAnySpecialCharacters1")).toBe(false);
  });
  test("returns true for strong password", () => {
    expect(validatePassword("This-is-a-valid-password-1;")).toBe(true);
  });
});
 /* function generateRandomBlogTitle(blogTitleLength: number) {
  const characters = "ASDAFAASDdSGSAGAgsagsagSGAGagaGGAgaa";
  let randomBlogTitle = "";
  for (let i = 0; i <= blogTitleLength; i++) {
    randomBlogTitle += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomBlogTitle;
}
  */
describe("validateBlogIdIsNumber", () => {
  test("returns false for non-numeric or empty", () => {
    expect(validateBlogIdIsNumber("abc123")).toBe(false);
    expect(validateBlogIdIsNumber("")).toBe(false);
  });
  test("returns true for numeric string", () => {
    expect(validateBlogIdIsNumber("123")).toBe(true);
  });
});

describe("validateBlogTitleLength", () => {
  test("returns false when shorter than min", () => {
    const tooShort = "a".repeat(blogTitleLength.minLength - 1);
    expect(validateBlogTitleLength(tooShort)).toBe(false);
  });
  test("returns false when exactly min", () => {
    const atMin = "a".repeat(blogTitleLength.minLength);
    expect(validateBlogTitleLength(atMin)).toBe(false);
  });
  test("returns true when between min and max", () => {
    const valid = "a".repeat(blogTitleLength.minLength + 1);
    expect(validateBlogTitleLength(valid)).toBe(true);
  });
  test("returns false when exactly max", () => {
    const atMax = "a".repeat(blogTitleLength.maxLength);
    expect(validateBlogTitleLength(atMax)).toBe(false);
  });
  test("returns false when longer than max", () => {
    const tooLong = "a".repeat(blogTitleLength.maxLength + 1);
    expect(validateBlogTitleLength(tooLong)).toBe(false);
  });
});


const validCreateBlogPostFormData = {
  blogTitle: "This is a valid title length",
  blogText: "This is a valid blog text content.",
  submitType: blogPostFormSubmitType.create,
};

const invalidCreateBlogPostFormData = [
  { ...validCreateBlogPostFormData, blogTitle: "Too short" },
  { ...validCreateBlogPostFormData, blogTitle: "A".repeat(blogTitleLength.maxLength + 1) },
  { ...validCreateBlogPostFormData, blogText: "" },
  { ...validCreateBlogPostFormData, blogText: "A".repeat(1001) },
  { ...validCreateBlogPostFormData, submitType: "invalid" as any },
];

describe("validateCreateBlogPostFormData", () => {
  test("returns true for valid data", () => {
    expect(validateCreateBlogPostFormData(validCreateBlogPostFormData)).toBe(true);
  });
  
  test("returns false for invalid data", () => {
    // Testa alla invalid cases från formData
    invalidCreateBlogPostFormData.forEach((formData) => {
      expect(validateCreateBlogPostFormData(formData)).toBe(false);
    });
  });
});

const validEditBlogPostFormData = {
  blogId: "123",
  blogTitle: "This is a valid title length",
  blogText: "This is a valid blog text content.",
  submitType: blogPostFormSubmitType.edit,
};

const invalidEditBlogPostFormData = [
  { ...validEditBlogPostFormData, blogId: "" },
  { ...validEditBlogPostFormData, blogId: "abc" },
  { ...validEditBlogPostFormData, blogTitle: "Too short" },
  { ...validEditBlogPostFormData, blogText: "" },
  { ...validEditBlogPostFormData, submitType: "invalid" as any },
];

describe("validateEditBlogPostFormData", () => {
  test("returns true for valid data", () => {
    expect(validateEditBlogPostFormData(validEditBlogPostFormData)).toBe(true);
  });

  test("returns false for invalid data", () => {
    invalidEditBlogPostFormData.forEach((formData) => {
      expect(validateEditBlogPostFormData(formData)).toBe(false);
    });
  });
});

const validDeleteBlogPostFormData = {
  blogId: "123",
  submitType: blogPostFormSubmitType.delete,
};

const invalidDeleteBlogPostFormData = [
  { ...validDeleteBlogPostFormData, blogId: "" },
  { ...validDeleteBlogPostFormData, blogId: "abc" },
  { ...validDeleteBlogPostFormData, submitType: "invalid" as any },
];

describe("validateDeleteBlogPostFormData", () => {
  test("returns true for valid data", () => {
    expect(validateDeleteBlogPostFormData(validDeleteBlogPostFormData)).toBe(true);
  });

  test("returns false for invalid data", () => {
    invalidDeleteBlogPostFormData.forEach((formData) => {
      expect(validateDeleteBlogPostFormData(formData)).toBe(false);
    });
  });
});


