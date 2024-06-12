"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { ScrollArea } from "./ui/scroll-area";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import { useRouter } from "next/navigation";

import { error } from "console";

const CodeForm = () => {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
  const [stdin, setStdin] = useState("");
  const [sourceCode, setSourceCode] = useState("");
  const [mode, setMode] = useState("javascript");
  const [filename, setFilename] = useState("code");
  const [output, setOutput] = useState("");
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_url}/api/v2/create`, {
        username,
        language,
        stdin,
        sourceCode,
      })
      .then((response) => {
        console.log(response.data);
        setOutput(response.data.output);
      })
      .catch((error) => {
        alert(
          "Check if all fields are sumbmitted correctly,Username length must be >=5"
        );
      });
  };

  useEffect(() => {
    if (language == "C++") {
      setMode("c_cpp");
      setFilename("main.cpp");
    }
    if (language == "Java") {
      setMode("java");
      setFilename("Main.java");
    }
    if (language == "JavaScript") {
      setMode("javascript");
      setFilename("index.js");
    }
    if (language == "Python") {
      setMode("python");
      setFilename("main.py");
    }
  }, [language]);

  return (
    <div className="">
      <form id="myForm" className="w-full" onSubmit={handleSubmit}>
        <div>
          <div className="border-b bg-headerbackground border-outline h-[50px] text-white text-center text-4xl py-2">
            <div className="flex justify-between">
              <Button
                className="bg-green-800 hover:bg-green-600 mx-auto "
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
                Run
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-11">
          <div className="col-span-3">
            <div className="grid w-full items-center gap-4 pt-[300px] pl-[60px]">
              <div className="flex flex-col space-y-1.5">
                <Label>Username</Label>
                <Input
                  placeholder="johndoe"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Language</Label>
                <Select
                  onValueChange={(e) => {
                    setLanguage(e);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="C++">
                      <div className="flex">
                        <div className="pl-[2px] pt-[2px]">
                          <svg
                            preserveAspectRatio="xMidYMin"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fill="#0079F2"
                              d="M8.157 19.313C4.211 19.313 1 16.067 1 12.08c0-3.988 3.21-7.232 7.157-7.232 2.547 0 4.922 1.384 6.198 3.614l-3.097 1.81a3.587 3.587 0 0 0-3.1-1.808c-1.974 0-3.58 1.622-3.58 3.616s1.606 3.616 3.58 3.616a3.587 3.587 0 0 0 3.1-1.809l3.097 1.811c-1.276 2.23-3.651 3.614-6.198 3.614Z"
                            ></path>
                            <path
                              fill="#0079F2"
                              d="M17.904 11.19H16.49V9.76h-1.414v1.429h-1.414v1.428h1.414v1.43h1.414v-1.43h1.414V11.19ZM21.792 11.19h1.413v1.428h-1.413v1.43h-1.414v-1.43h-1.414V11.19h1.414V9.76h1.413v1.429Z"
                            ></path>
                          </svg>
                        </div>
                        <div className="pl-2 pt-[2px]">C++</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="Java">
                      <div className="flex">
                        <svg
                          preserveAspectRatio="xMidYMin"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className=""
                        >
                          <path
                            fill="#0079F2"
                            d="M9.153 18.014s-.829.489.59.654c1.72.199 2.598.17 4.492-.193 0 0 .498.317 1.194.59-4.247 1.847-9.612-.106-6.276-1.051Zm-.519-2.409s-.93.698.49.847c1.837.192 3.287.208 5.796-.282 0 0 .348.357.893.552-5.134 1.522-10.854.12-7.179-1.117ZM13.009 11.52c1.046 1.221-.275 2.32-.275 2.32s2.657-1.39 1.437-3.132c-1.14-1.625-2.014-2.432 2.718-5.215 0 0-7.427 1.881-3.88 6.026Z"
                          ></path>
                          <path
                            fill="#0079F2"
                            d="M18.626 19.795s.613.513-.676.91c-2.451.753-10.203.98-12.356.03-.774-.342.677-.816 1.134-.915.476-.105.748-.085.748-.085-.86-.615-5.564 1.207-2.389 1.729 8.66 1.424 15.785-.641 13.539-1.669ZM9.552 13.11s-3.943.95-1.397 1.295c1.076.146 3.22.113 5.216-.057 1.631-.14 3.27-.436 3.27-.436s-.575.25-.992.538c-4.004 1.068-11.738.571-9.512-.521 1.883-.923 3.415-.819 3.415-.819Zm7.073 4.01c4.07-2.145 2.188-4.206.875-3.928a3.016 3.016 0 0 0-.466.126s.12-.19.348-.272c2.598-.926 4.597 2.733-.84 4.182 0 0 .064-.057.083-.108ZM14.17 1s2.255 2.287-2.137 5.803c-3.522 2.82-.803 4.429-.002 6.266-2.055-1.88-3.564-3.537-2.552-5.078C10.965 5.73 15.08 4.632 14.171 1Z"
                          ></path>
                          <path
                            fill="#0079F2"
                            d="M9.952 22.93c3.906.255 9.906-.14 10.048-2.014 0 0-.273.71-3.229 1.275-3.334.636-7.447.562-9.887.154 0 0 .5.419 3.068.586Z"
                          ></path>
                        </svg>
                        <div className="pl-2 pt-[2px]">Java</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="JavaScript">
                      <div className="flex">
                        <svg
                          preserveAspectRatio="xMidYMin"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className=""
                        >
                          <path
                            fill="#967D00"
                            d="M4.271 2A2.271 2.271 0 0 0 2 4.271V19.73A2.271 2.271 0 0 0 4.271 22H19.73A2.272 2.272 0 0 0 22 19.729V4.27A2.271 2.271 0 0 0 19.729 2H4.27Zm8.167 17.109c-.294.599-.857.992-1.51 1.182-1.001.23-1.96.1-2.672-.329-.478-.293-.85-.743-1.103-1.262.508-.31 1.014-.622 1.521-.932.014.006.053.078.107.171.194.326.361.556.69.717.324.11 1.032.18 1.306-.388.168-.289.114-1.237.114-2.266 0-1.616.008-3.205.008-4.841h1.87c0 1.718.01 3.44 0 5.155.004 1.052.096 2.008-.33 2.793Zm7.761-.529c-.65 2.225-4.276 2.297-5.724.827-.306-.345-.498-.526-.68-.926.77-.443.77-.443 1.518-.876.408.626.784.97 1.46 1.11.92.112 1.843-.203 1.636-1.178-.213-.797-1.88-.99-3.015-1.843-1.152-.774-1.422-2.654-.475-3.728.315-.397.853-.694 1.418-.836.195-.025.393-.052.589-.076 1.131-.024 1.838.275 2.357.855.145.147.262.304.483.647-.602.384-.6.38-1.464.94a1.392 1.392 0 0 0-.813-.755c-.502-.152-1.135.013-1.266.543-.046.164-.036.316.036.586.204.464.886.665 1.498.946 1.763.715 2.358 1.481 2.504 2.394.14.785-.034 1.294-.06 1.37h-.002Z"
                          ></path>
                        </svg>
                        <div className="pl-2 pt-[2px]">JavaScript</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="Python">
                      <div className="flex ">
                        <svg
                          preserveAspectRatio="xMidYMin"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className=""
                        >
                          <path
                            fill="#0093B0"
                            d="M9.804 12.041h4.962c1.382 0 2.485-1.137 2.485-2.525v-4.73c0-1.347-1.136-2.359-2.485-2.583A15.437 15.437 0 0 0 12.178 2c-.849.005-1.66.076-2.374.203-2.103.37-2.485 1.149-2.485 2.582V6.68h4.968v.631H5.454c-1.444 0-2.708.868-3.104 2.52-.456 1.892-.477 3.073 0 5.05.353 1.47 1.196 2.519 2.64 2.519H6.7v-2.27c0-1.64 1.419-3.087 3.104-3.087ZM9.49 5.417a.938.938 0 0 1-.932-.944c0-.524.416-.95.932-.95.513 0 .933.426.933.95a.938.938 0 0 1-.933.944Zm12.728 4.412c-.356-1.438-1.038-2.52-2.484-2.52h-1.865v2.206c0 1.71-1.45 3.151-3.104 3.151H9.804c-1.36 0-2.485 1.164-2.485 2.525v4.731c0 1.347 1.17 2.138 2.485 2.525 1.573.463 3.08.546 4.962 0 1.251-.362 2.485-1.091 2.485-2.525v-1.894h-4.963v-.63h7.448c1.444 0 1.981-1.008 2.484-2.52.519-1.557.497-3.053 0-5.05Zm-7.14 9.463c.516 0 .933.422.933.943 0 .524-.417.95-.932.95a.943.943 0 0 1-.933-.95c0-.522.419-.943.933-.943Z"
                          ></path>
                        </svg>
                        <div className="pl-2">Python</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="col-span-8 ">
            <div className="pl-[1160px] pt-3">
              <Label
                onClick={() => {
                  router.replace("/table");
                }}
                className="hover:cursor-pointer hover:font-bold hover:underline"
              >
                View all submitted entries
              </Label>
            </div>
            <div className="pl-[40px] pt-3 ">
              <ResizablePanelGroup
                direction="horizontal"
                className="max-w-[1300px] rounded-lg border"
              >
                <ResizablePanel>
                  <div className=" h-[800px] items-center justify-center bg-customactivebg">
                    <div className="border-customactivebg border-4 w-[90px] pl-2 py-1 border-b-0 bg-customborder text-white  ">
                      <Label>{filename}</Label>
                    </div>
                    <div>
                      <ScrollArea className="h-[800px] ">
                        <AceEditor
                          mode={mode}
                          theme="monokai"
                          onChange={(newValue) => {
                            setSourceCode(newValue);
                          }}
                          name="UNIQUE_ID_OF_DIV"
                          editorProps={{ $blockScrolling: true }}
                          setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,

                            maxLines: Infinity,
                            minLines: 35,
                            fontSize: 17,
                            useWorker: false,
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </ScrollArea>
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                  <ResizablePanelGroup direction="vertical">
                    <ResizablePanel>
                      <div className="h-full flex flex-col bg-customactivebg">
                        <div className=" border border-customactivebg w-[80px] pl-2 py-1 border-b-0 bg-customborder text-white">
                          <Label>input</Label>
                        </div>
                        <div className="flex-grow">
                          <AceEditor
                            mode=""
                            theme="monokai"
                            onChange={(newValue) => {
                              setStdin(newValue);
                            }}
                            name="UNIQUE_ID_OF_DIV2"
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            setOptions={{
                              showLineNumbers: false,
                              maxLines: Infinity,
                              minLines: 35,
                              fontSize: 17,
                              useWorker: false,
                            }}
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </div>
                      </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel>
                      <div className="h-full flex flex-col bg-customactivebg">
                        <div className=" border border-customactivebg bg-customborder text-white w-[80px] pl-2 py-1 border-b-0">
                          <Label>output</Label>
                        </div>
                        <div className="flex-grow ">
                          <div className="h-full  bg-customborder text-white pl-8 pt-2 ">
                            <pre>
                              {Buffer.from(output, "base64").toString()}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CodeForm;
