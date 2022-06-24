export const fetchGet = (url) => {
  return fetch(url).then((res) => res.json());
};

export const fetchPost = (url, req) => {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
};

export const fetchDelete = (url, req) => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
};
