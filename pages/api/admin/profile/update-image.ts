import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/db";
const formidable = require("formidable");
const AWS = require("aws-sdk");
const fs = require("fs");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data: any = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();
      form.parse(req, (err: any, fields: any, files: any) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { fields, files } = data;
    let { id } = fields;
    id = parseInt(id);
    const { image } = files;
    const { filepath } = image;
    const blob = fs.readFileSync(filepath);

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "us-east-2",
    });

    const uploadedImage: any = await s3
      .upload({
        Bucket: "sprintsly",
        Key: `${id}/profile-pic.${image.originalFilename.split(".")[1]}`,
        Body: blob,
      })
      .promise();

    const location = uploadedImage.Location;

    await prisma.user.update({
      where: { id },
      data: { image: location },
    });

    res.status(200).send("success");
  } catch {
    res.status(500).send("Server Error");
  }
};

export default handler;
