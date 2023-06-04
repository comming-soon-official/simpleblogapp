import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
let url = `http://localhost:3030`;

// API function to fetch all posts
export const apiPostAll = async () => {
  try {
    const res = await axios.get(`${url}/blogs/`);
    return { success: res.data.success };
  } catch (error) {
    return { error: error };
  }
};

// API function to fetch a post by ID
export const apiGetPostbyId = async (id) => {
  try {
    const res = await axios.get(`${url}/blogs/${id}`);
    return { success: res.data.success };
  } catch (error) {
    return { error: error };
  }
};

// API function to create a new post
export const apiPostCreate = async (title, description, content, published) => {
  try {
    const res = await axios.post(`${url}/blogs/`, {
      title: title ? title : "",
      description: description ? description : "",
      content: content ? content : "",
      published: published,
    });
    return { success: res.data.success };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

// API function to update a post
export const apiPostUpdate = async (
  id,
  title,
  description,
  content,
  published
) => {
  console.log(
    "id" + id,
    "title" + title,
    "dis" + description,
    "con" + content,
    "pub" + published
  );
  try {
    const res = await axios.put(`${url}/blogs/${id}`, {
      id: id,
      title: title,
      description: description,
      content: content,
      published: published,
    });
    console.log(res.data);
    return { success: res.data.success };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

// API function to delete a post
export const apiPostDelete = async (id) => {
  try {
    const res = await axios.delete(`${url}/blogs/${id}`);
    if (res.data) {
      window.location.reload(true);
    }
    return { success: res.data.success };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

// API function to fetch all drafts
export const apidraftAll = async () => {
  try {
    const res = await axios.get(`${url}/drafts/`);
    return { success: res.data.success };
  } catch (error) {
    return { error: error };
  }
};
