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

export const apiPostCreate = async (title, discription, content, publish) => {
  try {
    const res = await axios.post(`${url}/blogs/`, {
      title: title,
      discription: discription,
      content: content,
      publish: publish,
    });
    console.log(res.data);
    return { success: res.data.success };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const apiPostUpdate = async (id, title, discription) => {
  try {
    const res = await axios.put(`${url}/blogs/${id}`, {
      id: id,
      title: title,
      discription: discription,
    });
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
