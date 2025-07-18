
# Hackherway Blog: Reusable Magazine-Style Blog with Jekyll Includes

## How to Add a New Blog Post

1. Go to the `_posts` folder.
2. Create a new file: `YYYY-MM-DD-title-of-your-post.md`
3. Start the file with:

    ---
    layout: blog
    title: "Your Post Title"
    date: YYYY-MM-DD
    author: Your Name
    category: Topic
    bg_image: /img/bg-img/your-image.jpg
    ---

4. Write your content in Markdown or HTML below the front matter.
5. Add images to `/img/bg-img/` and reference them in your post.
6. Push to GitHub. All posts will use the beautiful Newsbox magazine layout!

## How to Edit Global Sections

- **Nav/Header**: `_includes/header.html`
- **Breaking News**: `_includes/breaking-news.html`
- **Sidebar**: `_includes/sidebar.html`
- **Footer**: `_includes/footer.html`
- **Main post layout**: `_layouts/blog.html`
- **Global CSS/JS**: `/style.css`, `/js/`

---
**No copy-paste needed ever again!**

Edit your layout or includes and all posts update automatically.
