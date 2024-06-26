"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
type Data = {
  userId: string;
  username: string;
  language: string;
  stdin: string;
  sourceCode: string;
  timestamp: string;
  output: string;
};
import moment from "moment-timezone";

const CodeTable = () => {
  const [data, setData] = useState<Data[]>();
  const clientTimezone = moment.tz.guess();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_url}/api/v2/fetch`)
      .then((response) => {
        setData(response.data.fetch);
      });
  }, []);
  const convertToLocalTime = (timestamp: string) => {
    return moment
      .utc(timestamp)
      .tz(clientTimezone)
      .format("YYYY-MM-DD HH:mm:ss");
  };
  return (
    <div>
      <Table>
        <TableCaption>All submitted entries</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Username</TableHead>
            <TableHead>Code Language</TableHead>
            <TableHead>stdin</TableHead>
            <TableHead>Submitted at</TableHead>
            <TableHead>Source Code</TableHead>
            <TableHead className="text-right">Output</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((key) => (
            <TableRow key={key.userId}>
              <TableCell className="font-medium">{key.username}</TableCell>
              <TableCell>{key.language}</TableCell>
              <TableCell>
                <pre>{Buffer.from(key.stdin, "base64").toString()}</pre>
              </TableCell>
              <TableCell>{convertToLocalTime(key.timestamp)}</TableCell>
              <TableCell>
                <pre>
                  {Buffer.from(key.sourceCode, "base64")
                    .toString()
                    .substring(0, 100)}
                </pre>
              </TableCell>
              <TableCell className="text-right">
                <pre>
                  {Buffer.from(key.output, "base64")
                    .toString()
                    .substring(0, 100)}
                </pre>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CodeTable;
