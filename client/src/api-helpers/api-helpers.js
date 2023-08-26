import axios from "axios";

export const getAllMovies = async () => {
  try {
    const res = await axios.get("/movie").catch((err) => console.log(err));
    console.log(res);

    if (res.status !== 200) {
      return console.log("No Movies ");
    }

    const data = await res.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const userAuth = async (data, signup) => {
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    console.log("something went wrong and bad req");
  }

  const resData = await res.data;
  return resData;
};

export const adminAuth = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("something went wrong unable to admin login");
  }

  const resData = await res.data;
  return resData;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`/movie/${id}`).catch((err) => {
    console.log(err);
  });
  if (res.status !== 200) {
    return console.log("something went wrong");
  }
  const resData = await res.data;
  return resData;
};
