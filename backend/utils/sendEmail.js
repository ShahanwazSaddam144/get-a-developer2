/**
 * Sends a request to the central Email Service (Next.js Serverless)
 * @param {string} to - Recipient email
 * @param {string} name - Recipient name
 * @param {string} verifyUrl - The unique verification link
 */
const sendVerificationEmail = async (to, name, verifyUrl) => {
  const serviceUrl = process.env.EMAIL_SERVICE_URL;
  const token = process.env.INTERNAL_MAIL_TOKEN;

  if (!serviceUrl || !token) {
    throw new Error("Email service configuration missing (URL or Token)");
  }

  try {
    const response = await fetch(serviceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-token": token,
      },
      body: JSON.stringify({
        type: "VERIFICATION", // Tells the service which template to use
        to,
        name,
        verifyUrl,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Email Service Error Details:", result);
      throw new Error(result.error || "Failed to send email via service");
    }

    return result;
  } catch (error) {
    console.error("Failed to connect to Email Service:", error.message);
    throw error;
  }
};

// If you ever need to add the newsletter one here too:
const subscribeToNewsletter = async (email) => {
  // Similar fetch logic but with type: "NEWSLETTER"
};

module.exports = { sendVerificationEmail };