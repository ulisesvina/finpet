export const registerInBank = async (
  firstName: string,
  lastName: string,
  address: {
    streetNumber: string;
    streetName: string;
    city: string;
    state: string;
    zip: string;
  }
) => {
  fetch(
    "http://api.nessieisreal.com/customers?key=fad4e467e31d4cc15ce57073f2160d14",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        address: {
          street_number: address.streetNumber,
          street_name: address.streetName,
          city: address.city,
          state: address.state,
          zip: address.zip,
        },
      }),
    }
  );
};
