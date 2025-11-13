import axios from "axios";

export async function fetch_template(template_type: string, language: string) {
  const response = await axios.get(
    `${process.env.TEMPLATE_SERVICE_URL}/templates/latest`,
    { params: { type: template_type, language } },
  );

  return response.data.data; // expect { subject, body }
}
