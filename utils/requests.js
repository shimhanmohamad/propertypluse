const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

async function fetchProperties() {
  try {
    if (!apiDomain) {
      return [];
    }

    const response = await fetch(
      `${apiDomain}/properties`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchProperty(id) {
  try {
    if (!apiDomain) {
      return null;
    }

    const response = await fetch(
      `${apiDomain}/properties/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchProperties , fetchProperty };

