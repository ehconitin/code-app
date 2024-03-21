const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const z = require("zod");
const axios = require("axios");
const base64 = require("base-64");

const bodySchema = z.object({
  username: z.string().min(5),
  language: z.string(),
  stdin: z.string(),
  sourceCode: z.string(),
});

router.post("/create", async (req, res) => {
  const body = req.body;

  const { username, language, stdin, sourceCode } = req.body;
  console.log(body);
  const { success } = bodySchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid or missing inputs",
    });
  }
  try {
    const findUsername = await prisma.codestore.findFirst({
      where: {
        username,
      },
      select: {
        username: true,
      },
    });
    //console.log(findUsername);
    if (findUsername) {
      return res.json({
        msg: "username already exists",
      });
    }
  } catch (error) {
    console.log("error while finding username");
  }
  try {
    let language_id = 0;
    if (language == "C++") {
      language_id = 54;
    }
    if (language == "Java") {
      language_id = 62;
    }
    if (language == "JavaScript") {
      language_id = 63;
    }
    if (language == "Python") {
      language_id = 71;
    }

    const output = await executeCode(sourceCode, language_id, stdin);
    const create = await prisma.codestore.create({
      data: {
        username,
        language,
        stdin,
        sourceCode,
        output,
      },
      select: {
        id: true,
        username: true,
        output: true,
      },
    });

    //console.log(create);
    return res.json({
      id: create.id,
      output: create.output,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "error",
    });
  }
});

router.get("/fetch", async (req, res) => {
  const fetch = await prisma.codestore.findMany({
    where: {},
    select: {
      id: true,
      username: true,
      language: true,
      stdin: true,
      sourceCode: true,
      output: true,
      timestamp: true,
    },
  });
  return res.json({
    fetch,
  });
});
module.exports = router;

async function executeCode(sourceCode, language_id, stdin) {
  const encodedCode = btoa(sourceCode);
  const encodedStdin = btoa(stdin);
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      wait: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "fac5c0302cmsh282dd2a3dd1636cp1e27e7jsnf2dff8a95a11",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: language_id,
      source_code: encodedCode,
      stdin: encodedStdin,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);

    if (response.data.status_id == 3) {
      return response.data.stdout;
    }

    if (response.data.status_id == 6) {
      let encodedCompileOutput = response.data.compile_output;
      let cleanedText = encodedCompileOutput.replace(/(?:\n|'|\+ )/g, "");

      cleanedText = cleanedText.trim();
      console.log(cleanedText);
      console.log(Buffer.from(cleanedText, "base64").toString());
      return cleanedText;
    }
    if (7 <= response.data.status_id <= 12) {
      let encodedCompileOutput = response.data.stderr;
      let cleanedText = encodedCompileOutput.replace(/(?:\n|'|\+ )/g, "");

      cleanedText = cleanedText.trim();
      console.log(cleanedText);
      console.log(Buffer.from(cleanedText, "base64").toString());
      return cleanedText;
    }

    /* const submissionToken = response.data.token;

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const options2 = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}`,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "X-RapidAPI-Key": "fac5c0302cmsh282dd2a3dd1636cp1e27e7jsnf2dff8a95a11",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };

    const response2 = await axios.request(options2);
    console.log(response2.data);
    return response2.data; */
  } catch (error) {
    console.error(error);
  }
}
