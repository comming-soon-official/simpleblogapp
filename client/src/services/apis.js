import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
let url = `http://localhost:3030`;

export const apiPostAll = async () => {
  try {
    const res = await axios.get(`${url}/blogs/`);
    return { success: res.data.success };
  } catch (error) {
    return { error: error };
  }
};
export const apiGetPostbyId = async (id) => {
  try {
    const res = await axios.get(`${url}/blogs/${id}`);
    return { success: res.data.success };
  } catch (error) {
    return { error: error };
  }
};
export const apiPostCreate = async (title, discription, content, published) => {
  try {
    const res = await axios.post(`${url}/blogs/`, {
      title: title ? title : "",
      discription: discription ? discription : "",
      content: content ? content : "",
      published: published,
    });
    return { success: res.data.success };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const apiPostUpdate = async (
  id,
  title,
  discription,
  content,
  published
) => {
  console.log(
    "id" + id,
    "title" + title,
    "dis" + discription,
    "con" + content,
    "pub" + published
  );
  try {
    const res = await axios.put(`${url}/blogs/${id}`, {
      id: id,
      title: title,
      discription: discription,
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

export const apidraftAll = async () => {
  try {
    const res = await axios.get(`${url}/drafts/`);
    return { success: res.data.success };
  } catch (error) {
    return { error: error };
  }
};
