import type { BlogPost } from "../types/bitkrets";

export function createBlogPostForm() {
    return `
    <form method="post" id="blog-form" style="display:flex;flex-direction:column;">
        <input type="text" id="blog-id" value="" hidden>
        <label for="blog-title">Blog Title</label>
        <input type="text" name="blog-title" id="blog-title">
        <label for="blog-text">Blog Text</label>
        <textarea name="blog-text" id="blog-text" rows="4" cols="12"></textarea>
        <button id="submit-button" data-submit-type="create">Create Post</button>
    </form>
    `;
}

export function createBlogPostList(posts: BlogPost[]) {
    if (!posts || posts.length === 0) {
        return "";
    }
    
    return posts
    .map(
      (post) =>
        `
        <div class="post" style="border:1px dotted">
            <h5 data-title="${post._id}">${post.blogTitle}</h5>
            <p data-text="${post._id}">${post.blogText}</p>
            <button data-edit="${post._id}">Edit</button>
            <button data-delete="${post._id}">Delete</button>
        </div>
    `
    )
    .join("");
}
