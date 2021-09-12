import Repository, { baseUrl, serializeQuery } from "./Repository";

const get_Borrowers = async (filter) => {
  try {
    let res = [];

    await Repository.get(`${baseUrl}/customers`).then(
      (response) => (res = response.data)
    );
    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_Borrower = async (id) => {
  try {
    const url = `${baseUrl}/customers/${id}`;

    let res = {};

    await Repository.get(url).then((response) => (res = response.data));

    return res;
  } catch (e) {
    console.error(e);
  }
};
export default { get_Borrowers, get_Borrower };
