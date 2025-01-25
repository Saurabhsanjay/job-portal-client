const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  email: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  return response.json();
};
