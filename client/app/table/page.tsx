"use client";
import CodeTable from "@/components/table";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Table = () => {
  const router = useRouter();
  return (
    <div>
      <div className="border-b bg-headerbackground border-outline h-[50px] text-white text-center text-4xl py-2"></div>
      <div className="pl-2 pt-3 pb-3">
        <Label
          onClick={() => {
            router.replace("/code");
          }}
          className="hover:cursor-pointer hover:font-bold hover:underline"
        >
          Go back to coding
        </Label>
      </div>
      <Separator />
      <CodeTable />
    </div>
  );
};

export default Table;
