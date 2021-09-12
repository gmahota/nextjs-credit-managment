import Repository, { baseUrl, serializeQuery } from "./Repository";

const get_Products = async (filter) => {
  try {
    let res = [];

    await Repository.get(`${baseUrl}/products`).then(
      (response) => (res = response.data)
    );

    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_Product = async (id) => {
  try {
    const url = `${baseUrl}/products/${id}`;

    let res = {};

    await Repository.get(url).then((response) => (res = response.data));

    return res;
  } catch (e) {
    console.error(e);
  }
};

const get_Products_Options = async (type) => {
  let items = await get_Products(type);

  items = items.map((item) => {
    return {
      value: item.code,
      label: item.description,
      ...item,
    };
  });

  items = [...[{ value: "", label: "" }, ...items]];

  return items;
};
export default { get_Products, get_Product, get_Products_Options };
