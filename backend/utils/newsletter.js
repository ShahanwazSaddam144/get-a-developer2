

/**
 * Sends a request to the Butt Networks central email microservice.
 * @param {string} email - The recipient's email address.
 */
const sendNewsletterEmail = async (email) => {
  const serviceUrl = process.env.EMAIL_SERVICE_URL;
  const token = process.env.INTERNAL_MAIL_TOKEN;

  if (!serviceUrl || !token) {
    console.error("Missing EMAIL_SERVICE_URL or INTERNAL_MAIL_TOKEN in .env");
    return;
  }

  try {
    const response = await fetch(serviceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-token": token,
      },
      body: JSON.stringify({
        type: "NEWSLETTER", // Matches the 'type' in your Next.js API route
        to: email,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Service Error:", result.error || "Failed to send newsletter email");
      return;
    }

    return result;
  } catch (error) {
    console.error("Network Error connecting to email service:", error.message);
  }
};

module.exports = sendNewsletterEmail;