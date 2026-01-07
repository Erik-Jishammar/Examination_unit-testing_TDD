import { test, expect, describe } from "vitest";
import {
  validateBlogPostFormData,
  validateEmailAddressStructure,
  validatePassword, 
  validateBlogIdIsNumber, 
  validateBlogTitleLength,
  validateCreateBlogPostFormData,
  
} from "../../utils/validate";
import { blogTitleLength,blogPostFormSubmitType } from "../../src/constants";

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

describe("validateCreateBlogPostFormData", () => {
  test("returns true for valid data", () => {
    const validData = {
      blogTitle: "Valid title",
      blogText: "Some valid blog text",
      submitType: "create" as const
    };
    expect(validateCreateBlogPostFormData(validData)).toBe(true);
  });

  test("returns false when title is empty", () => {
    const invalidData = {
      blogTitle: "",
      blogText: "Some text",
      submitType: "create" as const
    };
    expect(validateCreateBlogPostFormData(invalidData)).toBe(false);
  });

  test("returns false when text is empty", () => {
    const invalidData = {
      blogTitle: "Valid title",
      blogText: "",
      submitType: "create" as const
    };
    expect(validateCreateBlogPostFormData(invalidData)).toBe(false);
  });

  test("returns false when submitType is wrong", () => {
    const invalidData = {
      blogTitle: "Valid title",
      blogText: "Some text",
      submitType: "wrong" as any
    };
    expect(validateCreateBlogPostFormData(invalidData)).toBe(false);
  });
});
