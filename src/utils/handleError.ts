export const handleError = (error: Error): never => {
  const message = error.message.toLowerCase();

  if (message.includes("email")) {
    throw new Error("The provided email is invalid or already in use.");
  }

  if (message.includes("username")) {
    throw new Error(
      "The username is already taken. Please choose a different one."
    );
  }

  if (message.includes("password")) {
    throw new Error(
      "The password does not meet the required criteria or is incorrect."
    );
  }

  // For other unknown errors, log and rethrow the original error
  console.error("Unhandled error:", error);
  throw error;
};
