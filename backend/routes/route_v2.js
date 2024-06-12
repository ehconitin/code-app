const express = require("express");
const routerV2 = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const z = require("zod");
const axios = require("axios");
const base64 = require("base-64");
const { XRapidAPIKey, XRapidAPIHost } = require("../config");

const bodySchema = z.object({
  username: z.string().min(5),
  language: z.string(),
  stdin: z.string(),
  sourceCode: z.string(),
});

routerV2.post("/create", async (req, res) => {
  const body = req.body;
  const { username, language, stdin, sourceCode } = req.body;
  console.log(body);
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
  const { success } = bodySchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid or missing inputs",
    });
  }
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        userId: true,
        username: true,
      },
    });
    if (!findUser) {
      const createUser = await prisma.user.create({
        data: {
          username,
        },
        select: {
          userId: true,
          username: true,
        },
      });
      const output = await executeCode(sourceCode, language_id, stdin);
      console.log("output new user", output);
      const createCode = await prisma.code.create({
        data: {
          userId: createUser.userId,
          username: createUser.username,
          language,
          stdin: output.stdin,
          sourceCode: output.sourceCode,
          output: output.stdout,
        },
        select: {
          output: true,
        },
      });
      return res.json({
        output: createCode.output,
      });
    } else {
      const output = await executeCode(sourceCode, language_id, stdin);
      console.log("output existinguse", output);
      const createCode = await prisma.code.create({
        data: {
          userId: findUser.userId,
          username: findUser.username,
          language,
          stdin: output.stdin,
          sourceCode: output.sourceCode,
          output: output.stdout,
        },
        select: {
          output: true,
        },
      });
      return res.json({
        output: createCode.output,
      });
    }
  } catch (error) {
    console.log("error");
    console.log(error);
    return res.json({
      msg: "error",
    });
  }
});

routerV2.get("/fetch", async (req, res) => {
  try {
    const fetch = await prisma.code.findMany({
      where: {},
      select: {
        userId: true,
        username: true,
        language: true,
        stdin: true,
        sourceCode: true,
        output: true,
        timestamp: true,
      },
    });
    //console.log(fetch);
    return res.json({ fetch });
  } catch (error) {
    console.error("Error fetching users with codes:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = routerV2;

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
      "X-RapidAPI-Key": XRapidAPIKey,
      "X-RapidAPI-Host": XRapidAPIHost,
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
      let data = {
        stdout: String(response.data.stdout),
        sourceCode: encodedCode,
        stdin: encodedStdin,
      };
      return data;
    }

    if (response.data.status_id == 6) {
      let encodedCompileOutput = response.data.compile_output;
      let cleanedText = String(encodedCompileOutput).replace(
        /(?:\n|'|\+ )/g,
        ""
      );

      cleanedText = cleanedText.trim();
      console.log(cleanedText);
      console.log(Buffer.from(cleanedText, "base64").toString());
      let data = {
        stdout: cleanedText,
        sourceCode: encodedCode,
        stdin: encodedStdin,
      };
      return data;
    }
    if (7 <= response.data.status_id <= 12) {
      let encodedCompileOutput = response.data.stderr;
      let cleanedText = String(encodedCompileOutput).replace(
        /(?:\n|'|\+ )/g,
        ""
      );

      cleanedText = cleanedText.trim();
      console.log(cleanedText);
      console.log(Buffer.from(cleanedText, "base64").toString());
      let data = {
        stdout: cleanedText,
        sourceCode: encodedCode,
        stdin: encodedStdin,
      };
      return data;
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
